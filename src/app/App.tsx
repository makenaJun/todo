import React, {FC, useEffect, useCallback} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress, Container, Grid, LinearProgress} from '@material-ui/core';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbars} from '../components/ErrorSnackbar/ErrorSnackbar';
import {AppStateType} from './store';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp, RequestStatusType} from './app-reducer';
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logout} from '../features/Login/auth-reducer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

type PropsType = {
    demo?: boolean,
}

const App: FC<PropsType> = (props) => {
    const {demo = false} = props;

    const error = useSelector<AppStateType, null | string>(state => state.app.error);
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status);
    const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const classes = useStyles();

    if (!isInitialized) {
        return <>
            <Grid container justifyContent="center" style={{'marginTop': '50vh'}}>
                <CircularProgress/>
            </Grid>
        </>

    }

    return (<BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            ToDoLists
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="secondary"/>}
                </AppBar>

                <Container fixed style={{'padding': '20px'}}>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route exact={!demo} path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                </Container>
                {!!error && <ErrorSnackbars/>}
            </div>
        </BrowserRouter>
    );
}

export default App;