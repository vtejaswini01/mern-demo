//create mini express api
const exp=require('express')
const app=exp();

app.use(exp.json());

//import mongodbclient
const mc=require("mongodb").MongoClient;

//returns process obj for env variables
require('dotenv').config();

//import path module
const path=require('path')
//connect build of react app with nodejs
app.use(exp.static(path.join(__dirname,'./build')))

//connection string
const databaseUrl=process.env.DATABASE_CONNECTION_URL;
//connect to DB
mc.connect(databaseUrl)
.then((client)=>{
   //get db object
   let dbobj=client.db("demo-db")
   //create collection
   let usercollectionobj = dbobj.collection("usercollection");
   let productcollectionobj=dbobj.collection("productcollection");
   //sharing collection obj to respective apis
   app.set("usercollectionobj",usercollectionobj);
   app.set("productcollectionobj",productcollectionobj);
   console.log("connnection success")
})
.catch(err=>console.log("Error in connection",err))

//import apis
const userApp=require('./apis/userApi')
const productApp=require('./apis/productApi');


//execute specific middleware based on path
app.use('/user-api',userApp)
app.use('/product-api',productApp)


//create a middleware
const middleware1=(req,res,next)=>{
    console.log("Middleware - 1")
    next()
}
//use middleware
//app.use(middleware1)


//handling page refresh
app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./build/index.html"))
})


//middleware to handle invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${request.url} is invalid`})
})

//handling errors
app.use((error,req,res,next)=>{
    
    res.send({message:"Error Occured", reason:`${error.message}`})
})

//assign port number 
const port=process.env.PORT;
app.listen(port,()=>console.log(`Web server listening on ${port}`)) 