import React from 'react';

import ScenarioList from './ScenarioList'
import Scenario from './Scenario'
import Dashboard from '../../Containers/Dashboard/Dashboard';

const ScenarioRoute = () => {

    return (
        <React.Fragment>
            <ScenarioList ></ScenarioList>
            <Scenario></Scenario>
            <Dashboard></Dashboard>
        </React.Fragment>
    )
}
export default ScenarioRoute