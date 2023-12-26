const express = require('express');
const app = express();

//Node JS system module

const fs = require('fs');

//Load website

app.use(express.static('client'));
app.use(express.json());