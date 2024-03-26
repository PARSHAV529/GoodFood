const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./db');
const app = express();
const productRouter = require('./routes/productRouts');
const categoryRouter = require('./routes/categoryRouts')
const menuRouter = require('./routes/menuItemsRouts')
const cartRouter = require('./routes/cartRoutes')
const sendEmailRouter = require('./sendEmail/sendemail')
const userRouter = require('./routes/userRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')

var corsOptions = {
  origin:["http://localhost:5173","https://food-ordering-parshav-frontend.vercel.app"]
};

app.use(express.json());

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', productRouter);
app.use('/api/', categoryRouter);
app.use('/api/', menuRouter);
app.use('/api/', cartRouter);
app.use('/api/',sendEmailRouter)
app.use('/api/',userRouter)
app.use('/api/',categoriesRoutes)




db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Food Ordering"});
});







const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;