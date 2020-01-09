import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { Link, NavLink } from 'react-router-dom'


import ScenarioList from '../ScenarioList/ScenarioList'
import { secondaryListItems } from '../ListItems/ListItems'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuBar: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

const MenuDrawer = (props) => {
    const classes = useStyles()
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, props.open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>


                    <MenuList className={classes.menuBar}>
                        <MenuItem name="home" component={Link} to={'/'}>
                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}
                            >
                                Monys
                                </Typography>
                        </MenuItem>
                        <MenuItem name="login" component={Link} to={'/login'}>

                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}
                            >
                                Login
                                </Typography>
                        </MenuItem>
                        <MenuItem name="scenario" component={Link} to={'/scenario'}>
                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}
                            >
                                Scenario
                                </Typography>
                        </MenuItem>
                    </MenuList>
                </Toolbar>

            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >

                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <ScenarioList></ScenarioList>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
        </div >
    )
}

export default MenuDrawer