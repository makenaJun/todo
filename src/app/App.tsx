import React, {FC} from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {Container, LinearProgress} from '@material-ui/core';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbars} from '../components/ErrorSnackbar/ErrorSnackbar';
import {AppStateType} from './store';
import {useSelector} from 'react-redux';
import {RequestStatusType} from './app-reducer';

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

    const classes = useStyles();

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ToDoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>

            <Container fixed style={{'padding': '20px'}}>
                <TodolistsList demo={demo}/>
            </Container>
            {!!error && <ErrorSnackbars/>}
        </div>
    );
}

export default App;