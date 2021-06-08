/*
MAIN STOCKS VIEWING AND SEARCHING
*/
import React, {useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StocksScreen} from './stocksScreen';
import { UserContext } from '../contexts/userContext';
import axios from 'axios';


const Tab = createBottomTabNavigator();

export default function SearchScreen( { navigation } )
{
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]); //useState for search function
  const [search, setSearch] = useState('');

  //Hook to fetch stocks data from backend
  useEffect(() => {
    //Hitting backend stocks API
    axios
      .get('http://localhost:3001/stocks')
      .then(res => {
        let data = res.data //has the json response itself

        let symbols = data.map((item) => {  //mapping json data to an array
          return item.symbol
        })
        //console.log(symbols);
        setStocks(symbols); //Main stock list
        setFilteredStocks(symbols);//For search purposes
      })
  }, [])

  const filterStock = (text) => {
    if(text)
    {
      const updatedList = stocks.filter((item) => {
        const itemData = item.toString() ? item.toString().toUpperCase() : ''.toUpperCase();
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

  //console.log(stocks);
  return (
    <View>
      <TextInput 
        styles={styles.textInput}
        value={search}
        placeholder="type something!"
        onChangeText={(text) => filterStock(text)}
      />
      
      <FlatList
          keyExtractor= {(item) => stocks.indexOf(item).toString()}
          data={filteredStocks}
          renderItem={( { item }) => (
            <>
            <Text style={styles.item} >{item}</Text>
            </>
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
      marginTop: 24,
      padding: 30,
      backgroundColor: 'lightblue',
      fontSize: 16,
    },
    textInput: {
      marginTop: 10,
      height: 40,
      borderWidth: 1,
      padding: 20,
      margin: 5,
      borderColor: '#000',
      backgroundColor: 'grey'
    }
});

/*
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