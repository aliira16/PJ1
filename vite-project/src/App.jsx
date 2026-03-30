import React, { useEffect, useState } from "react";
import Car from "./components/Car"

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('api/v1/cars')
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.log(err));
  }, [])

  console.log(cars);
  return (
    <div>
      {cars.map((car) => { return <Car key={car.id} {...car} /> })}
    </div> 
  )
}

export default App;