import React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LineChart from '../../Components/Chart/LineChart';
// import Deposits from './../Deposits/Deposits';
import Orders from './../Orders/Orders';
import FinancialParameters from '../../Components/FinancialParameters/FinancialParameters'

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
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
    }),
);

const defaultValues = {
    initialSavings: 1000,
    monthlySavings: 25000,
    lumpSums: 100000,
    yieldRate: 8,
    yearsAhead: 10.0,
}

const Dashboard = (props) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    function growth(initialSavings, monthlySavings, lumpSums, yieldRate, yearsAhead) {
        let y = []
        var amount = parseFloat(initialSavings) || 0;
        y.push(parseFloat(amount))

        monthlySavings = parseFloat(monthlySavings || 0)
        lumpSums = parseFloat(lumpSums || 0)
        yieldRate = parseFloat(yieldRate / 100 + 1)

        for (let step = 0; step < yearsAhead; step++) {
            // currently everything happens yearly
            // for each year you increase by 12 * monthlySavings
            // and lumpSum
            let nextY = (amount + 12.0 * monthlySavings + lumpSums) * yieldRate
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
        let currentYear = new Date().getFullYear()
        for (let step = 0; step < y.length; step++) {
            lineData.table.push({
                'x': step + currentYear,
                'y': y[step],
                'c': 0
            })
        }
        return lineData
    }

    const [values, setValues] = React.useState({
        initialSavings: defaultValues.initialSavings,
        monthlySavings: defaultValues.monthlySavings,
        lumpSums: defaultValues.lumpSums,
        yieldRate: defaultValues.yieldRate,
        yearsAhead: defaultValues.yearsAhead,
        formErrors: {
            initialSavings: '',
            yieldRate: ''
        },
        initialSavingsValid: false,
        monthlySavingsValid: false,
        yieldRateValid: false,
        formErrorsValid: false,
    });

    function validateField(fieldName, value) {
        let fieldValidationErrors = values.formErrors;
        let initialSavingsValid = values.initialSavingsValid;
        let yieldRateValid = values.yieldRateValid;

        switch (fieldName) {
            case 'intialSavings':
                if (Number.isInteger(value) && (value > 0)) {
                    initialSavingsValid = true
                }

                fieldValidationErrors.initialSavings = initialSavingsValid ? '' : ' is invalid';
                break;
            case 'yieldRate':

                if (Number.isInteger(value) && (value < 100) && (value > 0)) {
                    yieldRateValid = true
                }
                fieldValidationErrors.yieldRateValid = yieldRateValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        setValues({
            formErrors: fieldValidationErrors,
            initialSavingsValid: initialSavingsValid,
            yieldRateValid: yieldRateValid
        }, validateForm)
    }

    function validateForm() {
        setValues(
            { formValid: values.initialSavingsValid && values.yieldRateValid }
        )
    }

    const [lineData, setLineData] = React.useState(
        createLineData(
            growth(
                defaultValues.initialSavings,
                defaultValues.monthlySavings,
                defaultValues.lumpSums,
                defaultValues.yieldRate,
                defaultValues.yearsAhead,
            )
        )
    )


    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: (parseFloat(event.target.value) || ''),
        }, () => { validateField(name, event.target.value) });
    };

    React.useEffect(() => {
        newLineData()
    }, [
        values.initialSavings,
        values.monthlySavings,
        values.lumpSums,
        values.yieldRate,
        values.yearsAhead,
    ])

    const newLineData = () => {
        // handle if bad data.

        // display something in chart that says bad input data
        setLineData(
            createLineData(
                growth(
                    values.initialSavings,
                    values.monthlySavings,
                    values.lumpSums,
                    values.yieldRate,
                    values.yearsAhead,
                )
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

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <LineChart lineData={lineData} />
                        </Paper>
                    </Grid>

                    {/* Recent Deposits */}
                    <Grid item xs={12} lg={3}>
                        <Paper >
                            {/* <Deposits /> */}

                            <FinancialParameters
                                initialSavings={values.initialSavings}
                                monthlySavings={values.monthlySavings}
                                lumpSums={values.lumpSums}
                                yieldRate={values.yieldRate}
                                yearsAhead={values.yearsAhead}
                                handleChange={handleChange}
                            >
                            </FinancialParameters>

                        </Paper>
                    </Grid>

                    {/* Recent Orders */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={classes.paper}>
                            <Orders
                                lineData={lineData}
                            >
                            </Orders>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </main >
    )
}

export default Dashboard