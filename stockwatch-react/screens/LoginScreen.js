/*
    LOGIN
*/
import axios from 'axios';
import React, { useState, useContext } from 'react';

import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import { UserContext } from '../contexts/userContext';

import {IP_ADDRESS} from '../getIP';

//const IP_ADDRESS = `http://172.30.71.180`;

export default function LoginScreen( { navigation } ) 
{
    const {usr, setUsr} = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');    

    return (
        <View>
            <Text style={styles.textHeader}> StockWatch Mobile</Text>
            <Text style={styles.subHeaderText}> Welcome! Please enter your credentials!</Text>

            {/* Username and Password FieldInputs */}
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
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            {/* Login and Register Button/Touchable Opacity */}
            <Button
            style={styles.button}
            title="Login"
            disabled={(!password) || (!username)}
            onPress={ async () => {

                console.log(`Username - ${username}`)
                console.log(`Password - ${password}`)

                const data = {
                    'username': `${username}`,
                    'password': `${password}`
                }

                const LOGIN_CHECK = `${IP_ADDRESS}:3001/users/fetchUser`


                //Authenticate User here
                await axios.post(LOGIN_CHECK, data)
                .then((res) => {
                    if (res.data.Error === true)
                    {
                        console.log("User does not exist");
                        Alert.alert('Sorry!', 'User does not exist!');
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

            <View>
                <Text style={styles.subHeaderText}> Don't have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                    <View style={styles.regBtn}>
                        <Text style={styles.textBtn}> Tap here to Register!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20
    },
    textInput: {
        color: 'white',
        paddingLeft: 10,
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 20
    },
    button: {
        marginBottom: 10,
        padding: 10,
        paddingTop: 30
    },
    textBtn: {
        color: 'white',
        borderColor: 'white',
        fontSize: 15,
        borderWidth: 2,
        alignContent: 'center',
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
    regBtn: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
  });