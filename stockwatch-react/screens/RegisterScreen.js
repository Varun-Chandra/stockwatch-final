/*
    LOGIN
*/
import axios from 'axios';

import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';
import { UserContext } from '../contexts/userContext';
import {IP_ADDRESS} from '../getIP';



export default function RegisterScreen( { navigation } ) 
{
    //const username = useContext(UserContext);

    //const IP_ADDRESS = `http://172.30.71.180`;

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <Text style={styles.textColor}> Register Screen</Text>
            
            <Text style={styles.textColor}> Email</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Enter Email..'
                onChangeText = {text => setEmail(text)}
            />
            
            <Text style={styles.textColor}> Username</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Enter Username..'
                onChangeText = {text => setUsername(text)}
            />

            <Text style={styles.textColor}> Password</Text>

            <TextInput 
                style={styles.textInput}
                placeholder='Enter Password..'
                onChangeText = {text => setPassword(text)}
            />

            <Button
                style={styles.button}
                title="Proceed to App"
                onPress={() => {

                    const data = {
                        'email': `${email}`,
                        'username': `${username}`,
                        'password': `${password}` 
                    }

                    //const REGISTER_URL = `${HOST_URL}/users/register`;
                    const REGISTER_URL = `${IP_ADDRESS}/users/fetchUser`;

                    //Store User in DB here
                    axios.post(REGISTER_URL, data)
                    .then((res) => {
                        //console.log(res.data.Error);

                        if (res.data.Error === true)
                        {
                            Alert.alert('Sorry!', 'This user has already  been registered!')
                            //console.log("User already exists");
                        }
                        else
                        {
                            //console.log("User Entered in DB");
                            Alert.alert('Success', 'Taking you back to Login')
                            navigation.navigate("Login");
                        }
                        //const {data} = res.data;
                        //console.log(JSON.stringify(data));
                        //if the "error" value in datajson is false, user exists, and can be taken to app
                    })
                    //if successful
                    
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
        marginBottom: 4
    }
  });