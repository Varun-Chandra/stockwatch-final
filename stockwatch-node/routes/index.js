var express = require('express');
var router = express.Router();
//const axios = require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//FOR WATCHLIST - GET WATCHLIST FOR CURRENT USER FROM DB
router.post('/fetchSymbols', function(req, res, next){
  //retrieve symbols from DB via knex
  
  const username = req.body.username

  req.db.from('watchList').where( 'username', `${username}`).select("symbol") 
  .then((rows) => {
    return res.json({"Error" : false, "Message" : "Success", "Symbol" : rows})
  })
  .catch((err) => {
      console.log(err);       
      res.json({"Error" : true, "Message" : "Error in MySQL query"}) 
  })
});


//FOR WATCHLIST - INSERT SYMBOL INTO WATCHLIST FOR CURRENT USER FROM DB
router.post('/fetchSymbols', function(req, res, next){
  
  const username = req.body.username;
  const symbol = req.body.symbol;

  const querySymbols = req.db.from('watchList').select("*").where("symbol", '=', symbol).andWhere("username", '=', username)

  querySymbols.then((symbols) => {
    if(symbols.length > 0)
    {
      console.log('This user has already stored this symbol')
      return;
    }

    return req.db.insert({symbol: `${symbol}`, username: `${username}`}).into('watchList');
  })
  .catch((err) => {
    console.log(err);
    res.json({"Error" : true, "Message" : "Error in MySQL query"});
  })

  return res.json({"Error" : false, "Message" : "Symbol Added to DB!"});
});


module.exports = router;

/*

//FOR SEARCH - HIT THIS URL TO GET ALL STOCKS LISTED ON NASDAQ
router.get('/stocks', function(req, res, next){
 
  const STOCK_ENDPOINT = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FMP_API_KEY}`;
  
  axios.get(STOCK_ENDPOINT)
  .then((response) => {
    const {data} = response;
    //console.log(data); //works...
    return res
    .status(200)
    .json(data); //works...
  })
  .catch((err) => res.json(err));  

});

//FOR STOCK HISTORY - HIT THIS URL TO GET HISTORY OF STOCK PERFORMANCE, SHOW CHANGEVALUES AND CHANGEPERCENTAGE
router.get('/stockHistory/:symbol', function(req, res, next){
  const {symbol} = req.params;
  const HISTORY_ENDPOINT = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${API_KEY}`

  axios.get(HISTORY_ENDPOINT)
  .then((response) => {
    const {data} = response;
    //console.log(data); //works...
    return res
    .status(200)
    .json(data); //check if it works
  })
  .catch((err) => res.json(err));
});

*/