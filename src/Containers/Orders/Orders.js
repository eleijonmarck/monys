import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './../Title/Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders(props) {
    const classes = useStyles();

    var nf = new Intl.NumberFormat({ style: 'currency', currency: 'SEK' });

    return (
        <React.Fragment>
            <Title>Scenarios</Title>
            <Table size="small">
                <TableHead>
                    <TableCell>scenario x</TableCell>
                    {props.lineData.table.map(row => (
                        <TableCell>{new Date().getFullYear() + row.x}</TableCell>
                    ))}
                    <TableRow>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableCell>x</TableCell>
                    {props.lineData.table.map(row => (
                        <TableCell>{nf.format(Math.trunc(row.y))}</TableCell>
                    ))}
                    <TableRow>
                    </TableRow>
                </TableBody>
            </Table>
            <Title>Pinned Scenarios</Title>
            <Table size="small">
                <TableHead>
                    <TableCell>scenario y</TableCell>
                    {props.lineData.table.map(row => (
                        <TableCell>Year {row.x}</TableCell>
                    ))}
                    <TableRow>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableCell>y</TableCell>
                    {props.lineData.table.map(row => (
                        <TableCell>{}</TableCell>
                    ))}
                    <TableRow>
                    </TableRow>
                </TableBody>
            </Table>

            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
        </Link>
            </div>
        </React.Fragment>
    );
}