
import React from 'react'

function PizzaItem({ pizza, pizzaSelection, handleClick }) {

    console.log("pizza", pizza)

    return (<>
        {pizza && (
            <div className='description'>
                <img src={pizza.image} alt={pizza.name} />
                <h1>{pizza.name}</h1>
                <p >{pizza.description > 30 ? pizza.description.substr(0, 30) + "..." : pizza.description}</p>
                <button onClick={() => handleClick(pizza.id)}>{pizzaSelection === pizza.id ? "Selected" : "Add Cart"}</button>
            </div>
        )}
    </>
    )
}

export default PizzaItem