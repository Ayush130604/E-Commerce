const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name : "ayu1",
        img : "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 1100,
        desc : "abc1"
    },
    {
        name : "ayu2",
        img : "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 1200,
        desc : "abc2"
    },
    {
        name : "ayu3",
        img : "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 1300,
        desc : "abc3"
    },
    {
        name : "ayu4",
        img : "https://images.unsplash.com/photo-1719937051124-91c677bc58fc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price : 1400,
        desc : "abc4"
    }
]

async function  seedDB(){
    await Product.insertMany(products);
    console.log("Data of SeedDB is succesfully Done");    
}

module.exports = seedDB;