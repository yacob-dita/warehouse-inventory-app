const db = require('../db');
const fs = require('fs/promises');
const path = require('path');
const initialiseDb = require('../initialiseDb');
const Warehouse = require('../models/warehouse');
const Pallet = require('../models/pallet');
const Box = require('../models/box');

async function populateDb() {
    await initialiseDb();
    await db.sync({ force: true });
    const buffer = await fs.readFile(path.join(__dirname, '..', 'warehouse.json'));
    const warehouses = JSON.parse(String(buffer));
    for (const warehouseData of warehouses) {
        const warehouse = await Warehouse.create(warehouseData);
        for (const palletData of warehouseData.pallets) {
            const pallet = await Pallet.create(palletData);
            await warehouse.addPallet(pallet);
            for (const boxData of palletData.boxes) {
                const box = await Box.create(boxData);
                await pallet.addBox(box);
            }
        }
    }
}

populateDb();