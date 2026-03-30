import express, { Router } from "express"
import { db } from "../db.js";
import { cars } from "../schema.js";
import { eq } from "drizzle-orm";

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

router.get("/", async (req, res) => {
    const allCars = await db.select().from(cars)
    res.json(allCars);
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const selectedCar = await db.select().from(cars).where(eq(cars.id, id))
    if (selectedCar.length === 0) {
        return res.status(404).send('car not found');
    }
    res.json(selectedCar)
});

router.post("/", async (req, res) => {
    const { name, model, year, price } = req.body

    if (!name || !model || !year || !price) {
        return res.status(400).json({ error: "Missing data" })
    }

    const [newCar] = await db.insert(cars).values({ name, model, year, price }).returning();

    res.status(201).json(newCar)
});


router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, model, year, price } = req.body

    const updatedCars = await db
        .update(cars)
        .set({ name, model, year, price })
        .where(eq(cars.id, id))
        .returning()

    if (updatedCars === 0) {
        return res.status(404).send({ error: "car not exist" })
    }

    res.json(updatedCars[0]);
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const deletCar = await db.delete(cars).where(eq(cars.id, id)).returning();

    if (deletCar.length === 0) {
        return res.status(404).json({ error: "car not found" })
    }

    res.json({ message: "delete successfully", car: deletCar[0] });
});

app.use('/api/v1/cars', router);

app.listen(port, () => {
    console.log("the app work in port:" + port);
})
