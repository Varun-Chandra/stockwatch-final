/*
    LOGIN
*/
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { UserContext } from '../contexts/userContext';

export default function RegisterScreen( { navigation } ) 
{
    //const username = useContext(UserContext);
    return (
        <Text style={styles.textColor}> Register Screen</Text>
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