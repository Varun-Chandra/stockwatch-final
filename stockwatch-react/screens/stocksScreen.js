/*
    WATCHLIST AND SHOWING DETAILED INFO ON SELECTION OF STOCK IN WATCHLIST
*/
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, FlatList, Button, TouchableOpacity} from 'react-native';

//contexts
import { UserContext } from '../contexts/userContext';
import { useStocksContext } from '../contexts/stocksContext';

//api key
import { FMP_API_KEY } from '../api_key';


export default function StocksScreen( {navigation} ) 
{
  const {usr, setUsr} = useContext(UserContext);

  const { state, addToWatchlist } = useStocksContext();
  
  const [entries, setEntries] = useState([]);

  // //hitting the FMP quote API endpoint to populate flatlist with symbol, changesPercentage and price for each stock on watchlist
  useEffect(() => {   

    state.filter((stateSym) => {     
      
      axios.get(`https://financialmodelingprep.com/api/v3/quote/${stateSym.symbol}?apikey=${FMP_API_KEY}`)
      .then((res) => {
        const syms = res.data

        //declaring an array to help populate the flatlist later
        let objArr = [];

        //pushing each entry in json into array and setting state after 
        syms.map((item) => {
          let objects = {
            symbol: stateSym.symbol,
            changes: item.changesPercentage,
            price: item.price
          }

          objArr.push(objects);
        })
        setEntries((oldArr) => [...oldArr, ...objArr]);
      })
      .catch((err) => console.log(err));
    })
  }, [])
  
  

  return (
    <ScrollView>

      {/* Leading text before showing flatlist */}
      <Text style={styles.textHeader}> Hello {`${usr}`}! </Text>
      <Text style={styles.bodyText}>Here is your watchlist! Select any stock from this list to view its performance!</Text>
      <Text style={styles.smallText}>Data shown here is in the following form:</Text>
      <Text style={styles.smallText}> {`<Stock> - (<Current Price>) - (<Change in value from prev. day>)`} </Text>
      
      {/* Showing final flatlist */}
      <FlatList
          data={entries}
          renderItem={( { item }) => (
            //Creating touchable opacity to add item to watchlist on click
            <>
              <TouchableOpacity onPress = {() => {
                navigation.navigate('Details', {symbol: item.symbol});  
              }}
              > 
                <Text style={styles.item}>
                  {item.symbol} - (Price {`->`} {item.price}) - (Change {`->`} {item.changes})
                </Text>

              </TouchableOpacity>
            </>
          )}
      />
      
    </ScrollView>
  );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 40,
      paddingHorizontal: 20
    },
    textHeader: {
      color: 'white',
      fontSize: 30
    },
    bodyText: {
      color: 'white',
      fontSize: 18
    },
    smallText: {
      color: 'white',
      fontSize: 14,
      paddingTop: 20
    },
    item: {
      flex: 1,
      marginTop: 24,
      padding: 30,
      backgroundColor: 'lightblue',
      fontSize: 16,
    },
  });