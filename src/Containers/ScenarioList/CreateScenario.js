import React from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// great introduction to handling lists in React https://www.robinwieruch.de/react-preventdefault

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 200,
            margin: `${theme.spacing(1)} auto`
        },
        scenarioBtn: {
            marginTop: theme.spacing(0),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(0)
        }

    }),
);

const CreateScenario = (props) => {

    const classes = useStyles()
    const [scenarioName, setScenarioName] = React.useState("")
    const [isButtonDisabled, setIsButtonDisabled] = React.useState("")

    const [error, setError] = React.useState(false)

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleNewScenario(e.target.value)
            e.preventDefault()
            e.target.value = ''
        }
    }

    React.useEffect(() => {
        if (scenarioName.trim()) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [scenarioName])

    const handleNewScenario = (scenarioName) => {
        const newScen = {
            'title': scenarioName
        }
        props.addScenario(newScen)
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
                            className={classes.scenarioBtn}
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

export default CreateScenario