import React from 'react';
import { Vega } from 'react-vega';
import Container from '@material-ui/core/Container'
import { Handler } from 'vega-tooltip';

export default function Chart(props) {
    let lineSpec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "width": 500,
        "height": 200,
        "padding": 5,

        "signals": [
            {
                "name": "hover",
                "value": null,
                "on": [
                    { "events": "mouseover", "update": "datum" },
                    { "events": "mouseout", "update": "null" }
                ]
            }
        ],
        "data": [
            {
                "name": "table",
                "values": []
            },
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
                "width": 30,
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
                        // "width": 30,
                        "height": 30,
                        "encode": {
                            "enter": {
                                "x": { "scale": "x", "field": "x" },
                                "y": { "scale": "y", "field": "y" },
                                "stroke": { "scale": "color", "field": "c" },
                                "strokeWidth": { "value": 2 },
                                // "tooltip": { "field": "x", "field": "y" }
                                "tooltip": { "signal": "datum" }
                            },

                        },
                        "update": {
                            "fillOpacity": { "value": 1 },
                            "tooltip": { "signal": "datum" }

                        },
                        "hover": {
                            "fillOpacity": { "value": 6.5 },
                            "tooltip": { "signal": "datum" }
                        }
                    },
                ]
            }
        ]
    }

    const [spec, setSpec] = React.useState(lineSpec)

    React.useEffect(() => {
        let data = [{ "name": "table", "values": props.lineData.table }]
        setSpec(() => (
            {
                ...spec,
                'data': data
            }
        ))
    }, [props])

    return (
        <React.Fragment>
            <Container>
                <Vega spec={spec} tooltip={new Handler().call} />
                {/* <Vega spec={spec} /> */}
            </Container>
        </React.Fragment>
    )
}