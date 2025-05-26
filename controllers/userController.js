// Importing mongoose module
// const mongoose = require("mongoose")
// const bcrypt = require('bcrypt');
// const USERSIGNUP = require("../model/Users")
// const jwt = require('jsonwebtoken');
// const USERDATA = require("../model/UserData");

// exports.createUsers = async (req, res) => {
//     try {
//         const findAcc = await USERSIGNUP.findOne({ email: req.body.email })
//         if (findAcc != null) {
//             return res.status(400).json({ msg: "user already exist ..." })
//         }
//         // console.log("api hit", req.files.filename);


//         const payload = {
//             userName: req.body.userName,      
//             email: req.body.email,
//             password:req.body.password,

//         };
//         console.log(payload);
//         const create = await USERSIGNUP.create(payload)
//         return res.status(200).json({ msg: ".....created....", data: create })
//     } catch (error) {
//         return res.status(400).json({ msg: ".....error.....", error: error.message })
//     }
// }

















  
// // Calling Schema class
// const Schema = mongoose.Schema;
  
// // Creating Structure of the collection
// const collection_structure = new Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     marks: {
//         type: Number,
//         default: 0
//     }
// })
  
// // Creating collection
// const collections = mongoose.model(
//         "GFG2", collection_structure)
  
// // Inserting one document
// collections.create({
//     name: "aayush"
// }).then((ans) => {
//     console.log("Document inserted")
     
//     // Inserting invalid document
//     collections.create({
//         name: "saini",
//         marks: "#234",
//         phone: 981
//     }).then((ans) => {
//         console.log(ans)
//     }).catch((err) => {
          
//         // Printing the documents
//         collections.find().then((ans) => {
//                 console.log(ans)
//             })
          
//         // Printing the Error Message
//         console.log(err.message)
//     })
// }).catch((err) => {
  
//     // Printing Error Message
//     console.log(err.message)
// })




























// "use strict"
// const bcrypt = require('bcrypt');
// const USER = require("../schemas/user")
// const jwt = require('jsonwebtoken');

// exports.createUsers = async (req, res) => {
//     try {
//         const findAcc = await USER.findOne({ email: req.body.email })
//         if (findAcc != null) {
//             return res.status(400).json({ msg: "user already exist ..." })
//         }
//         // console.log("api hit", req.files.filename);
//         const hashPass = await bcrypt.hash(req.body.password, 10);

//         const payload = {
//             fname: req.body.fname,      
//             lname: req.body.lname,
//             mobile: req.body.mobile,
//             email: req.body.email,
//             password: hashPass,
//             image: req.files[0].filename
//         };
//         console.log(payload);
//         const create = await USER.create(payload)
//         return res.status(200).json({ msg: ".....created....", data: create })
//     } catch (error) {
//         return res.status(400).json({ msg: ".....error.....", error: error.message })
//     }
// }

// exports.getUsers = async (req, res) => {
//     try {
//         const userFind = await USER.findOne({ email: req.query.email });
//         if (userFind == null) {
//             return res.status(201).json({ msg: "user NOt found..." })
//         }
//         const comparePass = await bcrypt.compare(req.query.password, userFind.password);

//         if (comparePass == false) {
//             return res.status(201).json({ msg: "wrong password..." })
//         }

//         const token = jwt.sign(userFind.id, "123456")
//         return res.status(200).json({ msg: "user login success ...", token: token })
//     } catch (error) {
//         return res.status(400).json({ msg: ".....error.....", error: error.message })
//     }
// }


// exports.getuserByToken = async (req, res) => {
//     try {
//         const findUser = await USER.findById({ _id: req.currentUser.id })
//         res.status(200).json({ msg: "success...", data: findUser });
//     } catch (error) {
//         console.log(error.message)
//     }
// }