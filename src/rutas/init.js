const { Router } = require('express');
const firebase = require('firebase');
const Main = Router();

Main.get('/:user/:pass',async (req,res)=>{
    var data = await firebase.auth().signInWithEmailAndPassword(req.params.user,req.params.pass).catch(e=>e.code);
    if(typeof data !== "string"){
        res.json(await data.user.getIdToken());
    }else{
        res.json({
            "error":data
        });
    }
    
})

Main.get('/',(req,res)=>{
    res.json({});
})

module.exports = Main;