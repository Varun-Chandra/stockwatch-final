// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import SearchScreen from '../screens/searchScreen';
// import StockScreen from '../screens/stocksScreen';

// const { Navigator, Screen } = createStackNavigator();

// const HomeNavigator = () => (
//     <Navigator headerMode="none">
//         <Screen name="Search" component={SearchScreen} />
//         <Screen name="Stocks" component={StockScreen}/>
//     </Navigator>
// );

// export const AppNavigator = () => (
//     <NavigationContainer>
//         <HomeNavigator />
//     </NavigationContainer>
// )



/*
const screens = {
    Search: {
        screen: SearchScreen
    },
    Stock: {
        screen: StockScreen
    }
}


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ReviewDetails from "../screens/ReviewDetails";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
 //other options: "float", "screen"
    <Screen name="Home" component={Home} />
    <Screen name="Details" component={ReviewDetails} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
 */