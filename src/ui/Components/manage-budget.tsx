import {
    Box,
    Button,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    MenuItem,
    Stack, Alert
} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../../context/auth-context.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";


type ManageBudgetProps = {
    onAddExpense: () => void;
};

const categories = [
    "Logement", "Alimentation", "Transports",
    "Loisirs", "Santé", "Éducation", "Autres"
];
const ManageBudget = ({onAddExpense}:ManageBudgetProps)=>{
    const [open,setOpen] = useState<boolean>(false);
    const [category,setCategory] = useState<string>("");
    const [amount,setAmount] = useState<number>();
    const [description,setDescription] = useState<string>();
    const [date, setDate] = useState("");
    const [message,setMessage] = useState<string>("");
    const [closeAlert, setCloseAlert] = useState(false);

    const navigate = useNavigate();
    const { user} = useAuth();

    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { userId: user?.id, category, amount, description, date };
        console.log("Données envoyées :", data);

        try {
            const response = await fetch('http://localhost:3000/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Erreur de soumission :", result);
                setMessage(`Erreur: ${result.error}`);
            } else {
                console.log("Réponse OK :", result);
                setMessage("Dépense ajoutée avec succès !");
                navigate('/budget');
                onAddExpense();
            }
        } catch (e) {
            console.error("Erreur réseau :", e);
            alert("Erreur réseau. Le serveur est peut-être hors ligne.");
        }
    };


    return(
        <>

            <CardContent sx={{
                mt:1,
                bgcolor:'rgba(255,255,255,0.59)',
                p:4,
                borderRadius:10,
                textAlign:'center',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
            }}>

                <Typography variant="h5" fontWeight="bold" sx={{ color: '#1A237E' }}>
                    Ajouter dépenses
                </Typography>

                <Button onClick={handleOpenDialog} variant={"outlined"} sx={{
                    bgcolor:'blue',
                    color:'white'
                }}>
                    Ajouter
                </Button>
            </CardContent>

            <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{textAlign:'center'}}>Ajouter vos dépenses</DialogTitle>
                {message && !closeAlert && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert
                            severity="success"
                            onClose={() => setCloseAlert(true)}
                        >
                            {message}
                        </Alert>
                    </Stack>
                )}
                <DialogContent>

                    <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 300,
                        margin: 'auto',
                        marginTop: 5,
                    }}
                    >
                        <TextField
                            label="Description"
                            variant="outlined"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />


                        <TextField
                            select
                            label="Catégorie"
                            variant="outlined"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>


                        <TextField
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                        <TextField
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <Button onClick={handleSubmit}>
                            Ajouter
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ManageBudget;