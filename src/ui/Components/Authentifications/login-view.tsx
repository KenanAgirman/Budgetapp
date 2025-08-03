import {useContext, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import type {Errors} from "../../../data/api-interfaces.ts";
import AuthSwitcher from "./auth-switcher.tsx";
import React from "react";
import {AuthContext} from "../../../context/auth-context.tsx";

const LoginView = ()=>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const navigate = useNavigate();

    const [errors, setErrors] = useState<Errors>({});
    const [success,setSuccess] = useState<string[]>([]);
    const { login } = useContext(AuthContext);


    const handleSubmit = async (e)=>{
            e.preventDefault();

            const data = {name,password};

            try {
                const response = await fetch('http://localhost:3000/login',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(data),
                });

                if (!response.ok) {
                    const message = await response.text();

                    if (message.includes("Nom d'utilisateur invalide")) {
                        setErrors({ name: message });
                    } else if (message.includes("Mot de passe incorrect")) {
                        setErrors({ password: message });
                    } else {
                        setErrors({ general: message });
                    }
                }else{
                    const result = await response.json();

                    login(result.user);

                    navigate('/budget');
                }



            }catch (e){
                setErrors({ general: `Erreur réseau ou serveur indisponible ${e}` });

            }
    }


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
                    Connexion
                </Typography>

                <TextField
                    error={Boolean(errors.name)}
                    label="Name"
                    variant="filled"
                    type="text"
                    required
                    value={name}
                    helperText={errors.name}
                    onChange={(e) => setName(e.target.value)}
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        input: { color: 'white' },
                        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiFilledInput-root': { bgcolor: 'rgba(255,255,255,0.1)' },
                        '& .MuiFilledInput-root:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                    }}
                />
                {errors.general && (
                    <Typography color="error">{errors.general}</Typography>
                )}
                <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
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
export default LoginView;