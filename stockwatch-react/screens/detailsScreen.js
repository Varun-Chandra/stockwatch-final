import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Button} from 'react-native';

export default function DetailsScreen( {navigation} )
{
    

    return(
        <View>
            <Text style={styles.textHeader}>DetailsPage</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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