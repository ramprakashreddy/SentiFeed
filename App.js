

        <Stack.Screen name="HomeScreen" component={Home}
          options={{
            title: "",
            headerLeft: () => (
              <View style={{ marginLeft: 20 }}>
                <Image
                  source={require("./src/images/Header.png")}
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
