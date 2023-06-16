import React from "react";
import PizzaItem from "./PizzaItem";
import Header from "./Header";
import "./OrderPizza.css"
import PizzaForm from "./PizzaForm";
import Pizza from "../Data/Pizza.js"

import { useState } from "react"


const OrderPizza = () => {
    const [pizzaSelection, setPizzaSelection] = useState()

    const handleClick = (index) => {
        setPizzaSelection(index)
    }


    return (
        <div>
            <Header />
            <ul className="pizza-list">
                {Pizza.map((item) => (
                    <li key={item.name} className="">
                        <PizzaItem pizza={item} pizzaSelection={pizzaSelection} handleClick={handleClick} />
                    </li>
                ))}
            </ul>

            <PizzaForm pizzaSelection={pizzaSelection} />
        </div>
    )

};

export default OrderPizza;