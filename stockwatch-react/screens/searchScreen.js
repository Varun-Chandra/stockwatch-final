/*
MAIN STOCKS VIEWING AND SEARCHING
*/
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function SearchScreen()
{
    const [stocks, setStocks] = useState([]);
    
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
            setStocks(symbols);
          })
      }, [])
    
    //console.log(stocks);
    return (
        <FlatList
            keyExtractor= {(item) => stocks.indexOf(item).toString()}
            data={stocks}
            renderItem={( { item }) => (
                <Text style={styles.item} >{item}</Text>
            )}
        />
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
 */