

import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';

import LottieView from 'lottie-react-native';
import { PieChart } from 'react-native-svg-charts'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

//comment


export default GraphScreen = ({ route }) => {

    const value = route.params.res.ModelResponse;
    console.log("value", value)
    const userInput = route.params.input
    const [data, setData] = React.useState([])
    useEffect(() => {
        axios.get("https://triton300.herokuapp.com/test2").then((res) => {
            console.log("data is", res)

            var chartData = [
                {
                    key: 1,
                    value: res.data.Positive,
                    svg: { fill: '#5f89c0' },

                },
                {
                    key: 2,
                    value: res.data.Negative,
                    svg: { fill: '#26538e' },
                    arc: { outerRadius: '108%' }
                },


            ]
            setData(chartData)

        }).catch((error) => {
            console.log(error)

        })

    }, [])



    const width = Dimensions.get("screen").width
    const height = Dimensions.get("screen").height
    var lottie_source = value == "positive" ? require("../src/Lottie/562-emoji-reaction.json") : require("../src/Lottie/488-angry-emoji.json")

    return (

        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require("../src/images/BG.png")}
                resizeMode={"cover"}
                style={{ height: height, width: width }}
            >
                <View style={{ flex: 0.6, paddingLeft: "4%" }}>
                    <Text style={{ color: "#26538e", fontSize: 28, fontWeight: "bold", marginTop: "5%" }}>
                        Lets see the Results now
                    </Text>
                    <Text>
                        Sentifeed provides you with your individual feedback {"\n"}as well as total count
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: "#26538e", fontSize: 18, fontWeight: "bold", marginTop: "2%"
                        , marginBottom: "3%", paddingLeft: "4%"



                    }}>
                        You Statement was -
                    </Text>
                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: "#fcfcfc", width: width - 40,
                            padding: "3%", alignSelf: "center"
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={{ padding: "1%" }}>
                            {userInput}
                        </Text>

                    </ScrollView>

                </View>
                <View style={{ flex: 1, marginTop: "4%" }}>
                    <Text style={{
                        color: "#26538e", fontSize: 18, fontWeight: "bold", paddingLeft: "4%"
                    }}>
                        Your Individual Sentiment -
                    </Text>

                    <View style={{
                        flexDirection: 'row', justifyContent: "center"
                    }}>

                        <LottieView source={lottie_source}
                            autoPlay={true}
                            loop={true}
                            style={{
                                alignSelf: 'center',
                                width: width / 2.5,
                                height: width / 2.5,
                            }} />
                        <TouchableOpacity style={{
                            backgroundColor: "transparent",
                            height: height / 20, width: "55%", marginLeft: "35%",
                            justifyContent: 'center', borderRadius: 3, marginTop: "4%",
                            borderWidth: 1.2, borderColor: value == "positive" ? "#5ed071" : "#dd4f43", marginTop: "30%"
                        }}
                            disabled={true}
                        >
                            <Text style={{ alignSelf: 'center', color: value == "positive" ? "#5ed071" : "#dd4f43" }}>
                                {value == "positive" ? "POSITIVE" : "NEGATIVE"}
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{
                        color: "#26538e", fontSize: 18, fontWeight: "bold", paddingLeft: "4%"
                    }}>
                        Overall Results -
                    </Text>
                    {data.length > 0 ?
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: "5%" }}>

                            < PieChart
                                style={{ height: "55%", width: "55%" }}
                                outerRadius={'80%'}
                                innerRadius={2}
                                data={data}
                            />
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "40%" }}>
                                    <View
                                        style={{ height: 20, width: 20, backgroundColor: "#5f89c0" }}
                                    />
                                    <Text style={{ fontSize: 16, marginLeft: "8%" }}>
                                        Positive {(data[0].value / (data[0].value + data[1].value) * 100).toFixed(2)} %
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: "8%" }}>
                                    <View
                                        style={{ height: 20, width: 20, backgroundColor: "#26538e" }}
                                    />
                                    <Text style={{ fontSize: 16, marginLeft: "8%" }}>
                                        Negative {(data[1].value / (data[0].value + data[1].value) * 100).toFixed(2)} %
                                    </Text>
                                </View>
                            </View>
                        </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>
                                NO DATA
                            </Text>
                        </View>
                    }



                </View>

            </ImageBackground>
        </View >
    );
}





