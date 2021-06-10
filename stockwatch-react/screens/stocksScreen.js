/*
    WATCHLIST AND SHOWING DETAILED INFO ON SELECTION OF STOCK IN WATCHLIST
*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { UserContext } from '../contexts/userContext';
import { useStocksContext } from '../contexts/stocksContext';


export default function StocksScreen( {navigation} ) 
{
  const {usr, setUsr} = useContext(UserContext);
  const { state, addToWatchlist } = useStocksContext();

  return (
    <View>
      <Text style={styles.textColor}> Username: {usr} </Text>
      <Text style={styles.textColor}> Entry: {state} </Text>
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
    textColor: {
        color: 'white'
    }
  });

  /*
  importData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return result.map(req => JSON.parse(req)).forEach(console.log);
  } catch (error) {
    console.error(error)
  }
}


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