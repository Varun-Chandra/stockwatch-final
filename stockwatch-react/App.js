//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import TabBarIcon from './tabBarIcon';

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import SearchScreen from './screens/searchScreen';
import StocksScreen from './screens/stocksScreen';
import DetailsScreen from './screens/detailsScreen';

import { UserContext } from './contexts/userContext';
import { StocksProvider } from './contexts/stocksContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function MainApp(){
  
  return (
    
      <Tab.Navigator>
        <Tab.Screen 
          name="Search" 
          component={SearchScreen}
          options={{
            title: 'Search',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />
          }}
        />
        <Tab.Screen 
          name="Stocks" 
          component={StocksScreen} 
          options={{
            title: 'Stocks',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-trending-up" />,
          }}
        />
      </Tab.Navigator>
    
  )
}

export default function App() 
{
  //authenticate value to send username into usercontext
  //const [userToken, setUserToken] = useState(null);
  const [usr, setUsr] = useState('');

  return (
      <NavigationContainer theme={DarkTheme}>
        <UserContext.Provider value={{usr, setUsr}}>
          <StocksProvider>
            <Stack.Navigator>
              
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="App" component={MainApp} />
              <Stack.Screen name="Details" component={DetailsScreen} />
            
            </Stack.Navigator>
          </StocksProvider>
        </UserContext.Provider>
      </NavigationContainer>
    
  );
}
