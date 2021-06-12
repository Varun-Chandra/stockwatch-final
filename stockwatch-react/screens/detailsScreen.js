/* 
UPON SELECTION OF SYMBOL IN WATCHLIST, LOAD THIS SCREEN FEEDING IN STOCK SYMBOL 
*/

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity} from 'react-native';

//Graphing library
import { LineChart, Grid } from 'react-native-svg-charts';

//Importing API key
import { FMP_API_KEY } from '../api_key';

export default function DetailsScreen( { route, navigation } )
{
    //Gets symbol from watchlist screen
    const { symbol } = route.params; 

    //for showing information above graphs
    const [latestInfo, setLatestInfo] = useState({}); 

    //day value to feed into API call
    const [dayCount, setDayCount] = useState(3); 

    //state for getting values of change in stock price
    const [chartChanges, setChartChanges] = useState([]); 

    //state for getting values of percentage change in stock price
    const [chartPercentageChanges, setChartPercentageChanges] = useState([]);

    //state for showing date as additional info underneath graphs
    const [dateChanges, setDateChanges] = useState([]); 

    //These arrays store key data for change
    let changesArray = [];
    let changesPercentageArray = [];
    let datesArray = [];


    //Function to store latest info and graph data. Run inside a useEffect later in this component
    function getStockData(day){
    
        //Endpoint to retrieve graph data and other information
        const HISTORICAL_ENDPOINT = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=${day}&apikey=${FMP_API_KEY}`;

        axios.get(HISTORICAL_ENDPOINT)
        .then((res) =>
        {
            //from response, "historical" has the information we require
            const data = res.data["historical"]; 

            //emptying declared arrays so they dont get new values stacked on top of old ones
            changesArray = [];
            changesPercentageArray = [];
            datesArray = [];
            
            //Storing information from the latest date separately, to display above the graphs
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

            setLatestInfo(latest); //Setting state for latest information

            //mapping json data to an array
            let chart = data.map(item => {  

                //populate the three arrays here
                changesArray.push(item.change);
                changesPercentageArray.push(item.changePercent);
                datesArray.push(item.date);

                return {
                  date: item.date,
                  change: item.change,
                  changePercent: item.changePercent                
                }
            })

            //Provided API response records values from latest to earliest
            //Therefore, arrays for graphing must be reversed
            chart = chart.reverse(); 
            changesArray = changesArray.reverse();
            changesPercentageArray = changesPercentageArray.reverse();
            datesArray = datesArray.reverse();

            
            //setting state arrays to the newly populated arrays
            setChartChanges(changesArray);
            setChartPercentageChanges(changesPercentageArray);
            setDateChanges(datesArray);

        })
        .catch((err) => console.log(err));
    }


    //useEffect hook runs everytime dayCount is changed
    useEffect(() => {
        getStockData(dayCount);
    }, [dayCount])

    return(
        <ScrollView>
            <Text style={styles.textHeader}>{symbol}</Text>
            
            {/* SHOWING LATEST DATE INFORMATION */}
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

            {/* BUTTONS FOR DRAWING GRAPHS */}
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