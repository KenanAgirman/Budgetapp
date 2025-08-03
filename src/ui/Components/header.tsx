import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../../context/auth-context.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const userName = user?.name || 'Invité';
    console.log('ID SUSER CONNECTE ',user?.id);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = ()=>{
        logout();
        navigate('/login');
    }

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                boxShadow: 2,
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: 48 }} />

                <Typography variant="h5" fontWeight="bold">
                    Bienvenue {capitalize(userName)}
                </Typography>

                <Box>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{color: 'white' }}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorElUser}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem disabled>
                            <Typography textAlign="center">{capitalize(userName)}</Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography textAlign="center">Historique</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Button onClick={handleLogout}>
                                <Typography color="error" textAlign="center">
                                    Logout
                                </Typography>
                            </Button>
                          </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};


export default Header;