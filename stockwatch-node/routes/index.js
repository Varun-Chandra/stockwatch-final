var express = require('express');
var router = express.Router();
const axios = require("axios");

const FMP_API_KEY = "6c536f3a6e0d668103fad100eeef94a1";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stocks', function(req, res, next){
 
  // const STOCK_ENDPOINT = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FMP_API_KEY}`;
  
  // axios.get(STOCK_ENDPOINT)
  // .then((response) => {
  //   const {data} = response;
  //   //console.log(data); //works...
  // });
  

});

module.exports = router;
