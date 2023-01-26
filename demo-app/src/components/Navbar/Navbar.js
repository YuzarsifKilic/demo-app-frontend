import React from "react";
import {Link} from "react-router-dom";
import {AppBar, Box, Button, Fab, makeStyles, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import {styled} from "@mui/material/styles";



function Navbar() {

    let userId = 5;
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to={"/"}>Home</Link>
                        </Typography>
                        <Button color="inherit">Login</Button>
                        <Link to={{pathname : "/user/" + userId}}>User</Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar;