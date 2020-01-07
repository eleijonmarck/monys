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

const lineData = {
    table: [
        { "x": 1, "y": 28 }, { "x": 2, "y": 55 },
        { "x": 3, "y": 43 }, { "x": 4, "y": 91 },
        { "x": 5, "y": 81 }, { "x": 6, "y": 53 },
        { "x": 7, "y": 19 }, { "x": 8, "y": 87 },
        { "x": 9, "y": 52 }, { "x": 10, "y": 48 },
        { "x": 11, "y": 24 }, { "x": 12, "y": 49 },
        { "x": 13, "y": 87 }, { "x": 14, "y": 66 },
        { "x": 15, "y": 17 }, { "x": 16, "y": 27 },
        { "x": 17, "y": 68 }, { "x": 18, "y": 16 },
        { "x": 19, "y": 49 }, { "x": 20, "y": 16 }
    ]
};


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

    "data": [
        {
            "name": "table",
            "values": [
                { "x": 0, "y": 28, "c": 0 }, { "x": 0, "y": 20, "c": 1 },
                { "x": 1, "y": 43, "c": 0 }, { "x": 1, "y": 35, "c": 1 },
                { "x": 2, "y": 81, "c": 0 }, { "x": 2, "y": 10, "c": 1 },
                { "x": 3, "y": 19, "c": 0 }, { "x": 3, "y": 15, "c": 1 },
                { "x": 4, "y": 52, "c": 0 }, { "x": 4, "y": 48, "c": 1 },
                { "x": 5, "y": 24, "c": 0 }, { "x": 5, "y": 28, "c": 1 },
                { "x": 6, "y": 87, "c": 0 }, { "x": 6, "y": 66, "c": 1 },
                { "x": 7, "y": 17, "c": 0 }, { "x": 7, "y": 27, "c": 1 },
                { "x": 8, "y": 68, "c": 0 }, { "x": 8, "y": 16, "c": 1 },
                { "x": 9, "y": 49, "c": 0 }, { "x": 9, "y": 25, "c": 1 }
            ]
        }
    ],

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
// const lineSpec = {
//     "width": 600,
//     "height": 250,
//     "padding": { "top": 10, "left": 30, "bottom": 30, "right": 10 },
//     "data": [{ "name": "table" }],
//     'signals': [
//         {
//             'name': 'hover', 'init': null,
//             'streams': [
//                 { 'type': '@bar:mouseover', 'expr': 'datum' },
//                 { 'type': '@bar:mouseout', 'expr': 'null' }
//             ]
//         }
//     ],
//     "scales": [
//         {
//             "name": "x",
//             "type": "ordinal",
//             "range": "width",
//             "domain": { "data": "table", "field": "x" }
//         },
//         {
//             "name": "y",
//             "type": "linear",
//             "range": "height",
//             "domain": { "data": "table", "field": "y" },
//             "nice": true
//         }
//     ],
//     "axes": [
//         { "type": "x", "scale": "x" },
//         { "type": "y", "scale": "y" }
//     ],
//     "marks": [
//         {
//             "type": "rect",
//             "name": "bar",
//             "from": { "data": "table" },
//             "properties": {
//                 "enter": {
//                     "x": { "scale": "x", "field": "x" },
//                     "width": { "scale": "x", "band": true, "offset": -1 },
//                     "y": { "scale": "y", "field": "y" },
//                     "y2": { "scale": "y", "value": 0 }
//                 },
//                 "update": {
//                     "fill": { "value": "steelblue" }
//                 },
//                 "hover": {
//                     "fill": { "value": "green" }
//                 }
//             }
//         }
//     ]
// };

function handleHover(...args) {
    console.log(args);
}

const signalListeners = { hover: handleHover };

export default function Chart() {
    return (
        <React.Fragment>
            <Container>

                <Vega spec={lineSpec} data={lineData} signalListeners={signalListeners} />
                {/* <Vega spec={barSpec} data={barData} signalListeners={signalListeners} /> */}
            </Container>
        </React.Fragment>
    )
}