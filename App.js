import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./src/Home";
import Graph from "./src/Graph";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffff"
          }
        }}
      >
        <Stack.Screen name="HomeScreen" component={Home}
          options={{
            headerTitle: "Home"
          }}
        />
        <Stack.Screen name="GraphScreen" component={Graph}
          options={{
            headerTitle: "Results"
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
