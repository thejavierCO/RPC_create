const { Router } = require('express');
const config = require('../config');
const api = Router()

var app = config;

api.get("/:cmd",async function(req,res){
    switch(req.params.cmd){
        case "getUser":
            var user = await app.auth().signInAnonymously().catch(e=>e);
            console.log(user);
            res.json([req.params,user]);
        break;
        default:
            res.json([req.params,req.headers]);
    }  
})

api.get("/",function(req,res){
    res.json({})
})

module.exports = api