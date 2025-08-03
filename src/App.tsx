import {Routes, Route, BrowserRouter} from 'react-router-dom';
import BudgetPage from "./pages/BudgetPage.tsx";
import './CSS/styles.css'
import LoginPage from "./pages/LoginPage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import {AuthProvider} from "./context/auth-context.tsx";
function App() {
    return (
        <AuthProvider>

        <BrowserRouter>
            <Routes>
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/register" element={<SigninPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>

    );
}


export default App
