import axios from 'axios';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, View, FlatList, Button, Dimensions, TouchableOpacity} from 'react-native';

import { LineChart, Grid } from 'react-native-svg-charts';

import { useStocksContext } from '../contexts/stocksContext';

import { FMP_API_KEY } from '../api_key';

export default function DetailsScreen( { route, navigation } )
{
    const { symbol } = route.params;

    const [latestInfo, setLatestInfo] = useState({})

    const [dayCount, setDayCount] = useState(3);

    const [chartData, setChartData] = useState([]);

    const [chartChanges, setChartChanges] = useState([]);

    const [chartPercentageChanges, setChartPercentageChanges] = useState([]);

    const [dateChanges, setDateChanges] = useState([]);

    const { state, addToWatchlist } = useStocksContext();

    let changesArray = [];
    let changesPercentageArray = [];
    let datesArray = [];


    //Function to store latest info and chart
    function getStockData(day){
        
        //let tempDay = 3;

        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=${day}&apikey=${FMP_API_KEY}`)
        .then((res) =>
        {
            const data = res.data["historical"];
            changesArray = [];
            changesPercentageArray = [];
            datesArray = [];
            
            let latest = {
                date: data[0].date,
                close: data[0].close,
                high: data[0].high,
                low: data[0].low,
                open: data[0].open,
                volume: data[0].volume,
                change: data[0].change,
                changePercent: data[0].changePercent
            };

            setLatestInfo(latest);

            let chart = data.map(item => {  //mapping json data to an array

                //populate two arrays here
                changesArray.push(item.change);
                changesPercentageArray.push(item.changePercent);
                datesArray.push(item.date);

                return {
                  date: item.date,
                  change: item.change,
                  changePercent: item.changePercent                
                }
            })

            chart = chart.reverse(); //To store info from earliest to latest
            changesArray = changesArray.reverse();
            changesPercentageArray = changesPercentageArray.reverse();
            datesArray = datesArray.reverse();

            setChartData(chart);

            setChartChanges(changesArray);
            setChartPercentageChanges(changesPercentageArray);
            setDateChanges(datesArray);

        })
        .catch((err) => console.log(err));
    }


    useEffect(() => {
        getStockData(dayCount);
    }, [dayCount])

    return(
        <ScrollView>
            <Text style={styles.textHeader}>{symbol}</Text>

            <Text style={styles.subHeaderText}> Updated as of {latestInfo.date}</Text>
            <Text style={styles.underline}>___________________________________________________________</Text>

            {/* PRICE AT OPEN AND CLOSE */}
            <View style={styles.textContainerOne}>
                <Text style={styles.bodyText}>
                    Open : ${latestInfo.open}
                </Text>
                <Text style={styles.bodyText}>
                    Close : ${latestInfo.close}
                </Text>
            </View>

            {/* PRICE HIGH AND LOW */}

            <View style={styles.textContainerTwo}>
                <Text style={styles.bodyText}>
                    Price High : ${latestInfo.high}
                </Text>
                <Text style={styles.bodyText}>
                    Price Low : ${latestInfo.low}
                </Text>
            </View>

            {/* CHANGE AND CHANGE PERCENTAGE */}
            <View style={styles.textContainerTwo}>
                <Text style={styles.bodyText}>
                    Change : ({latestInfo.change})
                </Text>
                <Text style={styles.bodyText}>
                    Change % : ({latestInfo.changePercent}%)
                </Text>
            </View>
            
            {/* VOLUME OF SHARES TRADED */}
            <View style={styles.textContainerThree}>
                <Text style={styles.bodyText}>
                        Volume of shares Traded - {latestInfo.volume}
                </Text>
            </View>

            <Text style={styles.underline}>___________________________________________________________</Text>

            <Text style={styles.subHeaderText}> 
                Performance Graphs 
            </Text>

            <Text style={styles.subHeaderSubText}> 
                Select any of the options below to see Stock Performance 
            </Text>

            <View style={styles.btnGroup}>
                <TouchableOpacity onPress={() => setDayCount(7)}>
                <Text style={styles.textBtn}> Past Week </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setDayCount(31)}>
                <Text style={styles.textBtn}> Past Month </Text>
                </TouchableOpacity>
            </View>

            {/* SHOWING CHANGES GRAPH TITLE AND GRAPH */}
            <View style={styles.graphYContainer}>
                <Text style={styles.graphYText}> 
                    Graph - Change Values (Past {dayCount} days)
                </Text>
            </View>

            {/* CHANGES GRAPH */}
            <LineChart
                style={{ height: 200 }}
                data={chartChanges}
                svg={{ stroke: 'rgb(255, 255, 255)' }}
                contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
                <Grid />
            </LineChart>

            {/* CHANGES GRAPH DETAILS */}
            <View style={styles.graphYContainer}>
                <Text style={styles.graphYText}> 
                    y-axis - Change Values ( Lowest {`=`} {Math.min(...chartChanges)}) (Highest {`->`} {Math.max(...chartChanges)}) 
                </Text>
                <Text style={styles.graphXText}> 
                    x-axis - Earliest to Latest Dates for Past {dayCount} days ({dateChanges[0]} {`->`} {dateChanges[dateChanges.length - 1]})
                </Text>
            </View>

            <Text style={styles.underline}>___________________________________________________________</Text>

            {/* SHOWING CHANGES PERCENTAGE GRAPH TITLE AND GRAPH */}
            <View style={styles.graphYContainer}>
                <Text style={styles.graphYText}> 
                    Graph - Change Percentage Values (Past {dayCount} days)
                </Text>
            </View>

            {/* CHANGES PERCENTAGE GRAPH */}
            <LineChart
                style={{ height: 200 }}
                data={chartPercentageChanges}
                svg={{ stroke: 'rgb(255, 255, 255)' }}
                contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
                <Grid />
            </LineChart>

            {/* CHANGES PERCENTAGE GRAPH DETAILS */}
            <View style={styles.graphYContainer}>
                <Text style={styles.graphYText}> 
                    y-axis - Change Percentage Values {`->`} (Lowest {`=`} {Math.min(...chartPercentageChanges)}) (Highest {`=`} {Math.max(...chartPercentageChanges)}) 
                </Text>
                <Text style={styles.graphXText}> 
                    x-axis - Earliest to Latest Dates for Past {dayCount} days ({dateChanges[0]} {`->`} {dateChanges[dateChanges.length - 1]}) 
                </Text>
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textContainerOne: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainerTwo: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainerThree: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textHeader: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 10,
        textDecorationLine: 'underline'
    },
    subHeaderText: {
        color: 'white',
        fontSize: 20,
        margin: 10,
        paddingTop: 10,
        paddingLeft: 10,
        textDecorationLine: 'underline'
    },
    subHeaderSubText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        paddingLeft: 10
    },
    bodyText: {
        marginTop: 10,
        color: 'white',
        fontSize: 15
    },
    textBtn: {
        color: 'white',
        borderColor: 'white',
        fontSize: 15,
        borderWidth: 2,
        borderRadius: 0.5,
        marginBottom: 4,
        marginTop: 10
    },
    btnGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20
    },
    graphYText: {
        color: 'white',
        alignContent: 'center',
        paddingLeft: 10
    },
    graphXText: {
        color: 'white',
        alignContent: 'center',
        paddingLeft: 10
    },
    graphYContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    underline: {
        color: 'white'
    }
  });

  /*
  //console.log(data);//grab change, changePercent
             Object {
            "adjClose": 398.98,
            "change": 8.58,
            "changeOverTime": 0.02198,
            "changePercent": 2.198,
            "close": 398.98,
            "date": "2021-06-10",
            "high": 399.68,
            "label": "June 10, 21",
            "low": 387.03,
            "open": 390.4,
            "unadjustedVolume": 824700,
            "volume": 824700,
            "vwap": 395.23,

//mock linechart data - [50, 10, 40, 95, 85, 91, 35, 53, 24, 50]
    //let mData = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50];
    // let mockData = [{val: 50, x: 1, y: 1}, 
    //     {val: 10, x: 1, y: 1}, 
    //     {val: 40, x: 2, y: 2}, 
    //     {val: 95, x: 3, y: 3}, 
    //     {val: 85, x: 4, y: 4}, 
    //     {val: 91, x: 5, y: 5}, 
    //     {val: 35, x: 6, y: 6}, 
    //     {val: 53, x: 7, y: 7}, 
    //     {val: 24, x: 8, y: 8}, 
    //     {val: 50, x: 9, y: 9}];
   */