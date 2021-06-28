import axios from "axios";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import LineChartSvg from "../components/LineCharSvg";
import Loading from "../components/Loading";
import useUtil from "../hooks/util/useUtil";
import { theme } from "../theme/theme";
import _ from "underscore";
import * as Device from 'expo-device';
import { dispatchAddToFavorites } from '../redux/actions' 
import { useDispatch, useSelector } from 'react-redux';

const CoinScreen = ({ navigation, route }) => {
  
  //Redux
  const favorites = useSelector((state) => state.favorites);

  //hook util
  const { currencyDollarFormatter, getWeekAgoUnixTimestamp } = useUtil();
  //State to handle loading
  const [loading, setLoading] = useState(false);
  //State to handle current coin
  const [coin, setCoin] = useState();
  //State to handle is coin is favorite
  const [isFavorite, setIsFavorite] = useState(false);
  //State to handle chart data
  const [data, setData] = useState({
    xAxisData: [],
    xAxisLabels: [],
    yAxisData: [],
    yAxisLabels: [],
  });

  //Redux dispatcher
  const dispatch = useDispatch();

  /**
   * Effect to receive coin by parameter
   */
  useEffect(() => {
    const param = JSON.parse(route.params?.coin);
    if (param) {
      setCoin(param);
    }
  }, [route]);


  /**
   * Effect to make a api call to receive coin's chart details
   */
  useEffect(() => {
    if (coin) {
      makeApiCall(coin.id);
    }
  }, [coin]);


  /**
   * Effect to compute is coin is in favorite list
   */
  useEffect(() => {
    if(coin) {
      setIsFavorite(favorites.some(item => item.id === coin.id))
    }
  }, [coin])
  
  
  /**
   * Make a call to coingecko to get details for current coin selected
   * @param {*} id
   */
  const makeApiCall = async (id) => {
    const to = (new Date() / 1000) | 0;
    const from = getWeekAgoUnixTimestamp();
    const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
    const response = await axios.get(url);

    const dates = response.data.prices.map((item) => item[0]);
    const prices = response.data.prices.map((item) => item[1]);

    //Group dates by days
    const groups = _.groupBy(dates, (date) =>
      moment(date).startOf("day").format()
    );
    const result = _.map(groups, (group, day) => day);
    const week = result.map((day) => moment(day).format("MMM DD"));

    //Set state with object containing label and values to display on chart
    setData({ xAxisData: prices, xAxisLabels: week });
  };


  /**
   * 
   */
  const handleAddToFavorites = () => {
    dispatch(dispatchAddToFavorites(coin))
    setIsFavorite(true);
  } 

  /**
   * Header(MainStackNavigation) interaction with screen component
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleAddToFavorites}>
          <Icon
            name="heart"
            type="font-awesome-5"
            color={isFavorite ? "red" : "gray"}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, coin, isFavorite]);

  
  if(!coin || loading) {
    // This is because react-native-lottie is not compatible on web
    if(Device.deviceName === null) return null;

    // react-native-lottie
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar source={{ uri: coin.image }} size={55} />
        <Text style={styles.title}>{`${coin.name}`}</Text>
      </View>
      <Text style={styles.price}>
        {currencyDollarFormatter(coin.current_price)}
      </Text>

      <View style={styles.chartContainer}>
        {Device.deviceName !== null && <LineChartSvg
          xAxisData={data.xAxisData}
          xAxisLabels={data.xAxisLabels}
          yAxisData={data.yAxisData}
          yAxisLabels={data.yAxisLabels}
        />}
      </View>

      <View style={styles.containerDetails}>
        {/** Coin Rank */}
        <View style={styles.rankContainer}>
          <Text style={styles.rank}>{`Rank #${coin.market_cap_rank}`}</Text>
        </View>
          
        {/** Coin details */}
        <View>
          <Text style={styles.titleDetail}>{"Market Cap"}</Text>
          <Text style={styles.subtitleDetail}>{currencyDollarFormatter(coin.market_cap)}</Text>
          
          <Text style={styles.titleDetail}>{"24h Low / 24h High"}</Text>
          <Text style={styles.subtitleDetail}>{`${currencyDollarFormatter(coin.high_24h)} / ${currencyDollarFormatter(coin.low_24h)}`}</Text>

          <Text style={styles.titleDetail}>{"Fully Diluted Valuation"}</Text>
          <Text style={styles.subtitleDetail}>{currencyDollarFormatter(coin.fully_diluted_valuation)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heartIcon: {
    paddingRight: 15,
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 8,
  },
  price: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  chartContainer: {
    padding: 2,
  },
  containerDetails:{
    top:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    paddingHorizontal:10
  },
  titleDetail: {
    fontWeight:'bold',
    color: 'white',
    textAlign: 'right'
  },
  subtitleDetail: {
    color:'gray',
    textAlign:'right'
  },
  rankContainer: {
    textAlign:'center',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:theme.colors.primary,
    padding: 10,
    borderRadius:10,
  },
  rank: {
    color: 'white',
    fontWeight:'bold',
    fontSize:16
  }
});

export default CoinScreen;
