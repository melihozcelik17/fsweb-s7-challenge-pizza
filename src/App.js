import React from "react";
import "./App.css";
import Home from "./components/Home";
import OrderPizza from "./components/OrderPizza";
import Success from "./components/Success";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



const App = () => {



  return (
    <Router>
      <Switch>
        <Route exact path="/" id="order-pizza" component={Home} />
        <Route path="/orderPizza" component={OrderPizza} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>

  );
};
export default App;
