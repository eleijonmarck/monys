import React from 'react'

import Dashboard from './../../Containers/Dashboard/Dashboard'

export default function Scenario(props) {
    return (
        <Dashboard open={props.open}></Dashboard>
    )
}