const { Router } = require('express');
const main = Router()

main.get("/",function(req,res){
    res.render('main');
})

module.exports = main