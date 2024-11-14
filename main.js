const express = require('express');
const app = express();
const usermodel = require('./models/user')

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.get("/", function(req , res){
    res.render("index");
})
app.get("/read", async function(req , res){
    const userdata = await usermodel.find();
    res.render("read" , {users : userdata});
})
app.get("/delete/:deleteid" , async ( req , res) => {
    await usermodel.findOneAndDelete({ _id : req.params.deleteid})
    res.redirect('/read')
})  
app.get("/edit/:editid" , async ( req , res) => {
    let edituser = await usermodel.findOne({_id : req.params.editid})
    const {name , email , url , _id} = edituser
    res.render("edit" , {name , email , url , _id})
})  
app.post("/create", async (req , res) => {
    const { name , email , url } = req.body;
    const user = await usermodel.create({
        name,
        email,
        url
    })
    res.redirect('/read')
})

app.post("/update/:id" , async (req , res) => {
    const { name , email , url , _id} = req.body ;
    await usermodel.findOneAndUpdate({_id : req.params.id} , {name , email , url} , {new : true})
    res.redirect("/read")
})

app.listen(3000);