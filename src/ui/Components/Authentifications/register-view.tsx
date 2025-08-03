import {Box, Button, TextField, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Errors} from "../../../data/api-interfaces.ts";
import AuthSwitcher from "./auth-switcher.tsx";
import React from "react";
import {useAuth} from "../../../context/auth-context.tsx";

const RegisterView = ()=>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [confirmpassword,setConfirmPassword] = useState<string>("");
    const { login } = useAuth();

    const navigate = useNavigate();


    const [errors, setErrors] = useState<Errors>({});
    const [success,setSuccess] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setErrors({ password: "Les mots de passe ne correspondent pas" });
            return;
        }

        const data = { name, email, password };

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const message = await response.text();

                if (message.includes("déjà utilisé")) {
                    setErrors({ email: message });
                } else if (message.includes("déjà pris")) {
                    setErrors({ name: message });
                } else {
                    setErrors({ general: message });
                }

            } else {
                setErrors({});
                const result = await response.json();

                login(result.user);
                navigate('/budget');
            }

        } catch (error) {
            setErrors({ general: "Erreur réseau ou serveur indisponible" });
        }
    };



    return(
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width: 320,
                    maxWidth: '90vw',
                    margin: 'auto',
                    marginTop: 6,
                    padding: 4,
                    bgcolor: 'rgba(64,91,119,0.85)',
                    borderRadius: 3,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={2}>
                    Inscription
                </Typography>

                <TextField
                    label="Name"
                    variant="filled"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    required
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.1)' },
                        '& .MuiFilledInput-root:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                />

                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    required
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.1)' },
                        '& .MuiFilledInput-root:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                />

                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    required
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.1)' },
                        '& .MuiFilledInput-root:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                />
                <TextField
                    label="Confirm Password"
                    variant="filled"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={Boolean(errors.confirmpassword)}
                    helperText={errors.confirmpassword}
                    required
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.1)' },
                        '& .MuiFilledInput-root:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                />

                <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    onSubmit={handleSubmit}
                    size="large"
                    sx={{
                        mt: 3,
                        fontWeight: 'bold',
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                            boxShadow: '0 6px 14px rgba(0,0,0,0.4)',
                        },
                    }}
                >
                    Connexion
                </Button>
                <AuthSwitcher/>
            </Box>
        </>
    )
}

export default RegisterView;