import {useLocation,Link} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import React from "react";
const AuthSwitcher = ()=>{
    const location = useLocation();

    const isLogin = location.pathname === '/login';

    return(
        <>
            <Box textAlign="center" mt={2}>
                {isLogin ? (
                    <Link to="/register" style={{textDecoration:'none',fontSize: "1.1rem",fontWeight: 500,
                        color:'black'
                    }}>Pas encore de compte ? Inscrivez-vous</Link>
                ) : (
                    <Link to="/login" style={{textDecoration:'none',fontSize:'1.1rem',color:'black'}}>Déjà inscrit ? Connectez-vous</Link>
                )}
            </Box>
        </>
    )
}
export default AuthSwitcher;