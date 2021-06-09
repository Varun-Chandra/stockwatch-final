/*
    LOGIN
*/
import axios from 'axios';

import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';
import { UserContext } from '../contexts/userContext';
import {HOST_URL} from '../getHostname';



export default function RegisterScreen( { navigation } ) 
{
    //const username = useContext(UserContext);
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
                    //Store User in DB here
                    axios.post(`${HOST_URL}/users/register`, data)
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