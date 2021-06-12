/* STOCKS CONTEXT

Note: For storing watchlist, only the MySQL Database has been used. Asyncstorage could not be implemented. 

Therefore, symbol retrieving/adding to watchlist is entirely handled via post calls to back end Database....
*/

import React, { useState, useContext, useEffect } from "react";

import axios from 'axios';

import { Alert } from 'react-native';

import { UserContext } from '../contexts/userContext';


import { IP_ADDRESS } from "../getIP";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {

  //Main state that's exported from this component for use in other parts of the application
  const [state, setState] = useState();
  

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

//Main component export that provides state value to other parts of the app
export const useStocksContext = () => {
  //primary state value exported
  const [state, setState] = useContext(StocksContext);

  //fetching logged in username from context for use in setting json request body
  const {usr, setUsr} = useContext(UserContext);

  function addToWatchlist(newSymbol) {
    
    //Add symbol to DB using a JSON with request body containing username and symbol as argument
    const ADDITION_URL = `${IP_ADDRESS}:3001/insertSymbol`;
    const reqBody = {
      username: `${usr}`,
      symbol: `${newSymbol}`
    }

    //post call to submit symbol to DB
    axios.post(ADDITION_URL, reqBody)
    .then((res) =>{

      //if acquired response has error field set to true, there's a problem
      if (res.data.Error === true)
      {
          Alert.alert('Sorry!', 'Cannot Insert Symbol!');
      }
      else
      {
        console.log("added symbol to DB");
      }
      
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Error!','Cannot add Symbol to Watchlist!');
    })
    
  }

  //retrieving symbols from DB
  let retrieveSymbols = ()=> {

    //Creating a JSON with request body for post call
    const reqBody = {
      username: `${usr}`
    }

    //URL to fetch symbols from backend DB
    const RETRIEVAL_URL = `${IP_ADDRESS}:3001/fetchSymbols`;
    
    //Posting username to backend and checking for symbols
    axios.post(RETRIEVAL_URL, reqBody)
    .then((res) =>{
      
      let data = res.data.Symbols;

      const stateData = data.map((item) => {
        return {
          symbol: item.symbol
        }
      })

      //setting mapped json above into state
      setState(stateData);
      
    })
    .catch((err) => {
      console.log(err)
      Alert.alert('Error!','Unable to Fetch Symbols');
    })
  }

  useEffect(() => {
    retrieveSymbols();
  }, []);

 return { state, addToWatchlist };
};