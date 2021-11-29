import Express  from "express";
import  mongoose from "mongoose";
import Cards from "./dbCards.js";
import cors from "cors"
// App Config

const app = Express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://akiidagar:hEBEvwTVy3Cu3se@cluster0.up9uw.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middlewares
app.use(Express.json());
app.use(cors());
// DB config
mongoose.connect(connection_url)

//API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO CLEVER PROGRAMERS!!!"))

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

// Listner
app.listen(port, () => console.log(`listning on localhost: ${port}`));