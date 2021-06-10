import React, { useState, useContext, useEffect } from "react";

import { Alert } from 'react-native';

import { UserContext } from '../contexts/userContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const StocksContext = React.createContext(['']);

export const StocksProvider = ({ children }) => {

  //const [state, setState] = useState({ symbols: [] });
  const [state, setState] = useState([]);
  

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
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    
    console.log(typeof(setState));
    setState((s)=>{
        s.push(newSymbol);
        return s
    });

    await AsyncStorage.setItem(`@${usr}`, JSON.stringify(state))

    Alert.alert('Done', 'Added to Watchlist (Async)');

    console.log(`Symbol added - ${newSymbol}`);
  }

  let retrieveSymbols = async ()=> {
      try {
          const value = await AsyncStorage.getItem(`@${usr}`);
          console.log('order retrieved - showing value below');
          console.log(value);
          if (value !== null && value[0] !== "")
          {
              //setState(JSON.parse(value));
              setState(JSON.parse(value));
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
