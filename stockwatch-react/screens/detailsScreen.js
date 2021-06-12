import axios from 'axios';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, ScrollView, FlatList, Button, Dimensions, TouchableOpacity} from 'react-native';

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

    const { state, addToWatchlist } = useStocksContext();

    let changesArray = [];
    let changesPercentageArray = [];
    
    let count = 0;

    //Function to store latest info and chart
    function getStockData(day){
        
        //let tempDay = 3;

        axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=${day}&apikey=${FMP_API_KEY}`)
        .then((res) =>
        {
            const data = res.data["historical"];
            changesArray = [];
            changesPercentageArray = [];
            //console.log(data);//grab change, changePercent
            /*
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
             */
            
            let latest = {
                date: data[0].date,
                close: data[0].close,
                high: data[0].high,
                low: data[0].low,
                open: data[0].open,
                volume: data[0].volume
            };

            setLatestInfo(latest);

            let chart = data.map(item => {  //mapping json data to an array

                //populate two arrays here
                changesArray.push(item.change);
                changesPercentageArray.push(item.changePercent);
                return {
                  date: item.date,
                  change: item.change,
                  changePercent: item.changePercent                
                }
            })

            chart = chart.reverse(); //To store info from earliest to latest

            setChartData(chart);

            setChartChanges(changesArray);
            setChartPercentageChanges(changesPercentageArray);


        })
        .catch((err) => console.log(err));
    }


    useEffect(() => {
        //getStockData(dayCount);
    }, [dayCount])


    //mock linechart data - [50, 10, 40, 95, 85, 91, 35, 53, 24, 50]
    let mockData = [50, 10, 40, 95, 85, 91, 35, 53, 24, 50];
    return(
        <ScrollView>
            <Text style={styles.textHeader}>DetailsPage</Text>

            <View style={styles.textContainerOne}>
                <Text style={styles.bodyText}>
                    1- Symbol - {symbol}
                </Text>
                <Text style={styles.bodyText}>
                    2- Information Updated as of - {latestInfo.date}
                </Text>
                <Text style={styles.bodyText}>
                    3- Day's Close - {latestInfo.close}
                </Text>
                <Text style={styles.bodyText}>
                    7 - Shares Traded (on that day) - {latestInfo.volume}
                </Text>
            </View>

            <View style={styles.textContainerTwo}>
                <Text style={styles.bodyText}>
                    4- Day's open - {latestInfo.open}
                </Text>
                <Text style={styles.bodyText}>
                    5- Day's high - {latestInfo.high}
                </Text>
                <Text style={styles.bodyText}>
                    6- Day's low - {latestInfo.low}
                </Text>
            </View>

            <Text style={styles.bodyText}> Select any of the buttons below to see graphs </Text>

            <View style={styles.btnGroup}>
                <TouchableOpacity onPress={() => setDayCount(7)}>
                <Text style={styles.textBtn}> 1W </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setDayCount(31)}>
                <Text style={styles.textBtn}> 1M </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setDayCount(183)}>
                <Text style={styles.textBtn}> 6M </Text>
                </TouchableOpacity>
            </View>
            <LineChart
                style={{ height: 200 }}
                data={mockData}
                svg={{ stroke: 'rgb(250, 255, 254)' }}
                contentInset={{ top: 20, bottom: 20, left: 40, right: 40 }}
            >
                <Grid />
            </LineChart>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textContainerOne: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textContainerTwo: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textHeader: {
        color: 'white',
        fontSize: 30
    },
    bodyText: {
        color: 'white',
        fontSize: 18
    },
    textBtn: {
        color: 'white',
        borderColor: 'grey',
        borderWidth: 2,
        marginBottom: 4,
    },
    btnGroup: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
  });