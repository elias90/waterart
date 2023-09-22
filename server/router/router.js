import express from "express";
import { Controller } from "../controller/controller.js";

const router = express.Router()

router
    .get('/', Controller.index)

router
    .get('/clients', Controller.getClients)
    .post('/addClient', Controller.addClient)

router
    .get('/entries', Controller.getEntries)
    .post('/addEntry', Controller.addEntry)
    .patch('/editEntry/:id', Controller.editEntry)
    .delete('/deleteEntry/:id', Controller.deleteEntry)

router
    .post('/adduser', Controller.addUser)


export default router