/*
    WATCHLIST AND SHOWING DETAILED INFO ON SELECTION OF STOCK IN WATCHLIST
*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, FlatList, Button, TouchableOpacity} from 'react-native';
import { UserContext } from '../contexts/userContext';
import { useStocksContext } from '../contexts/stocksContext';
import { FMP_API_KEY } from '../api_key';


export default function StocksScreen( {navigation} ) 
{
  const {usr, setUsr} = useContext(UserContext);

  const { state, addToWatchlist } = useStocksContext();
  
  const [entries, setEntries] = useState([]);
  

  

  // //hitting the FMP quote API endpoint to populate flatlist with symbol, changesPercentage and price for each stock on watchlist
  useEffect(() => {   

    // state.filter((stateSym) => {     
      
    //   axios.get(`https://financialmodelingprep.com/api/v3/quote/${stateSym.symbol}?apikey=${FMP_API_KEY}`)
    //   .then((res) => {
    //     const syms = res.data
    //     let objArr = [];
    //     syms.map((item) => {
    //       let objects = {
    //         symbol: stateSym.symbol,
    //         changes: item.changesPercentage,
    //         price: item.price
    //       }

    //       objArr.push(objects);
    //     })
    //     setEntries((oldArr) => [...oldArr, ...objArr]);
        
        
    //   })
    //   .catch((err) => console.log(err));
    // })
    const mockData = [{
      symbol: 'Sym1',
      changes: 'changePercValue1',
      price: 'Price1'
    }, {
      symbol: 'Sym2',
      changes: 'changePercValue2',
      price: 'Price2'
    }, {
      symbol: 'Sym3',
      changes: 'changePercValue3',
      price: 'Price3'
    }]
  
    setEntries(mockData);

    //console.log(entries);
  }, [])
  
  

  return (
    <ScrollView>
      <Text style={styles.textHeader}> Hello {`${usr}`}! </Text>
      <Text style={styles.bodyText}>Here is your watchlist! Select any stock from this list to view its performance!</Text>
      {/* {DXCM} - {0.3} - {400.19} */}
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
                  {item.symbol} - ({item.changes}) - ({item.price}) 
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
    item: {
      flex: 1,
      marginTop: 24,
      padding: 30,
      backgroundColor: 'lightblue',
      fontSize: 16,
    },
  });

  /*
  useEffect(() => {
    const stocksArr = [];

    for (let i=0; i< state.length; i++)
    {
      axios.get(`https://financialmodelingprep.com/api/v3/quote/${state[i].symbol}?apikey=${FMP_API_KEY}`)
      .then((res) => {
        const syms = res.data
        
        let symbols = syms.map(item => {  //mapping json data to an array
          return {
            symbol: item.symbol,
          changesPercentage: item.changesPercentage,
          price: item.price
          }
        })
        setEntries(symbols);
      })
      .catch((err) => console.log(err));

    }



    for (let i=0; i< stocksArr.length; i++)
    {
      console.log(JSON.stringify(stocksArr[i]));
    }
    //console.log(allStocks);
    //setEntries(allStocks);
  }, [])


OLD FLATLIST
<FlatList
        keyExtractor={(item) => item.symbol}
        data={state}
        renderItem={( { item }) => (
          
          <View>
            <Text style={styles.textColor}>
              {item}
            </Text>
          </View>
        )}
      />
<FlatList
        data={state}
        renderItem={( { item }) => (
          
          <View>
            <Text style={styles.textColor}>
              {item}
            </Text>
          </View>
        )}
      />
  */