//create mini express
const exp= require("express")
const userApi=exp.Router();
//const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
//import jsonwebtoken to create token
const jwt = require("jsonwebtoken");
//.env file
require("dotenv").config();


//add body parsing middleware
userApi.use(exp.json())


//http://localhost:2000/user-api/createuser
userApi.post("/createuser", expressAsyncHandler(async (req, res) => {

    //get user obj
    let newUser = req.body;
    console.log(newUser)

    let userCollectionObject=req.app.get("usercollectionobj");
    let userOfDb = await userCollectionObject.findOne({username:newUser.username});
    
    if(userOfDb!==null){
        res.send({message:"Username already exists, Please create another!"})
    }
    else {
        let hashedPassword=await bcryptjs.hash(newUser.password,4);
        newUser.password=hashedPassword;
        await userCollectionObject.insertOne(newUser);
        res.send({message:"New User Reacted"});
    }



}));


//http://localhost:3000/user/updateuser/<username>
userApi.put("/updateuser/:username", (req, res, next) => {

    //get modified user
    let modifiedUser = req.body;

    //update
    userCollectionObj.updateOne({ username: modifiedUser.username }, {
        $set: { ...modifiedUser }//copies the data from modified user to the actual userobject
    }, (err, success) => {

        if (err) {
            console.log("err in reading users data", err)
            res.send({ message: err.message })
        }
        else {
            res.send({ message: "User updated" })
        }
    })

})


//export
module.exports=userApi;