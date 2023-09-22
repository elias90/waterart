import axios from "axios";
import { Clients, Entries, Users } from "../config/db.js";
import mongoose from "mongoose";

const urlDB = 'mongodb+srv://eliasripari:EGaw8idgIJYBSZFl@cluster.wrj9rtk.mongodb.net/?retryWrites=true'

class Controller {
    
    static async index(req, res) {
        const clients = await Clients.find();
        const entries = await Entries.find();
        const users = await Users.find();
        res.json({
            clients: clients,
            entries: entries,
            users: users
        });
    }

    /************** 
     GET DATA
    **************/

    static async getClients(req, res) {
        const clients = await Clients.find();
        res.json({
            clients: clients
        })
    }

    static async getEntries(req, res) {
        const entries = await Entries.find();
        res.json({
            entries: entries
        })
    }

    static async getUsers(req, res) {
        const entries = await Entries.find();
        res.json({
            users: users
        })
    }

    /************** 
    ADD DATA
    **************/

    static async addEntry(req, res) {
        const newEntry = {
            typeEntry: req.body.typeEntry,
            dateEntry: req.body.dateEntry,
            balance: req.body.balance,
            worker: req.body.worker,
            workDuration: req.body.workDuration,
            notes: req.body.notes,
            clientId: req.body.clientId
            
        }

        const addNewEntry = new Entries(newEntry);
        await addNewEntry.save();
        res.json(addNewEntry);
    }

    static async addClient(req, res) {
        const newClient = {
            name: req.body.name,
            surname: req.body.surname,
            city: req.body.city,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email
            
        }

        const addNewClient = new Clients(newClient);
        await addNewClient.save();
        res.json(addNewClient);
    }

    static async addUser(req, res) {
        const newUser = {
            username: req.body.username,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            role: req.body.role
        }

        const addNewUser = new Users(newUser);
        await addNewUser.save();
        res.json(addNewUser)
    }

    /************** 
    EDIT DATA
    **************/

    static async editEntry(req, res) {
        const editEntry = {
            typeEntry: req.body.typeEntry,
            dateEntry: req.body.dateEntry,
            balance: req.body.balance,
            worker: req.body.worker,
            workDuration: req.body.workDuration,
            notes: req.body.notes,
            clientId: req.body.clientId
        }

        const entryId = req.params.id; // Corretto da req.paramas.id a req.params.id

        const updateEntry = await Entries.findByIdAndUpdate(
            { _id: entryId },
            editEntry,
            { new: true }
        );

        res.status(200).json(updateEntry)
    }

    /************** 
    DELETE DATA
    **************/

    static async deleteEntry(req, res) {
        const entryId = req.params.id
        const entry = await Entries.findByIdAndDelete(entryId);
        res.status(200).send({message: "Intervento cancellato"})
    }

}


export {Controller}