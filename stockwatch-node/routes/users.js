var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//USER REGISTRATION
router.post('/register', function(req, res, next){
  //let temp = JSON.stringify(req.params);

  //temp = JSON.parse(temp);

  //const email = temp['email']
  //const username = temp['username']
  //const password = temp['password'] //ENCRYPT THIS TO COMPARE

  const email=req.body.email;
  const username=req.body.username;
  const password=req.body.password;

  //checking if user already exists in DB
  const queryUsers = req.db.from('users').select("*").where("email", '=', email)
  queryUsers.then((users) =>{
    
    if (users.length > 0) 
    {
      console.log("User already exists")
      return res.json({"Error" : true, "Message" : "User already exists in DB!"});
    }
    //Encrypting password
    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds);
    return req.db.insert({email: `${email}`, username: `${username}`, password: `${hash}`}).into('users');
  })

  return res.json({"Error" : false, "Message" : "User added to DB!"});
});


//USER LOGIN
router.get('/fetchUser/:username/:password', function(req, res, next) {
  
  let temp = JSON.stringify(req.params);

  temp = JSON.parse(temp);

  const username = temp['username']
  const password = temp['password'] //ENCRYPT THIS TO COMPARE

  //console.log(`username: ${username}`);
  //console.log(`password: ${password}`);



  req.db.from('users').where('username', '=' , `${username}`).andWhere('password', '=', `${password}`).select("username", "password") 
  .then((rows) => {
    if(rows.length === 0)
    {
      return res.json({"Error" : true, "Message" : "User not found", "users" : rows});  
    }
    else
    {
      return res.json({"Error" : false, "Message" : "Success", "users" : rows});
    }
  })
  .catch((err) => {
      console.log(err);       
      res.json({"Error" : true, "Message" : "Error in MySQL query"}) 
  })  
});

module.exports = router;


/*

 */