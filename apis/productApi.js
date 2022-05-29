//create mini express
const exp=require("express")
const productApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")

const mc=require("mongodb").MongoClient;



//add body parsing middleware
productApi.use(exp.json())

//connection string
const dbUrl = "mongodb://db-server:db-server@tejaswini-shard-00-00.l8fzf.mongodb.net:27017,tejaswini-shard-00-01.l8fzf.mongodb.net:27017,tejaswini-shard-00-02.l8fzf.mongodb.net:27017/demodb?ssl=true&replicaSet=atlas-rzvx3u-shard-0&authSource=admin&retryWrites=true&w=majority"
//connect to DB
let productCollectionObj;
mc.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true}, (err,client)=>{
    if(err){
      console.log('err in db server',err);
    }
    else {
        //get database object
        let databaseObj=client.db("demodb")
        //create usercollection object
        productCollectionObj=databaseObj.collection("productcollection")
        console.log('Connected to db server')
    }
})


//GET http://localhost:2000/products/getproducts
productApi.get("/getproducts",expressErrorHandler(async(req,res)=>{
    let productsList=await productCollectionObj.find().toArray()
    if(productsList.length===0)
    {
        res.send({message:"Products list is empty"})
    }
    else
    {
        res.send(productsList)
    }
}))

//GET http://localhost:2000/products/getproducts/2
productApi.get("/getproducts/:id",expressErrorHandler(async(req,res)=>{
    let pId=(+req.params.id)
    let proObj=await productCollectionObj.findOne({pid:pId})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        res.send(proObj)
    }
}))

//POST http://localhost:2000/products/createproduct 
productApi.post("/createproduct",expressErrorHandler(async(req,res,next)=>{
    let newProduct=req.body
    let proObj= await productCollectionObj.findOne({pid:newProduct.pid})
    if(proObj===null)
    {
        await productCollectionObj.insertOne(newProduct)
        res.send({message:"Product successfully created "})
    }
    else
    {
        res.send({message:"Product already exists"})
    }
}))

//PUT http://localhost:2000/products/updateproduct
productApi.put("/updateproduct",expressErrorHandler(async(req,res)=>{
    let updateProduct=req.body
    let proObj=await productCollectionObj.findOne({pid:updateProduct.pid})
    if(proObj===null)
    {
        res.send({message:"Product not found"})
    }
    else
    {
        await productCollectionObj.updateOne({pid:updateProduct.pid},{$set:{...updateProduct}})
        res.send({message:"Product updated successfully"})
    }
}))

//DELETE http://localhost:2000/products/deleteproducts/7
productApi.delete("/deleteproducts/:id",expressErrorHandler(async(req,res)=>{
    let pId=(+req.params.id)
    let proObj=await productCollectionObj.findOne({pid:pId})
    if(proObj===null)
    {
    res.send({message:"Product not found"})
    }
    else
    {
    await productCollectionObj.deleteOne({pid:pId})
    res.send({message:"Product deleted successfully"})
    }
    }))
    

//export
module.exports=productApi;