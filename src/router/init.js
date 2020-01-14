const { Router } = require('express');
const config = require('../config');
const api = Router()

var app = config;
var db = config.firestore();

api.post("/data",async function(req,res){
    switch(Object.keys(req.query)[0]){
        case "account":
        switch(req.query.type){
            case "anon":
                var user = await app.auth().signInAnonymously().then(e=>e).catch(e=>e);
                    res.json(user);
            break;
            case "email":
                if(req.body.email&&req.body.pass){
                    var user = await app.auth().signInWithEmailAndPassword(req.body.email,req.body.pass).then(e=>e).catch(e=>e);
                    res.json(user);
                }else{
                    res.json({type:"email"})
                }
            break;
            default:
                res.json({})
        }
        break;
        case "get":
        if(typeof req.query.get === "string"){
            var data = await db.collection(req.query.get).get().then(r=>r.docs.map(doc => [doc.id,doc.data()])).catch(r=>r);
            res.json(data);
        }else{
            req.json({})
        }
        break;
        case "base":
        if(req.query.base){
            try {
                console.log('Sintaxis Correcta');
                var data = await db.collection(req.query.base)
                .add(req.body.set?req.body.set:req.query.set?JSON.parse(req.query.set):{data:"error_not_info"})
                .then(r=>{
                    return success = {
                        info:req.body.set?req.body.set:req.query.set?JSON.parse(req.query.set):{data:"error_not_info"},
                        base:req.query.base
                    }
                })
                .catch(r=>r);
                res.json(data);
            }
            catch (error) {
                if(error instanceof SyntaxError) {
                    let mensaje = error.message;
                    res.json({error:'ERROR EN LA SINTAXIS:'+ mensaje})
                } else {
                    res.json({error:error})
                    throw error; // si es otro error, que lo siga lanzando
                }
                
            }
        }else{
            req.json({tipo:"set"})
        }
        break;
        default:
        res.json({});
    }
})

api.post("/",function(req,res){
    res.json({});
})
api.get("/",async function(req,res){
    res.render('main')
})

module.exports = api