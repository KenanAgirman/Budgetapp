require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});
db.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connecté à MySQL !');
        connection.release();
    }
});

app.get('/', (req, res) => {
        db.query('SELECT * FROM users',(err,results)=>{
        res.json(results);
    })
});


app.post('/login',(req,res)=>{
    const {name,password} = req.body;

    const sql = 'SELECT * FROM users WHERE name = ?';

    db.query(sql,[name],(err,result)=>{
        if(err){
            console.error("Erreur MySQL :", err);
            return res.status(500).send("Erreur serveur");
        }

        if(result.length ===0 )
        {
            console.log("Utilisateur introuvable :", name);
            return res.status(401).send("Nom d'utilisateur invalide");
        }

        const user = result[0];

        if(user.password != password)
        {
            console.log("Mot de passe incorrect pour :", name);
            return res.status(401).send("Mot de passe incorrect");
        }

        console.log("Connexion réussie pour :", name);
        const { password: _, ...safeUser } = user;

        return res.status(200).json({ message: "Connexion réussie", user: safeUser });
    })
})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const checkSql = 'SELECT * FROM users WHERE name = ? OR email = ?';
    db.query(checkSql, [name, email], (err, result) => {
        if (err) return res.status(500).send('Erreur serveur');

        if (result.length > 0) {
            if (result[0].email === email) {
                return res.status(400).send("Cet email est déjà utilisé");
            }
            if (result[0].name === name) {
                return res.status(400).send("Ce nom d'utilisateur est déjà pris");
            }
        }

        const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(insertSql, [name, email, password], (err2, insertResult) => {
            if (err2) return res.status(500).send('Erreur lors de l\'inscription');

            const userId = insertResult.insertId;

            const user = { id: userId, name, email };

            res.status(201).json({ user });
        });
    });
});

app.post('/form', (req, res) => {
    const { userId, category, amount, description, date } = req.body;

    const sql = 'INSERT INTO expenses (user_id, category, amount, description, date) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, category, amount, description, date], (err, result) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({error: "Erreur serveur"});
        }

        res.status(201).json({message: "Dépense ajoutée avec succès"});
    })
})
app.get('/expenses/:userId', (req, res) => {
    const userId = req.params.userId;

    const sql = 'SELECT category, SUM(amount) as total FROM expenses WHERE user_id = ? GROUP BY category';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }

        console.log(result);
        res.json(result);
    });
});

app.get('/expenses/amount/:userId',(req,res)=>{
    const userId = req.params.userId;

    const sql = 'SELECT SUM(amount) AS totalAmount  FROM expenses where user_id = ?';

    db.query(sql,[userId],(err,result)=>{
        if(err){
            console.error("Erreur MySQL :", err);
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json(result);
    })
})
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
