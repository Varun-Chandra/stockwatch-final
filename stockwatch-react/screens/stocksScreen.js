/*
    WATCHLIST AND SHOWING DETAILED INFO ON SELECTION OF STOCK IN WATCHLIST
*/
import React, { useContext } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { UserContext } from '../contexts/userContext';


const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
  
      return result.map(req => JSON.parse(req)).forEach(console.log);
    } catch (error) {
      console.error(error)
    }
}

console.log(importData);


export default function StocksScreen( {navigation} ) 
{
    const username = useContext(UserContext);
    return (
        <Text style={styles.textColor}> Something</Text>
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
  */