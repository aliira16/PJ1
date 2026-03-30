import express, { Router } from "express"
import { db } from "../db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

const router = express.Router();

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
})

let cars = [
    { id: 1, name: "toyota", model: "yarisGR", year: 2024, price: 32000 },
    { id: 2, name: "nissan", model: "patrom", year: 2023, price: 70000 },
    { id: 3, name: "BMW", model: "M5", year: 2024, price: 62000 }
]

router.get("/", (req, res) => {
    res.json(cars);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id)
    if (!car) {
        return res.status(404).send('car not found');
    }
    res.json(car)
});

router.post("/", async (req, res) => {
    const { name, model, year, price } = req.body

    if (!name || !model || !year || !price) {
        res.status(400).json({ error: "Missing data" })
    }

    const [newCar] = await db.insert(cars).values({ name, model, year, price }).returning();

    res.status(201).json(newCar)
});


router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const updateCarsIndex = cars.findIndex((car) => { return car.id === id })

    if (updateCarsIndex === -1) {
        res.status(404).send({ error: "car not exist" })
    }

    const { name, model, year, price } = req.body

    if (name) {
        return cars[name] = name
    }
    if (model) {
        return cars[model] = model
    }

    if (year) {
        return cars[year] = year
    }
    if (price) {
        return cars[price] = price
    }


    res.json(cars[updateCarsIndex]);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    const deletCar = cars.findIndex((car) => { return car.id === id })

    if (id === -1) {
        res.status(404).json({ error: "car not found" })
    }

    cars.splice(deletCar, 1);

    res.json(cars);
});

app.use('/api/v1/cars', router);

app.listen(port, () => {
    console.log("the app work in port:" + port);
})
