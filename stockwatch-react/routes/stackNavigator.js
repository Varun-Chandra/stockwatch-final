import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {LoginScreen} from "../screens/LoginScreen";
import {SearchScreen} from '../screens/searchScreen';
import {StocksScreen} from '../screens/stocksScreen';
import {RegisterScreen} from "../screens/RegisterScreen";
import { UserContext } from '../contexts/userContext';

const { Screen } = createStackNavigator();



const Tab = createBottomTabNavigator();

export default function StackNavigator() {
    const username = useContext(UserContext);

    return (
        <NavigationContainer theme={DarkTheme}>
            <Screen name="Login" component={LoginScreen} />
            <Screen name="Register" component={RegisterScreen} /> 

            <UserContext.Provider value={username}> 
                <Screen name="Search" component={SearchScreen} />
                <Screen name="Stocks" component={StocksScreen} />
            </UserContext.Provider>
        </NavigationContainer>
    )
}

/*
    <NavigationContainer theme={DarkTheme}>
      <UserContext.Provider value="null">
        <Tab.Navigator>
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Stocks" component={StocksScreen} />
        </Tab.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
 */