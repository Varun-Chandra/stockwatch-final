/*
    LOGIN
*/
import axios from 'axios';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { UserContext } from '../contexts/userContext';
import {HOST_URL} from '../getHostname';




export default function LoginScreen( { navigation } ) 
{
    //const username = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
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
        onPress={() => {

            const data = {
                'username': `${username}`,
                'password': `${password}`
            }

            //Authenticate User here
            axios.post(`${HOST_URL}/users/fetchUser`, data)
            .then((res) => {
                //console.log(res.data.Error);

                if (res.data.Error === true)
                {
                    console.log("User does not exist");
                }
                else
                {
                    console.log("User Exists");
                    navigation.navigate("App");
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