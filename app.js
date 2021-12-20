const express = require("express");

const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const {sequelize}=require('./db')
const Warehouse = require('./models/warehouse');
const Pallet = require('./models/pallet');
const Box = require('./models/box');

const initialiseDb = require('./initialiseDb');
initialiseDb();
const port = 3000;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

const handlebars = expressHandlebars({
    handlebars : allowInsecurePrototypeAccess(Handlebars)
})

app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    res.redirect('/warehouses')
})
app.get('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.findAll();
    res.render('warehouses',{warehouses});
    
});

app.get('/warehouses/:id', async (req, res) => {
    
    const warehouse = await Warehouse.findByPk(req.params.id, {include: {
            model: Pallet,
            include: Box
        }
    });
     res.render('warehouse',{warehouse});
    //res.json(warehouses);
});
app.get('/pallet', async (req, res) => {
    const warehouse = await Warehouse.findAll();
     //res.render('pallets',{pallets});
     res.json(warehouse)
});
app.get('/pallet/:id', async (req, res) => {
     const warehouse = await Warehouse.findByPk(req.params.id,
        {include: {
           model: Pallet,
           include: Box}
       })
    //  res.render('pallet',{pallet});
    res.json(warehouse);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});