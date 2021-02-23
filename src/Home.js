import React, { Component } from 'react';
import { useState } from 'react';
import axios from "axios";
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            
        }

    }
    apiCall() {
        //     this.props.navigation.navigate("GraphScreen")
        //console.log("http://13.233.186.159:3000/" + this.state.input.trim())
        if(this.state.input.trim()==""){
            ToastAndroid.show("Feedback Cannot be empty", ToastAndroid.SHORT)

        }else
        if (this.state.input.split(" ").length<=10) {
            ToastAndroid.show("Feedback should have min of 10 words", ToastAndroid.SHORT)

        }
        else{
             axios.post("http://13.233.186.159:5500/test/" + this.state.input.trim(), {
            headers: {}

        }).then((response) => {
            console.log(response.status, "response data " + JSON.stringify(response.data))
            res=response.data
            this.props.navigation.navigate("GraphScreen",{
                res
            })

        }).catch((error) => {
            console.log(error)
            ToastAndroid.show("ERROR OCCURED PLEASE TRY AFTER SOMETIME", ToastAndroid.SHORT)
        }).finally(()=>{
            this.setState({
                input:""
            })
        })

        }

       
    }
    render() {
        return (
            <ScrollView style={styles.container}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 50,

                }}
            >
                <View >
                    <LottieView source={require('../src/Lottie/3046-me-at-office.json')}
                        autoPlay={true}
                        loop={true}
                        //resizeMode="contain"
                        style={{
                            width: Dimensions.get("window").width - 10,
                            aspectRatio: Dimensions.get("window").width / Dimensions.get("window").width,
                        }}


                    />

                </View>
                <View >

                    <TextInput
                        placeholder="Please Provide the Feedback"
                        placeholderTextColor="#777777"
                        multiline={true}
                        value={this.state.input}
                        style={styles.textInputStyle}
                        onChangeText={(txt) => {
                            this.setState({
                                input: txt,
                            })
                        
                        }}

                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.apiCall()
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >
                            Submit
                          
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        )

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    button: {
        backgroundColor: "#548aff",
        height: "auto",
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 5,
        width: Dimensions.get("window").width - 40,
        alignSelf: 'center',
        elevation: 5,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textInputStyle: {

        padding: 10,
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 15,
        backgroundColor: "#ffffff",
        height: Dimensions.get("window").height - 600,
        width: Dimensions.get("window").width - 65,
        textAlignVertical: "top",
        borderRadius: 5,
        elevation: 3.5,
        alignSelf: 'center'


    }

})
