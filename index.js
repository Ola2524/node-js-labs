const express=require('express');
const fs=require("fs")
const app=express();
const cors=require('cors')

app.use(cors());
app.use(function(req,res,next) 
{
console.log("hi in midelware")
next();
})

app.use(express.urlencoded({extended:true}))
app.get('/getregister',function(req,res)
{
        let html=fs.readFileSync("register.html",'utf-8');
        res.send(html);
})

app.post('/register',function(req,res)
{
    let data=JSON.parse(fs.readFileSync("users.txt",'utf-8'))
    console.log(req.body)

    if(req.body.user==''){
        res.status(424).send("error:” {username} is required”")
    }
    else if(req.body.pass==''){
        res.status(424).send("error:” {password} is required”")
    }
    else if(req.body.name==''){
        res.status(424).send("error:” {name} is required”")
    }
    else{
        data.push(req.body);
        fs.writeFileSync("users.txt",JSON.stringify(data));
        res.send("user was registered successfully");
    }
})

app.get('/getlogin',function(req,res)
{
    let html=fs.readFileSync("index.html",'utf-8');
    res.send(html);
})

app.post('/setlogin',function(req,res)
{
    let data=JSON.parse(fs.readFileSync("users.txt",'utf-8'))
    console.log(req.body)
    data.forEach(user => {
        if(user.user == req.body.user && req.body.user!=''){
            if(user.pass == req.body.pass && req.body.pass){
                app.use(express.urlencoded({extended:true}))
                res.send("{message: logged in successfully, profile:{name:”" + user.name + "”}}");
            }else{
                res.status(424).send("{error:”invalid credentials”}");
            }
        }
    });
})

app.get('/todos',function(req,res)
{
    let data=JSON.parse(fs.readFileSync("todos.txt",'utf-8'))
    res.send(data);
})

app.get('/gettodos',function(req,res)
{
    let html=fs.readFileSync("todos.html",'utf-8');
    res.send(html);
})

app.use(express.urlencoded({extended:true}))
app.post('/settodos',function(req,res)
{
    app.use(express.urlencoded({extended:true}))

    let data=JSON.parse(fs.readFileSync("todos.txt",'utf-8'))
    console.log(req.body)

    if(req.body.user==''){
        res.status(424).send("error:” {username} is required”")
    }
    else if(req.body.title==''){
        res.status(424).send("error:” {title} is required”")
    }
    else{
        data.push(req.body);
        fs.writeFileSync("todos.txt",JSON.stringify(data));
        res.send("{message: todo created successfully}");
    }
})

app.get('/todos/:id',function(req,res)
{
    let data=JSON.parse(fs.readFileSync("todos.txt",'utf-8'))
    console.log(req.params.id)
    app.use(express.urlencoded({extended:true}))
    res.send(data[parseInt(req.params.id)])
})

app.listen(7777,function()
{
    console.log('hi...')
})