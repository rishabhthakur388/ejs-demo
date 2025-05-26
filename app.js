    var express = require("express")
	mongoose = require("mongoose")
	passport = require("passport")
	bodyParser = require("body-parser");
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose")
	cookieParser = require("cookie-parser");
	const USERSIGNUP = require('./model/Users')
	const AddNotes = require("./model/UserData")
	const path = require('path');


	var app = express();
	app.use(cookieParser());



///////////////////////////////////////////// DB Conection /////////////////////////////////////////////////////////////////

const url =("mongodb://127.0.0.1:27017/Project");
mongoose.connect(url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then((ans) => console.log("db connected...")).catch((err) => console.log("db couldnot connected.....", err));


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//=====================================================================================
//                                      ROUTES
//=====================================================================================

// Showing home page
app.get("/", async function (req, res) {
	var val;
	try{
		val = res.cookies.username;
	}
	catch(e) {
		// console.log(e);
		// let val = res.cookie;
		val = false;
	}
	if(!val) {res.render("home");}
	else {async function getUser() {
		var obj = await AddNotes.find();
		return obj;
	}
	let ans = getUser();
	let promises = [];
	(await ans).forEach(v=>promises.push(v));
	res.render("secret", {data: promises});
}
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
	
});

app.get("/register", function (req, res) {
	res.render("register");
});
// app.get("/add", function (req, res) {
// 	res.render("secret");
// });


// app.get('/add', function (req, res) {
	
// 	   console.log( data );
// 	   res.end( data );
// 	});
//  })

// Showing register form
// Showing regi/addnotes

// Handling user signup
app.post("/register", async (req, res) => {
	try {
		        const findAcc = await USERSIGNUP.findOne({ email: req.body.email })
		        if (findAcc != null) {
		            return res.status(400).json({ msg: "user already exist ..." })
		        }
		        const payload = {
		            username: req.body.txt,      
		            email: req.body.email,
		            pass:req.body.pswd,		
		        };
		        // console.log(payload);
		        const create = await USERSIGNUP.create(payload)
		        return res.status(200).json()
		    } catch (error) {
		        return res.status(400).json({ msg: ".....error.....", error: error.message })
		    }
		}	
)

app.post("/add", async (req, res) => {
	try {

		        const NOTESpayload = {
					
		            email: req.body.email,    
					desc: req.body.desc,
					date: new Date()	 
		        };
		        // console.log(NOTESpayload);
				// console.log(req.body)
		        const create = await AddNotes.create(NOTESpayload)
				// async function getUser() {
				// 	var obj = await AddNotes.find();
				// 	return obj;
				// }
				// let ans = getUser();
				// let promises = [];
				// (await ans).forEach(v=>promises.push(v));
				// console.log(promises);
				// res.render("secret", {data: promises});	
				res.redirect('login');
		        // return res.status(200).json({ msg: ".....created....", data: create })
		    } catch (error) {
		        return res.status(400).json({ msg: ".....error.....", error: error.message })
		    }
		}
);

app.post("/delData", async function(req, res) {
	async function getUser() {
		var obj = await AddNotes.find();
		return obj;
	}
	let ans = getUser();
	let promises = [];
	(await ans).forEach(v=>promises.push(v));

	let key = Object.keys(req.body)[0];
	console.log(key);
	AddNotes.deleteOne({ _id: key }).then(function(){
		// res.render("secret", {data: promises});
		res.redirect('back');
	 }).catch(function(error){
		// console.log(error); // Failure
	 }); 

});

// Showing login form
app.get("/login", async function (req, res) {
	var val;
	try{
		val = res.cookies.username;
	}
	catch(e) {
		// console.log(e);
		// let val = res.cookie;
		val = false;
	}
	if(!val) {
		async function getUser() {
			var obj = await AddNotes.find();
			return obj;
		}
		let ans = getUser();
		let promises = [];
		(await ans).forEach(v=>promises.push(v));
		// console.log(promises);
		res.render("secret", {data: promises});
	}
	else {res.send("Login First");}
});

//Handling user login
app.post("/login", async function(req, res){
	try {
		const user = await USERSIGNUP.findOne({ username:req.body.name});
		// console.log(user)
		// console.log(req.body,"af")
		res.cookie("username", user);
		if (user) {
		const result = req.body.pswd;
		// console.log(result)
		// console.log(user)
		if (user.pass === result) {
			async function getUser() {
				var obj = await AddNotes.find();
				return obj;
			}
			let ans = getUser();
			let promises = [];
			(await ans).forEach(v=>promises.push(v));
			// console.log(promises);
			res.render("secret", {data: promises});
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });	
	}
});

// app.get("/getCookie", (req, res)=> {
// 	if(req.cookies.username) 
// 		console.log(req.cookies.username);
// })
//Handling user logout
app.get("/logout", function (req, res) {
	res.clearCookie('username');
	res.redirect('/');
	// console.log("Log out....");
	// res.send(200);
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("listning on port 3000");
});

// app.get("/user", (req,res)=>{
// 	try{
// 		async function users(){
// 			var dataFound = await AddNotes.find();
// 			res.json({
// 				dataFound
// 			});
// 		}
// 		let a = users();
// 		console.log(a)
// 	} catch (e){
// 		console.log(e)
// 	}
// })





























// "use strict"
// const saltRound = 10;
// require("dotenv").config()
// const express = require('express');
// const app = express();
// const port = 8080;
// require("./config/db")
// const userRouters = require('./routers/userRouter')

// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true }))

// app.use('/', userRouters)

// const jwt = require('jsonwebtoken');
    


// // app.use(express.json());



// app.get("/", (req, res) => {
//     res.send("home page...");
// });


// app.listen(port, ()=> {
//     console.log(`listening on port ${port}`);
// });
