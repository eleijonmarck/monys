import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';

import Scenarios from './Scenarios'

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        }

    }),
);

const CreateScenario = () => {

    const classes = useStyles()
    const [scenarioName, setScenarioName] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState("")

    const [error, setError] = useState(false)

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleNewScenario(e.target.value)
        }
    }

    const handleNewScenario = (scenarioName) => {
        alert(scenarioName)
        // create new Scenario
    }

    return (
        <React.Fragment>
            <form className={classes.container} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardContent>
                        <div>
                            <TextField
                                error={error}
                                fullWidth
                                id="name"
                                type="text"
                                label="scenarioName"
                                placeholder="scenario"
                                margin="normal"
                                onChange={(e) => setScenarioName(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e)}
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className={classes.scenarioButton}
                            onClick={() => handleNewScenario(scenarioName)}
                            disabled={isButtonDisabled}>
                            Scenario
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </React.Fragment >
    )
}

const Scenario = () => {
    return (
        <React.Fragment>
            <Scenarios></Scenarios>
            <CreateScenario></CreateScenario>
        </React.Fragment>
    )
}
export default Scenario