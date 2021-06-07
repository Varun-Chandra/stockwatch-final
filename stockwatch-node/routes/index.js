var express = require('express');
var router = express.Router();
const axios = require("axios");

const FMP_API_KEY = "6c536f3a6e0d668103fad100eeef94a1";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
  //const HISTORY_ENDPOINT = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${API_KEY}`

  // axios.get(HISTORY_ENDPOINT)
  // .then((response) => {
  //   const {data} = response;
  //   //console.log(data); //works...
  //   return res
  //   .status(200)
  //   .json(data); //check if it works
  // })
  // .catch((err) => res.json(err));



});

//FOR WATCHLIST - GET WATCHLIST FOR CURRENT USER FROM DB
router.get('/watchList/:username', function(req, res, next){
  //retrieve symbols from DB via knex
  //return array of symbols
  
  const { username } = req.params

  req.db.from('watchList').where( 'username', `${username}`).select("symbol") 
  .then((rows) => {
    return res.json({"Error" : false, "Message" : "Success", "Symbol" : rows})
  })
  .catch((err) => {
      console.log(err);       
      res.json({"Error" : true, "Message" : "Error in MySQL query"}) 
  })
});


module.exports = router;
