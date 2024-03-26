// const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");
// const img = require('../../food-oredr/src/images/piz.jpg')

async function main() {
    const uri = "mongodb://localhost://27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const productsCollection = client.db("food-ordering").collection("products");
        const categoriesCollection = client.db("food-ordering").collection("categories");

        let categories = ['brunch','High Tea', 'drinks'].map((category) => { return { name: category } });
    //    await categoriesCollection.insertMany(categories);
       // let foodItems= ['pizza','chinese','punjabi','southIndian']
        let breakfastItems =['Puff','kathiyawadi Dish','manchurian','Dosa','noodles']
        let breakfastPrize = [15,60,100,100,100]
        let drinksItem =['Coca-Cola','Pepsi','Thums Up','Sprite','Fanta','Mirinda',' Mountain Dew','Mazza']
        let products = [];
        for (let i = 0; i < 4; i+=1) {
        let newProduct = {
            name: breakfastItems[i],
            adjective: "Awesome",
            price:breakfastPrize[i],
            category: categories[0],
            imageUrl: " "
        };
        products.push(newProduct);
        }
        await productsCollection.insertMany(products);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();