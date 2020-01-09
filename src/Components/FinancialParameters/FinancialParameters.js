import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function FinancialParameters(props) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="standard-number"
                    label="Initial Savings"
                    type='number'
                    value={props.initialSavings}
                    onChange={props.handleChange('initialSavings')}
                    placeholder='initialSavings'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    required
                    id="monthlySavings"
                    label="Monthly Savings"
                    value={props.monthlySavings}
                    onChange={props.handleChange('monthlySavings')}
                    helperText="Some important text"
                    InputProps={{
                        shrink: 'true',
                    }}
                />
                <TextField
                    required
                    label="Yield Percentage / Year"
                    type='number'
                    value={props.yieldRate}
                    onChange={props.handleChange('yieldRate')}
                    id="formatted-numberformat-input"
                    helperText="Some important text"
                />
                <TextField
                    required
                    label="Years Ahead"
                    value={props.yearsAhead}
                    onChange={props.handleChange('yearsAhead')}
                    id="formatted-numberformat-input"
                    helperText="Some important text"
                    InputProps={{
                        shrink: 'true',
                    }}
                />

            </div>
        </form>
    );
}