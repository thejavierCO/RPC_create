const { Router } = require('express');
const main = Router()

main.get("/",function(req,res){
    res.json({})
})

module.exports = main