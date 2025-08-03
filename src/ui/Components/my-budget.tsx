import {CardContent, Divider, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/auth-context.tsx";

type MyBudgetProps = {
    refresh: number;
};
const MyBudget = ({refresh}:MyBudgetProps)=>{
    const now = new Date();
    const monthName = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.toLocaleString('fr-FR', { year: 'numeric' });
    const [total, setTotal] = useState<number>(0);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:8080/expenses/amount/${user?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setTotal(Number(data[0]?.totalAmount ?? 0));
                console.log(data)
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des dépenses :", err);
            });
    }, [user,refresh]);

    console.log(total);

    return(
        <>

            <CardContent sx={{
                bgcolor:'rgba(255,255,255,0.59)',
                p:4,
                borderRadius:10,
                textAlign:'center',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
            }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#1A237E' }}>
                    Mes dépenses
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ color: '#555' }}>
                    Total des dépenses mois de <strong>{monthName} {year}</strong>
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#D32F2F', mt: 1 }}>
                    {total} €
                </Typography>
            </CardContent>
        </>
    )
}

export default MyBudget;