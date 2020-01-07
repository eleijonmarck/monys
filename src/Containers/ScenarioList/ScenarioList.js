import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import CreateScenario from './CreateScenario'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 200,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        'flex-direction': 'column',
        margin: `${theme.spacing(0)} auto`,
    },
}));

const ScenarioList = () => {
    const classes = useStyles();

    const [scenarios, setScenario] = React.useState([{
        title: "hej"
    }])

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    function addScenario(newScenario) {
        setScenario([
            ...scenarios,
            newScenario
        ])
    }

    return (
        <React.Fragment>
            <List className={classes.root}>
                {scenarios.map((val, idx) => {
                    let id = `exp-id-${idx}`

                    return (
                        <ListItem
                            button
                            selected={selectedIndex === id}
                            onClick={event => handleListItemClick(event, id)}
                            key={idx}
                            id={id}
                        >

                            <ListItemIcon>
                                <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText primary={val.title} />

                        </ListItem>
                    )
                })}
                <CreateScenario addScenario={addScenario} ></CreateScenario>
            </List>
        </React.Fragment >
    );
}

export default ScenarioList