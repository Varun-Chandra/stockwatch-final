//import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './screens/searchScreen';
import StocksScreen from './screens/stocksScreen';

const Tab = createBottomTabNavigator();

export default function App() 
{
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Stocks" component={StocksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
});


/*

<Navigator />


OLD LESSONS
export default function App() 
{
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>WHOA</Text>
      </View>
      <View style={styles.body}>
        <Text>I AM THE ALPHA AND THE OMEGA</Text>
        <Text>I AM THE ALPHA AND THE OMEGA</Text>
        <Text>I AM THE ALPHA AND THE OMEGA</Text>
        <Text>I AM THE ALPHA AND THE OMEGA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: 'yellow',
    padding: 20,
  }
});
==========================================================================
export default function App() 
{
  const [name, setName] = useState('jeff');
  const [person, setPerson] = useState({ name: 'Hee-won', age: 27});
  
  const clickHandler = () => {
    setName('ryu')
    setPerson({name: 'Hae-In', age: 26})
  }

  return (
    <View style={styles.container}>
      <Text>My name is { name }</Text>
      <Text>This is {person.name}, age {person.age}</Text>
      <View style={styles.buttonContainer}>
        <Button title='update name' onPress={clickHandler}/>
      </View>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  }
});

=========================================================================
export default function App() 
{
  const [name, setName] = useState('Hee-won');
  const [age, setAge] = useState(27);
  return (
    <View style={styles.container}>
      <Text>Who are you? </Text>
      <TextInput 
        style={styles.input}
        placeholder="WHAT ARE YOU?"
        onChangeText={(value) => setName(value)}
      />
      <Text>How old are you? </Text>
      <TextInput
        keyboardType='numeric' 
        style={styles.input}
        placeholder="EH?"
        onChangeText={(age) => setAge(age)}
      />

      <Text>My name is {name}, age {age}</Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200
  },
});

================================================================================
export default function App() 
{
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', key: '0'},
    { symbol: 'ZM', key: '1'},
    { symbol: 'MRNA', key: '2'},
    { symbol: 'DOCU', key: '3'},
    { symbol: 'GME', key: '4'}
  ]);

  return (
    <View style={styles.container}>
      {stocks.map((item) => {
        return (
          <View key={item.key}>
            <Text style={styles.item} >{item.symbol}</Text>
          </View>
        )
      })}
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
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'lightblue',
    fontSize: 16,
  }
});
====================================================================================


*/
