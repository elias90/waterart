import express from 'express';
//import axios from 'axios'; 
import cors from 'cors';
//import url from 'url';
import router from './router/router.js';
// import session from 'express-session';
// import { v4 as uuidv4 } from 'uuid'

import mongoose from 'mongoose';

//const mongoose = require('mongoose');

const app = express() // Creiamo l'applicaizone express
const port = 8020

app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
app.set('view engine', 'ejs');
app.use(cors())

app.use('/', router)

app.listen(port)