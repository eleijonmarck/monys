import React from 'react'

import Dashboard from './../../Containers/Dashboard/Dashboard'

interface dashBoardSettings { open: boolean }

export default function Scenario(props: dashBoardSettings): JSX.Element {
    return (
        <Dashboard open={props.open}></Dashboard>
    )
}