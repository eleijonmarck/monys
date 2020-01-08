import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LineChart from '../../Components/Chart/LineChart';
// import Deposits from './../Deposits/Deposits';
// import Orders from './../Orders/Orders';
import MonthlySavings from '../../Components/MonthlySavings/MonthlySavings'

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            display: 'flex',
            margin: `${theme.spacing(0)} auto`,
            justifyContent: 'inherit',
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        card: {
            marginTop: theme.spacing(10),
        }

    }),
);

const defaultValues = {
    initialSavings: 100.0,
    yieldRate: 8,
    yearsAhead: 10.0,
}

const Dashboard = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    function growth(initialSavings, yieldRate, yearsAhead) {
        let y = []
        var amount = parseFloat(initialSavings) || 0;
        yieldRate = parseFloat(yieldRate / 100 + 1)
        y.push(parseFloat(amount))

        for (let step = 0; step < yearsAhead; step++) {
            let nextY = amount * yieldRate
            // smooth values out
            nextY = Math.round(nextY * 100) / 100
            y.push(nextY)
            amount = nextY
        }
        return y
    }
    function createLineData(y) {
        let lineData = {
            table: []
        }
        for (let step = 0; step < y.length; step++) {
            lineData.table.push({
                'x': step,
                'y': y[step],
                'c': 0
            })
        }
        return lineData
    }

    const [values, setValues] = React.useState({
        initialSavings: defaultValues.initialSavings,
        yieldRate: defaultValues.yieldRate,
        yearsAhead: defaultValues.yearsAhead,
    });

    const [lineData, setLineData] = React.useState(
        createLineData(growth(defaultValues.initialSavings, defaultValues.yieldRate, defaultValues.yearsAhead))
    )

    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: (parseFloat(event.target.value) || ''),
        });
    };

    React.useEffect(() => {
        newLineData()
    }, [values.initialSavings, values.yieldRate, values.yearsAhead])

    const newLineData = () => {
        // handle if bad data.

        // display something in chart that says bad input data
        setLineData(
            createLineData(
                growth(values.initialSavings, values.yieldRate, values.yearsAhead)
            )
        )
    }

    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: props.open,
            })}
        >
            <div className={classes.drawerHeader} />

            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <LineChart lineData={lineData} />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            {/* <Deposits /> */}
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {/* <Orders /> */}
                        </Paper>
                    </Grid>
                </Grid>
                <MonthlySavings
                    initialSavings={values.initialSavings}
                    yieldRate={values.yieldRate}
                    yearsAhead={values.yearsAhead}
                    handleChange={handleChange}
                >
                </MonthlySavings>
            </Container>
        </main>
    )
}

export default Dashboard