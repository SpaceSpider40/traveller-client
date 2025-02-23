import {
    AppBar,
    Box,
    Button,
    Container, IconButton, Menu, MenuItem,
    Toolbar,
    Typography
} from "@mui/material";
import * as React from "react";
import {MenuOutlined} from "@mui/icons-material";
import User from "../components/User.tsx";

function DashboardView(){
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return <AppBar position="sticky">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                {/* START MD */}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    color={"primary"}
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        textDecoration: "none",
                    }}>
                    Traveller
                </Typography>
                <Box sx={{
                    flexGrow: 1,
                    display: {xs: 'none', md: 'flex'},
                }}>
                    <Button
                        variant="text"
                        sx={{my:2, display: 'block'}}
                    >
                        <Typography color={"textPrimary"}>
                            Trips
                        </Typography>
                    </Button>
                </Box>
                {/* END MD */}
                {/* SX */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuOutlined />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuItem>Trips</MenuItem>
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    color={"primary"}
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    Traveller
                </Typography>
                {/* END SX */}
                {/* BOTH */}
                <User />
                {/* END BOTH */}
            </Toolbar>
        </Container>
    </AppBar>
}

export default DashboardView;