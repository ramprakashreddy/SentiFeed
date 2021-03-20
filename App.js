import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
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
            backgroundColor: "#dbf0f7"
          }
        }}
      >
        <Stack.Screen name="HomeScreen" component={Home}
          options={{
            title: "",
            headerLeft: () => (
              <View style={{ marginLeft: 20 }}>
                <Image
                  source={require("./src/images/Header.png")}
                  style={{ width: 180, height: 30 }}
                />
              </View>
            ),

          }}
        />
        <Stack.Screen name="GraphScreen" component={Graph}
          options={{
            title: "",
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Image
                  source={require("./src/images/Header.png")}
                  style={{ width: 180, height: 30 }}
                />
              </View>
            ),

          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
