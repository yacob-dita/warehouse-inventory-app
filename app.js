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
app.get('/pallets', async (req, res) => {
    //const warehouses = await Warehouse.findAll();
    res.render('pallets');
    
});
app.get('/signup', async (req, res) => {
    //const warehouses = await Warehouse.findAll();
    res.render('signup');
    
});

app.get('/login', async (req, res) => {
    //const warehouses = await Warehouse.findAll();
    res.render('login');
    
});
app.get('/new-warehouse', async (req, res) => {
    const warehouse = await Warehouse.findAll();
     res.render('newwarehouseform');
    //  res.json(warehouse)
});
app.get('/new-warehouse/:id', async (req, res) => {
     const warehouse = await Warehouse.findByPk(req.params.id,
        {include: {
           model: Pallet,
           include: Box}
       })
     res.render('newwarehouseform');
    // res.json(warehouse);
});

app.post('/new-warehouse', async (req, res) => {
    const newWarehouse = await Warehouse.create(req.body) 
    let warehouseAlert = `${newWarehouse.name} created and added to your database`
    const foundWarehouse = await Warehouse.findByPk(newWarehouse.id)
    if(foundWarehouse){
        res.render('newWarehouseForm',{warehouseAlert})
    } else {
        warehouseAlert = 'Failed to add Warehouse'
        res.render('newWarehouseForm',{warehouseAlert})
    } 
});

app.delete('/warehouses/:id', async (req,res) => {
    const deletedWarehouse = await Warehouse.destroy({
        where: {id:req.params.id}
    })
    res.send(deletedWarehouse ? 'Deleted' : 'Deletion Failed')
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});