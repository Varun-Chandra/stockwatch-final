/*
    LOGIN
*/
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View} from 'react-native';
import { UserContext } from '../contexts/userContext';

export default function LoginScreen( { navigation } ) 
{
    const username = useContext(UserContext);
    return (
        <View>
        <Text style={styles.textColor}> Login Screen</Text>
        <Button 
        title="Register"
        onPress={() => {navigation.navigate("Register")}} />

        <Button 
        title="Proceed to App"
        onPress={() => {navigation.navigate("App")}} />

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