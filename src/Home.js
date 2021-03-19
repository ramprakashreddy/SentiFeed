import React, { Component, useState } from 'react';
import axios from "axios";
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions, ToastAndroid, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';

export default HomeScreen = ({ navigation }) => {
    const [input, setInput] = React.useState("")
    const [disabled, setDisabled] = useState(true)
    function apiCall() {
        //     this.props.navigation.navigate("GraphScreen")
        //console.log("http://13.233.186.159:3000/" + input.trim())

        axios.post("http://13.233.186.159:5500/test/" + input.trim()).then((response) => {
            console.log(response.data)
            console.log(response.status, "response data " + response.data)
            var res = response.data
            // console.log(res)
            navigation.navigate("GraphScreen", {
                res,
                input
            })

        }).catch((error) => {
            console.log(error)
            ToastAndroid.show("ERROR OCCURED PLEASE TRY AFTER SOMETIME", ToastAndroid.SHORT)
        }).finally(() => {
            console.log("SETTED")
            setInput("")
            setDisabled(true)
        })
    }
    const width = Dimensions.get("screen").width
    const height = Dimensions.get("screen").height


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../src/images/BG.png")}
                resizeMode={"cover"}
                style={{ height: height, width: width }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: "8%", paddingLeft: "5%", justifyContent: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 30, color: "#26538E" }}>
                            Know your sentiments
                                </Text>
                        <Text style={{ fontSize: 14, color: "#26538E" }}>
                            You will be exploring our website You will be exploring {"\n"}our websiteYou will be exploring our website
                        </Text>
                    </View>
                    <View style={{ flex: 2.5, justifyContent: 'center' }}>
                        <View style={{
                            width: width - 20, height: height / 3,
                            backgroundColor: "#dbf0f7", alignSelf: 'center',
                            justifyContent: 'center', borderRadius: 10, marginTop: "10%"

                        }}>

                            <Text style={{
                                paddingLeft: "6%", marginBottom: "5%",
                                fontWeight: 'bold'
                                , fontSize: 18, color: "#26538E"
                            }}>
                                Enter Your Feedback
                            </Text>
                            <TextInput
                                style={{
                                    width: width - 60, height: height / 7,
                                    alignSelf: 'center', backgroundColor: "#ffffff",
                                    borderRadius: 10, paddingLeft: "4%", paddingTop: "4%",
                                    textAlign: 'left',
                                    textAlignVertical: 'top',

                                }}
                                placeholder={"Please enter your feedback"}
                                multiline={true}
                                value={input}
                                onChangeText={(input) => {
                                    if (input.trim() == "" || input.trim().split(" ").length <= 5 || input.trim().length >= 200) {
                                        setDisabled(true)
                                        setInput(input)
                                    }
                                    else {
                                        setDisabled(false)
                                        setInput(input)
                                    }
                                }}
                            />

                            <TouchableOpacity style={{
                                backgroundColor: disabled ? "grey" : "#26538E",
                                height: height / 20, width: "30%", marginLeft: "65%",
                                justifyContent: 'center', borderRadius: 3, marginTop: "4%",
                            }}
                                onPress={() => {
                                    apiCall()
                                }}
                                disabled={disabled}
                            >
                                <Text style={{ alignSelf: 'center', color: "#ffffff" }}>
                                    SUBMIT
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={{ flex: 4 }}>
                        <LottieView source={require('../src/Lottie/lottie2.json')}
                            autoPlay={true}
                            loop={true}
                            //resizeMode="contain"
                            style={{
                                alignSelf: 'center',
                                width: width - 10,
                                height: height / 2.5
                            }}


                        />
                    </View>

                </View>
            </ImageBackground>

            {/* <View style={{flex:1,justifyContent:'center'}}>

                <TextInput
                    placeholder="Please Provide the Feedback"
                    placeholderTextColor="#777777"
                    multiline={true}
                    value={input}
                    style={styles.textInputStyle}
                    onChangeText={(txt) => {
                      setInput(txt);
                    
                    }}

                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        apiCall()
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
            <View style={{flex:1}}>
                <LottieView source={require('../src/Lottie/lottie2.json')}
                    autoPlay={true}
                    loop={true}
                    //resizeMode="contain"
                    style={{
                        width: Dimensions.get("window").width - 10,
                        aspectRatio: Dimensions.get("window").width / Dimensions.get("window").width,
                    }}


                />

            </View> */}

        </View >

    )
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
