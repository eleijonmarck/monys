import React from "react";
import "./App.css";
import MenuDrawer from './Containers/MenuDrawer/MenuDrawer'

// routing
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScenarioRoute from './Routes/Scenario'
import Login from './Routes/Login/Login'
import NotFound from './Routes/NotFound/NotFound'

const App = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <MenuDrawer
                    open={open}
                    handleDrawerClose={handleDrawerClose}
                    handleDrawerOpen={handleDrawerOpen}
                >
                </MenuDrawer>
                <Switch>
                    <Route exactly path="/login" component={Login} />
                    <Route exactly path="/scenario" component={() => <ScenarioRoute open={open} />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;