/*
MAIN STOCKS VIEWING AND SEARCHING
*/
import React, {useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../contexts/userContext';
import { useStocksContext } from '../contexts/stocksContext';

import { FMP_API_KEY } from '../api_key';

import axios from 'axios';

export default function SearchScreen( { navigation } )
{
  const [stocks, setStocks] = useState([{}]);
  const [filteredStocks, setFilteredStocks] = useState([{}]); //useState for search function
  const [search, setSearch] = useState('');

  //const[sym, setSym] = useState('');

  const {usr, setUsr} = useContext(UserContext);

  const { addToWatchlist } = useStocksContext();

  //const symbolObject = { symbol: sym }; //Object to send for storing

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
      const updatedList = stocks.filter((item) => 
      {
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
    <ScrollView style={styles.container}>
      <Text style={styles.textHeader}> 
        Pick a Stock! 
      </Text>
              
      <Text style={styles.bodyText}>
        Select a stock from any of the NASDAQ stocks shown below. Use the search function to lookup specific stock symbols and pick one you like!
      </Text>

      <Text style={styles.searchText}>
        Search
      </Text>
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
            <TouchableOpacity onPress={ () => 
              {
                console.log(`Selected ${item.symbol}`);
                
                addToWatchlist(item.symbol);//add to DB
                navigation.navigate('Stocks');
              }}
            > 
            <View>
              <Text style={styles.item}>
                {item.symbol} - {item.name}
              </Text>
            </View>
            </TouchableOpacity>
          )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    textHeader: {
      color: 'white',
      fontSize: 30
    },
    bodyText: {
      color: 'white',
      fontSize: 18,
      marginBottom: 10
    },
    searchText: {
      color: 'white',
      fontSize: 18,
      marginTop: 10
    },
    textInput: {
      color: 'white',
      marginTop: 10,
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