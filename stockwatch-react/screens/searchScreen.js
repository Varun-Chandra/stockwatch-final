/*
MAIN STOCKS VIEWING AND SEARCHING
*/
import React, {useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserContext } from '../contexts/userContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';


const FMP_API_KEY = "6c536f3a6e0d668103fad100eeef94a1";

export default function SearchScreen( { navigation } )
{
  const [stocks, setStocks] = useState([{}]);
  const [filteredStocks, setFilteredStocks] = useState([{}]); //useState for search function
  const [search, setSearch] = useState('');

  const {usr, setUsr} = useContext(UserContext);

  const STOCK_ENDPOINT = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FMP_API_KEY}`;

  // AsyncStorage.clear();
  // console.log('storage cleared');

  //Hook to fetch stocks data from backend
  useEffect(() => {
    //Hitting backend stocks API

    //.get('http://localhost:3001/stocks')

    axios
      .get(STOCK_ENDPOINT)
      .then(res => {
        let data = res.data //has the json response itself

        let symbols = data.map(item => {  //mapping json data to an array
          return {
            counter: data.indexOf(item),
            symbol: item.symbol,
            name: item.name
          }
        })
        //console.log(symbols);
        setStocks(symbols); //Main stock list
        setFilteredStocks(symbols);//For search purposes
      })
  }, [])

  


  //Function to help search stocks in flatlist
  const filterStock = (text) => {
    if(text)
    {
      const updatedList = stocks.filter((item) => {
        const itemData = item.symbol.toString() ? item.symbol.toString().toUpperCase() : ''.toUpperCase();
        const searchTextData = text.toUpperCase();
        return itemData.indexOf(searchTextData) > -1;
      });
      setFilteredStocks(updatedList);
      setSearch(text);
    }
    else
    {
      setFilteredStocks(stocks);
      setSearch(text);
    }
  }

  // keyExtractor= {(item) => item.counter.toString()}
  return (
    <View>
      <TextInput 
        style={styles.textInput}
        value={search}
        placeholder="type something!"
        onChangeText={(text) => filterStock(text)}
      />
      
      <FlatList
          data={filteredStocks}
          renderItem={( { item }) => (
            //Creating touchable opacity to add item to watchlist on click
            <TouchableOpacity onPress={ async () => 
              {
                console.log(`Selected ${item.symbol}`);
                
              }}
            >
            
            <>
              <Text style={styles.item}>
                {item.symbol} - {item.name}
              </Text>
            </>
            </TouchableOpacity>
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 40,
      paddingHorizontal: 20
    },
    item: {
      flex: 1,
      marginTop: 24,
      padding: 30,
      backgroundColor: 'lightblue',
      fontSize: 16,
    },
    textInput: {
      color: 'white',
      paddingLeft: 5,
      borderColor: 'grey',
      borderWidth: 2,
      marginBottom: 4
  },
});

/*
OLD ASYNCSTORAGE CODE
    //store in asyncstorage with key @username-symbol
    if ( await AsyncStorage.getItem(`@${usr}-${item.symbol}`))
    {
      //item already exists
      Alert.alert('Sorry', 'This item has already been added to your watchlist') 
    }
    else
    {
      //add item to asyncstorage
      await AsyncStorage.setItem(`@${usr}-${item.symbol}`, `${item.symbol}`);
      Alert.alert('Added to Watchlist', 'This item has been added to your watchlist')
    }





const [stocks, setStocks] = useState([
        { symbol: 'AAPL'},
        { symbol: 'ZM'},
        { symbol: 'MRNA'},
        { symbol: 'DOCU'},
        { symbol: 'GME'}
      ]);



function onSelectHander(symbol) {
    return (
      <Tab.Navigator>
      <Tab.Screen name="Stocks" component={StocksScreen} initialParams={symbol}/>
      </Tab.Navigator>
    )
  }
 */