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
     res.render('pallet')
});
app.get('/pallet/:id', async (req, res) => {
     const warehouse = await Warehouse.findByPk(req.params.id,
        {include: {
           model: Pallet,
           include: Box}
       })
    // let eachPallet =pallet.Pallets[0]
     res.render('pallet',{warehouse});
     
//  res.json(pallet.Pallets[0].count_of_pallet);
//res.json(pallet);
});
app.get('/pallets', async (req, res) => {
    const pallets = await Pallet.findAll();
    res.render('pallets',{pallets});
    
});
// app.get('/newpalletform', async (req, res) => {
//     //const warehouses = await Warehouse.findAll();
//     res.render('newpalletform');
    
// });
app.get('/newboxform', async (req, res) => {
    //const warehouses = await Warehouse.findAll();
    res.render('newboxform');
    
});
app.get('/signup', async (req, res) => {
    //const warehouses = await Warehouse.findAll();
    res.render('signup');
    
});

app.get('/login', async (req, res) => {
    //const warehouses = await Warehouse.findAll();
    res.render('login');
    
});
app.get('/newwarehouseform', async (req, res) => {
    const warehouse = await Warehouse.findAll();
     res.render('newwarehouseform',{warehouse});
    //  res.json(warehouse)
});
app.get('/newwarehouseform/:id', async (req, res) => {
     const warehouse = await Warehouse.findByPk(req.params.id,
        {include: {
           model: Pallet,
           include: Box}
       })
     res.render('newwarehouseform',{warehouse});
    // res.json(warehouse);
});
app.get('/newpalletform/:id', async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id,
        {include: {
           model: Pallet,
           include: Box}
       })
     res.render('newpalletform',{warehouse});
    //  res.json(warehouse)
});
app.post('/newwarehouseform', async (req, res) => {
    const newWarehouse = await Warehouse.create(req.body) 
    let warehouseAlert = `${newWarehouse.name} created and added to your database`
    const foundWarehouse = await Warehouse.findByPk(newWarehouse.id)
    if(foundWarehouse){
        res.render('newwarehouseform',{warehouseAlert})
    } else {
        warehouseAlert = 'Failed to add Warehouse'
        res.render('newwarehouseform',{warehouseAlert})
    } 
});

app.post('/newpalletform/:id', async (req, res) => {
    let palletAlert=''
   const newPallet= await Pallet.create({capacity_of_pallet:req.body.capacity_of_pallet, WarehouseId: req.params.id}) 
    
      palletAlert = `Pallet created and added to your database`
     const foundPallet = await Pallet.findByPk(newPallet.id)
    if(foundPallet){
        res.render('newpalletform',{palletAlert})
    } else {
        palletAlert = 'Failed to add Pallet'
        res.render('newpalletform',{palletAlert})
        
    } 
       
        // res.redirect(`/warehouses`)

});


app.get('/newboxform/:id', async (req, res) => {
    const pallet = await Pallet.findByPk(req.params.id
    ,
        {include:  Box
         
       })
     res.render('newboxform',{pallet});
    //  res.json(warehouse)
});
app.post('/newboxform/:id', async (req, res) => {
    let boxAlert=''
   const newBox= await Box.create({box_name:req.body.box_name, PalletId:req.params.id}) 
    
   boxAlert = `Box created and added to your database`
     const foundBox = await Box.findByPk(newBox.id)
    if(foundBox){
        res.render('newboxform',{boxAlert})
    } else {
        boxAlert = 'Failed to add Box'
        res.render('newboxform',{boxAlert})
        
    } 
       
        // res.redirect(`/warehouses`)

});

// app.get('/box', async (req, res) => {
   
//     const pallet = await Pallet.findAll()
      
//      res.render('box');
// });



app.get('/box/:id', async (req, res) => {
     const pallet = await Pallet.findByPk(req.params.id)
    //     {include: {
    //        model: Pallet,
    //        include: Box}
    //    })
   console.log(pallet)
     res.render('box',{pallet});
     
//  res.json(pallet.Pallets[0].count_of_pallet);
//res.json(pallet);
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