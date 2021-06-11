/*
    LOGIN
*/
import axios from 'axios';
import React, { useState, useContext } from 'react';

import { Button, StyleSheet, Text, TextInput, View} from 'react-native';

import { UserContext } from '../contexts/userContext';

import {IP_ADDRESS} from '../getIP';

//const IP_ADDRESS = `http://172.30.71.180`;

export default function LoginScreen( { navigation } ) 
{
    const {usr, setUsr} = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //FETCHING PUBLIC IP FOR HITTING BACKEND API
    

    return (
        <View style={styles.container}>
        <Text style={styles.textColor}> Login Screen</Text>
        <Text style={styles.textColor}> Username</Text>
        <TextInput 
            style={styles.textInput}
            placeholder='Enter Username..'
            onChangeText = {text => setUsername(text)}
        />

        <Text style={styles.textColor}> Password</Text>

        <TextInput 
            style={styles.textInput}
            placeholder='Enter Username..'
            onChangeText = {text => setPassword(text)}
        />

        <Button
        style={styles.button} 
        title="Register"
        onPress={() => {navigation.navigate("Register")}} />

        <Button
        style={styles.button}
        title="Proceed to App"
        onPress={ async () => {

            console.log(`Username - ${username}`)
            console.log(`Password - ${password}`)

            const data = {
                'username': `${username}`,
                'password': `${password}`
            }

            //const LOGIN_CHECK = `${HOST_URL}/users/fetchUser`
            const LOGIN_CHECK = `${IP_ADDRESS}:3001/users/fetchUser`


            //Authenticate User here
            await axios.post(LOGIN_CHECK, data)
            .then((res) => {
                //console.log(res.data.Error);

                if (res.data.Error === true)
                {
                    console.log("User does not exist");
                }
                else
                {
                    setUsr(username);//For context

                    console.log("User Exists");
                    navigation.navigate("App");
                }
            })
            .catch((err) => console.log(err))
            
        }} 
        />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20
    },
    textColor: {
        color: 'white'
    },
    textInput: {
        color: 'white',
        paddingLeft: 5,
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 4
    },
    button: {
        marginBottom: 10,
        padding: 10,
        marginTop: 10
    }
  });