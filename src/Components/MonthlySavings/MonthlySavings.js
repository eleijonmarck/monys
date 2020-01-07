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
            suffix=" %"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FormPropsTextFields() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        textmask: '(1  )    -    ',
        numberformat: '8',
    });

    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    required
                    id="standard-number"
                    label="Required"
                    type='number'
                    placeholder='initialSavings'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    required
                    id="standard-helperText"
                    label="Interest Rate"
                    defaultValue="8"
                    type='number'
                    helperText="Some important text"
                />
                <TextField
                    label="Interest Rate"
                    value={values.numberformat}
                    onChange={handleChange('numberformat')}
                    id="formatted-numberformat-input"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                />
            </div>
        </form>
    );
}