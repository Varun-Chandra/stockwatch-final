var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//USER REGISTRATION
router.post('/register', function(req, res, next){


  const email=req.body.email;
  const username=req.body.username;
  const password=req.body.password;

  //checking if user already exists in DB
  const queryUsers = req.db.from('users').select("*").where("email", '=', email)



  queryUsers.then((users) =>{
    
    if (users.length > 0) 
    {
      console.log("User already exists")

      //return res.json({"Error" : true, "Message" : "User already exists in DB!"});
      return;
      //return res.status(401).json({"Error": true, "Message": "Unauthorized - User already exists in DB!"});
      
    }
    //Encrypting password
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds);

 
    return req.db.insert({email: `${email}`, username: `${username}`, password: `${hash}`}).into('users');
  })
  .catch((err) => {
      console.log(err);       
      res.json({"Error" : true, "Message" : "Error in MySQL query"}) 
  })

  return res.json({"Error" : false, "Message" : "Added to DB!"});
});


//USER LOGIN
router.post('/fetchUser', function(req, res, next) {

  const username = req.body.username;
  const password = req.body.password;

  const queryUsers = req.db.from('users').where('username', '=' , `${username}`).select("username", "password") 


  queryUsers.then((rows) => {
    if(rows.length === 0)
    {
      //user doesnt exist
      return;
      //return res.json({"Error" : true, "Message" : "User not found", "users" : rows});  
    }
    
    const user=rows[0]

    return bcrypt.compare(password, user.password);

    //return res.json({"Error" : false, "Message" : "Success", "users" : rows});
  })
  .then((match) =>{
    if (!match)
    {
      console.log('Passwords dont match')
      return;
      //res.status(401).json({"Error": true, "Message": "Unauthorized - Passwords do not match"});
    }

    console.log('passwords match')
    return res.json({"Error" : false, "Message" : "Success"});
  })
  .catch((err) => {
      console.log(err);       
      res.json({"Error" : true, "Message" : "Error in MySQL query"}) 
  })  
});

module.exports = router;


/*

 */