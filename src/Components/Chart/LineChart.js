import React from 'react';
import { Vega } from 'react-vega';
import Container from '@material-ui/core/Container'

const barSpec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    width: 400,
    height: 200,
    padding: { left: 5, right: 5, top: 5, bottom: 5 },

    "data": [{ "name": "table" }],

    signals: [
        {
            name: 'tooltip',
            value: {},
            on: [
                { events: 'rect:mouseover', update: 'datum' },
                { events: 'rect:mouseout', update: '{}' },
            ],
        },
    ],

    scales: [
        {
            name: 'xscale',
            type: 'band',
            domain: { data: 'table', field: 'category' },
            range: 'width',
        },
        {
            name: 'yscale',
            domain: { data: 'table', field: 'amount' },
            nice: true,
            range: 'height',
        },
    ],

    axes: [{ orient: 'bottom', scale: 'xscale' }, { orient: 'left', scale: 'yscale' }],

    marks: [
        {
            type: 'rect',
            from: { data: 'table' },
            encode: {
                enter: {
                    x: { scale: 'xscale', field: 'category', offset: 1 },
                    width: { scale: 'xscale', band: 1, offset: -1 },
                    y: { scale: 'yscale', field: 'amount' },
                    y2: { scale: 'yscale', value: 0 },
                },
                update: {
                    fill: { value: 'steelblue' },
                },
                hover: {
                    fill: { value: 'red' },
                },
            },
        },
        {
            type: 'text',
            encode: {
                enter: {
                    align: { value: 'center' },
                    baseline: { value: 'bottom' },
                    fill: { value: '#333' },
                },
                update: {
                    x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
                    y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
                    text: { signal: 'tooltip.amount' },
                    fillOpacity: [{ test: 'datum === tooltip', value: 0 }, { value: 1 }],
                },
            },
        },
    ],
};

const barData = {
    table: [
        { category: 'A', amount: 28 },
        { category: 'B', amount: 55 },
        { category: 'C', amount: 43 },
        { category: 'D', amount: 91 },
        { category: 'E', amount: 81 },
        { category: 'F', amount: 53 },
        { category: 'G', amount: 19 },
        { category: 'H', amount: 87 },
    ],
}

const lineSpec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 500,
    "height": 200,
    "padding": 5,

    "signals": [
        {
            "name": "interpolate",
            "value": "linear",
            "bind": {
                "input": "select",
                "options": [
                    "basis",
                    "cardinal",
                    "catmull-rom",
                    "linear",
                    "monotone",
                    "natural",
                    "step",
                    "step-after",
                    "step-before"
                ]
            }
        }
    ],

    "data": [{ "name": "table" }],

    "scales": [
        {
            "name": "x",
            "type": "point",
            "range": "width",
            "domain": { "data": "table", "field": "x" }
        },
        {
            "name": "y",
            "type": "linear",
            "range": "height",
            "nice": true,
            "zero": true,
            "domain": { "data": "table", "field": "y" }
        },
        {
            "name": "color",
            "type": "ordinal",
            "range": "category",
            "domain": { "data": "table", "field": "c" }
        }
    ],

    "axes": [
        { "orient": "bottom", "scale": "x" },
        { "orient": "left", "scale": "y" }
    ],

    "marks": [
        {
            "type": "group",
            "from": {
                "facet": {
                    "name": "series",
                    "data": "table",
                    "groupby": "c"
                }
            },
            "marks": [
                {
                    "type": "line",
                    "from": { "data": "series" },
                    "encode": {
                        "enter": {
                            "x": { "scale": "x", "field": "x" },
                            "y": { "scale": "y", "field": "y" },
                            "stroke": { "scale": "color", "field": "c" },
                            "strokeWidth": { "value": 2 }
                        },
                        "update": {
                            "interpolate": { "signal": "interpolate" },
                            "fillOpacity": { "value": 1 }
                        },
                        "hover": {
                            "fillOpacity": { "value": 0.5 }
                        }
                    }
                }
            ]
        }
    ]
}

function handleHover(...args) {
    console.log(args);
}

const signalListeners = { hover: handleHover };

export default function Chart(props) {
    return (
        <React.Fragment>
            <Container>

                <Vega spec={lineSpec} data={props.lineData} signalListeners={signalListeners} />
                {/* <Vega spec={barSpec} data={barData} signalListeners={signalListeners} /> */}
            </Container>
        </React.Fragment>
    )
}