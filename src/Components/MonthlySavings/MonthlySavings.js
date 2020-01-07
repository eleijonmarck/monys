import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        // suffix=" %"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FormPropsTextFields(props) {
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
                    label="Interest Rate per Year"
                    value={props.interestRate}
                    onChange={props.handleChange('interestRate')}
                    id="formatted-numberformat-input"
                    helperText="Some important text"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
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