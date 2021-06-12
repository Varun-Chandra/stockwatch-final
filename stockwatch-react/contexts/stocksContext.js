import React, { useState, useContext, useEffect } from "react";

import axios from 'axios';

import { Alert } from 'react-native';

import { UserContext } from '../contexts/userContext';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import { IP_ADDRESS } from "../getIP";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {

  //const [state, setState] = useState({ symbols: [] });
  const [state, setState] = useState();
  

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);

  const {usr, setUsr} = useContext(UserContext);

  

  // can put more code here

  function addToWatchlist(newSymbol) {
    
    // //Add symbol to DB giving username as argument
    const ADDITION_URL = `${IP_ADDRESS}:3001/insertSymbol`;
    const reqBody = {
      username: `${usr}`,
      symbol: `${newSymbol}`
    }
    axios.post(ADDITION_URL, reqBody)
    .then((res) =>{
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  let retrieveSymbols = ()=> {

      const reqBody = {
        username: `${usr}`
      }
      //`${IP_ADDRESS}:3001/users/fetchUser`

      const RETRIEVAL_URL = `${IP_ADDRESS}:3001/fetchSymbols`;
      //Retrieve from DB
      axios.post(RETRIEVAL_URL, reqBody)
      .then((res) =>{
        
        let data = res.data.Symbols;

        const stateData = data.map((item) => {
          return {
            symbol: item.symbol
          }
        })

        //setting symbols json into state
        setState(stateData);
        
        // console.log('Showing state after retrieve and set');
        // console.log(state);
      })
      .catch((err) => {console.log(err)})
  }

  

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    retrieveSymbols();
  }, []);

 return { state, addToWatchlist };
};


/*

OLD STOCKSCONTEXT

import React, { useState, useContext, useEffect } from "react";

import { Alert } from 'react-native';

import { UserContext } from '../contexts/userContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const StocksContext = React.createContext([{}]);

export const StocksProvider = ({ children }) => {

  //const [state, setState] = useState({ symbols: [] });
  const [state, setState] = useState([{}]);
  

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);

  const {usr, setUsr} = useContext(UserContext);

  //AsyncStorage.clear();

  // can put more code here

  async function addToWatchlist(newSymbol) {
    //CLEAR STORAGE AND TEST IF WORKS
    
    //state.filter((obj) => obj.quote.Title === quote.Title).length !== 0
    if(state.filter((sym) => sym === newSymbol ).length > 0)
    {
      //this symbol already exists
      Alert.alert('Sorry!', 'You have already added this stock to your watchlist!')
    }
    else
    {
      setState((arr) => [ ...arr, {symbol: newSymbol}]); //adding to array
      await AsyncStorage.setItem(`@${usr}`, JSON.stringify(state));
      Alert.alert('Done', 'Added to Watchlist (Async)');
      console.log(`Symbol added : - ${newSymbol}`);
    }
    
  }

  let retrieveSymbols = async ()=> {
      try {
          const getSymbols = await AsyncStorage.getItem(`@${usr}`);
          console.log('symbols retrieved - showing below');
          console.log(JSON.parse(getSymbols));

          const filteredSymbols = JSON.parse(
            getSymbols.filter((sym) => {
              return sym.symbol !== {};
            })
          );
          console.log('Acquired symbols')
          if (getSymbols !== null) //In case there was nothing inside storage to begin with
          {
            setState(filteredSymbols);
          }
      }
      catch(err)
      {
          console.log(err);
      }
  }



  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    retrieveSymbols();
  }, []);

 // return { ServerURL: 'http://131.181.190.87:3001', watchList: state,  addToWatchlist };
 return { state, addToWatchlist };
};
*/