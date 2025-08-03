import {Button, CardContent, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {
    ArcElement,
    Tooltip,
    Legend, Chart
} from 'chart.js';
import { useEffect, useState} from "react";
import {Doughnut} from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useAuth} from "../../context/auth-context.tsx";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RecapBudget = () => {
    const [open, setOpen] = useState(false);
    const [expenses, setExpenses] = useState<{ category: string; total: number }[]>([]);
    const { user } = useAuth();

    const now = new Date();
    const monthName = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.getFullYear();

    const fetchExpenses = () => {
        fetch(`http://localhost:8080/expenses/${user?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setExpenses(data);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des dépenses :", err);
            });
    };

    useEffect(() => {
        fetchExpenses();
    }, [user]);

    const handleOpenDialog = () => {
        fetchExpenses();
        setOpen(true);
    };

    const handleCloseDialog = () => setOpen(false);

    const data = {
        labels: expenses.map(e => e.category),
        datasets: [{
            label: 'Dépenses (€)',
            data: expenses.map(e => e.total),
            backgroundColor: [
                '#3f51b5',
                '#f44336',
                '#ff9800',
                '#4caf50',
                '#00bcd4',
                '#9c27b0',
                '#607d8b',
            ],
            borderWidth: 1,
        }],
    };

    const options : any= {
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14,
                },
                formatter: (value: number, context: any) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n${value} €`;
                },
            },
            legend: {
                position: 'bottom',
                labels: { color: '#333' },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <>
            <CardContent sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.59)', p: 4, borderRadius: 10, textAlign: 'center', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', border: '1px solid rgba(255, 255, 255, 0.18)' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#1A237E' }}>
                    Récapitulatif
                </Typography>

                <Button onClick={handleOpenDialog} variant={"outlined"} sx={{ bgcolor: 'blue', color: 'white' }}>
                    Voir mes graphiques
                </Button>
            </CardContent>

            <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Graphique de mes dépenses <strong>{monthName} {year}</strong></DialogTitle>
                <DialogContent>
                    <Doughnut data={data} options={options}/>
                </DialogContent>
                <Typography>Voir plus</Typography>
            </Dialog>
        </>
    );
};

export default RecapBudget;