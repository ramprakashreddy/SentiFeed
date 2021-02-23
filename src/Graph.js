

import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import LottieView from 'lottie-react-native';
import axios from 'axios';
export default class GraphScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: ""
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 500)
        console.log(this.props.route.params.res.ModelResponse)
        axios.get("http://13.233.186.159:5500/test2").then((response) => {
            console.log(JSON.stringify(response.data))
            this.setState({
                data: response.data
            })

        }).catch((error => {
            console.log(error)
        })
        )
    }
    render() {

        const data = [
            {
                name: "",
                Value: 0,
            },

            {
                name: "Positive",
                Value: this.state.data.Positive,
                color: "#02bd08",
                legendFontColor: "#7F7F7F",
                legendFontSize: 18,

            },
            {
                name: "Negative",
                Value: this.state.data.Negative,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 18
            },
            {
                name: "",
                Value: 0,
            },


        ];
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,

            useShadowColorFromDataset: false,// optional

        };
        const screenWidth = Dimensions.get("window").width
        const screenHeight = Dimensions.get("window").height


        return (
            this.state.isLoading ?

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView source={require('../src/Lottie/927-triangle-loading.json')}
                        autoPlay={true}
                        loop={true}
                        //resizeMode="contain"
                        style={{
                            width: Dimensions.get("window").width - 10,
                            aspectRatio: Dimensions.get("window").width / Dimensions.get("window").width,
                        }}


                    />

                </View> :
                <View style={{ flex: 1, backgroundColor: "#ffffff" }}>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, marginTop: 80 }}>
                            Thank You for Your Feedback !{'\n'}
                        </Text>
                        <Text style={{ fontSize: 20, marginTop: 5 }}>
                            Your Feedback was {this.props.route.params.res.ModelResponse}
                        </Text>

                    </View>
                    <View style={{ flex: 2, marginTop: -10 }}>
                        <PieChart
                            data={data}
                            width={screenWidth}
                            height={280}
                            chartConfig={chartConfig}
                            accessor={"Value"}
                            backgroundColor={"transparent"}
                            paddingLeft={20}
                            center={[5, 2]}
                            style={{
                                marginTop: 10
                            }}
                        />
                    </View>

                </View>
        );

    }

}



