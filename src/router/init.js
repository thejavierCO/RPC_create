const { Router } = require('express');
const config = require('../config');
const api = Router()

var app = config;

api.get("/:cmd",async function(req,res){
    res.json({})
})

api.get("/",function(req,res){
    res.json({});
})

module.exports = api