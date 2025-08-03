import Header from "../ui/Components/header.tsx";
import {Container} from "@mui/material";
import MyBudget from "../ui/Components/my-budget.tsx";
import RecapBudget from "../ui/Components/recap-budget.tsx";
import ManageBudget from "../ui/Components/manage-budget.tsx";
import {useState} from "react";

const BudgetPage = () => {
    const [refreshBudget, setRefreshBudget] = useState(0);

    return (
        <>
            <Header />
            <Container maxWidth="xs" sx={{ mt: 1 }}>
                <MyBudget refresh={refreshBudget} />
                <RecapBudget/>
                <ManageBudget onAddExpense={() => setRefreshBudget(prev => prev + 1)} />

            </Container>
        </>
    );
};

export default BudgetPage;
