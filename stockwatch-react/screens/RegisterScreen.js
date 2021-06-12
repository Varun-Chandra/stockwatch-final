/*
    LOGIN
*/
import axios from 'axios';

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';
import {IP_ADDRESS} from '../getIP';

export default function RegisterScreen( { navigation } ) 
{
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <Text style={styles.textHeader}> Hello, almost-a-User!</Text>
            <Text style={styles.subHeaderText}> Register your credentials below!</Text>
            
            <Text style={styles.subHeaderText}> Email</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Enter Email..'
                onChangeText = {text => setEmail(text)}
            />
            
            <Text style={styles.subHeaderText}> Username</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Enter Username..'
                onChangeText = {text => setUsername(text)}
            />

            <Text style={styles.subHeaderText}> Password</Text>

            <TextInput 
                style={styles.textInput}
                placeholder='Enter Password..'
                secureTextEntry={true}
                onChangeText = {text => setPassword(text)}
            />

            <Button
                style={styles.button}
                title="Register Me!"
                disabled={(!password) || (!username) || (!email)}
                onPress={() => {

                    //Creating object for json request body
                    const data = {
                        'email': `${email}`,
                        'username': `${username}`,
                        'password': `${password}` 
                    }

                    //Below is the backend URL for registering a new user in DB
                    const REGISTER_URL = `${IP_ADDRESS}:3001/users/register`;

                    //Storing User in DB via post call
                    axios.post(REGISTER_URL, data)
                    .then((res) => {

                        if (res.data.Error === true)
                        {
                            Alert.alert('Sorry!', 'This user has already  been registered!');
                        }
                        else
                        {
                            Alert.alert('Success', 'Taking you back to Login')
                            navigation.navigate("Login");
                        }
                    }).catch((err) => console.log(err));                   
                }} 
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
    textInput: {
        color: 'white',
        paddingLeft: 5,
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 30
    },
    button: {
        marginBottom: 4
    },
    textHeader: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 20,
        textDecorationLine: 'underline'
    },
    subHeaderText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
        paddingTop: 10,
    },
  });