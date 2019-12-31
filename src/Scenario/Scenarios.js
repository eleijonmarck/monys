import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ListSubheader } from '@material-ui/core';
import Scenario from './Scenario';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function getItems() {
    var json = {
        "list": [{
            "id": 1,
            "title": "Google",
            "items": [{
                "id": 1,
                "name": "Android",
                "subitems": [{
                    "id": 1,
                    "name": "Nougat"
                },
                {
                    "id": 2,
                    "name": "Lollipop"
                }]
            },
            {
                "id": 2,
                "name": "Chrome"
            }
            ]
        },
        {
            "id": 2,
            "title": "Apple",
            "items": [{
                "id": 1,
                "name": "Mac"
            },
            {
                "id": 2,
                "name": "Iphone",
                "subitems": [{
                    "id": 1,
                    "name": "Iphone 6"
                },
                {
                    "id": 2,
                    "name": "Iphone 10"
                }]
            }
            ]
        },
        {
            "id": 3,
            "title": "Uber",
            "items": [{
                "id": 1,
                "name": "Eats"
            },
            {
                "id": 2,
                "name": "Freight"
            }]
        }
        ]
    };
    return json;
}

const Scenarios = (scenarios) => {
    const classes = useStyles();

    const items = getItems()
    const ScenarioList = ({ list }) => (
        <List>
            {list.map(item => (
                <ListItem key={item.id}>{item.title}</ListItem>
            ))}
        </List>
    )

    return (
        <React.Fragment>
            <div className={classes.root}>
                <ScenarioList list={items["list"]}></ScenarioList>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
            </div>
        </React.Fragment >
    );
}

export default Scenarios