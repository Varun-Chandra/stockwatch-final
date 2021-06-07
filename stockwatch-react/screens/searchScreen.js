/*
MAIN STOCKS VIEWING AND SEARCHING
*/
import React, {useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function SearchScreen()
{
    const [stocks, setStocks] = useState([
        { symbol: 'AAPL'},
        { symbol: 'ZM'},
        { symbol: 'MRNA'},
        { symbol: 'DOCU'},
        { symbol: 'GME'}
      ]);
    
    return (
        <FlatList
            keyExtractor= {(item) => stocks.indexOf(item).toString()}
            data={stocks}
            renderItem={( { item }) => (
                <Text style={styles.item} >{item.symbol}</Text>
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