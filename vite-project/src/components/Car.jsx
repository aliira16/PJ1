import React from "react"
const Car = ({ name, model, year, price }) => {
    console.log("car is work")
    return (
        <div>
            <h1>name: {name}</h1>
            <h4>model: {model}</h4>
            <p>Year: {year}</p>
            <p>Price: {price}</p>
        </div>
    )
}

export default Car;