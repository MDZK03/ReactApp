'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Avatar, Box, Button, Container, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '400px',
        },
    },
}));

export default function AppHeader() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };

    const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null); };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleMenuClose} >
                <Link href={"/profile"} style={{
                    color: "unset",
                    textDecoration: "unset"
                }}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#af7424" }}>
                <Container>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }} >
                            <Link href={"/"} style={{
                                color: "unset",
                                textDecoration: "unset"
                            }}> SoundCloudClone</Link>
                        </Typography>

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            "a": {
                                color: "unset",
                                textDecoration: "unset"
                            }
                        }}>
                            <Button color="inherit"><Link href={"/playlist"}>Playlists</Link></Button>
                            <Button color="inherit"><Link href={"/like"}>Likes</Link></Button>
                            <Button color="inherit"><Link href={"/upload"}>Upload</Link></Button>
                            <Avatar onClick={handleProfileMenuOpen}>MD</Avatar>
                        </Box>

                        <Box sx={{
                            display: { xs: 'flex', md: 'none' }
                        }}>
                            <Avatar onClick={handleProfileMenuOpen}>MD</Avatar>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMenu}
        </Box>
    );
}