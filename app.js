const express = require("express");
const app = express();

const { body, validationResult } = require('express-validator');
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/registrar",[ //campo de validaciones
    body("nya", "Ingrese un nombre y apellido completo")
        .exists()
        .isLength({min:5}),
    body("email" , "Ingrese un E-mail valido")
        .exists()
        .isEmail(),
    body("edad" , "Ingrese un valor numerico")
        .exists()
        .isNumeric()
], (req, res) =>{
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(req.body)
        const valores  = req.body
        const validaciones = errors.array()
        res.render("index", {validaciones : validaciones , valores : valores})
    }else{
        res.send(" ¡Validación Exitosa! ")
    }
})


app.listen(3000, ()=>{
    console.log("escuchando en el puerto 3000")
})