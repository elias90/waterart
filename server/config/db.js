import mongoose from "mongoose";

const urlDB = 'mongodb+srv://eliasripari:EGaw8idgIJYBSZFl@cluster.wrj9rtk.mongodb.net/waterart'

mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {console.log('Connesso a MongoDB')})
    .catch(err => console.log(err))

// Schemas

const ClientsSchema = new mongoose.Schema({
    name: {type: String, required: false},
    surname: {type: String, required: false},
    city: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: Number, required: false},
    email: {type: String, required: false},
})

const EntriesSchema = new mongoose.Schema({
    typeEntry: {type: String, required: false},
    dateEntry: {type: Date, required: false},
    worker: {type: String, required: false},
    workDuration: {type: Number, required: false},
    notes: {type: String, required: false},
    clientId: {type: String, required: false}
})

const UsersSchema = new mongoose.Schema({
    username: {type: String, required: false},
    userEmail: {type: String, required: false},
    userPassword: {type: String, required: false},
    role: {type: String, require: false}
})

export const Clients = mongoose.model("clients", ClientsSchema)
export const Entries = mongoose.model("entries", EntriesSchema)
export const Users = mongoose.model("users", UsersSchema)