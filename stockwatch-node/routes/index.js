var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//FOR WATCHLIST - GET WATCHLIST FOR CURRENT USER FROM DB
router.post('/fetchSymbols', function(req, res, next){
  //retrieve symbols from DB via knex
  
  const username = req.body.username

  req.db.from('watchList').where( 'username', `${username}`).select("symbol") 
  .then((rows) => {
    return res.json({"Error" : false, "Message" : "Success", "Symbols" : rows})
  })
  .catch((err) => {
      console.log(err);       
      res.json({"Error" : true, "Message" : "Error in MySQL query"}) 
  })
});


//FOR WATCHLIST - INSERT SYMBOL INTO WATCHLIST FOR CURRENT USER FROM DB
router.post('/insertSymbol', function(req, res, next){
  
  const username = req.body.username;
  const symbol = req.body.symbol;

  //Checking if symbol already exists in DB
  const querySymbols = req.db.from('watchList').select("*").where("symbol", '=', symbol).andWhere("username", '=', username)

  querySymbols.then((symbols) => {
    if(symbols.length > 0)
    {
      console.log('This user has already stored this symbol')
      return;
    }

    //no existing combination of username and symbol, so we insert into DB
    return req.db.insert({symbol: `${symbol}`, username: `${username}`}).into('watchList');
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error" : true, "Message" : "Error in MySQL query"});
  })

  return res.json({"Error" : false, "Message" : "Symbol Added to DB!"});
});

module.exports = router;