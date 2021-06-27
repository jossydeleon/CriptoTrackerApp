import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import CoinList from "../components/CoinList";
import SearchHeader from "../components/SearchHeader";


const Home = ({ navigation }) => {
  //
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  /**
   *
   */
  useEffect(() => {
    makeCallCoins();
  }, []);


  /**
   * 
   */
  useEffect(() => {
    filteredCoins();
  }, [query]);

  
  /**
   *
   */
  const makeCallCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
      );
      setCoins(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };


  /**
   * 
   * @returns 
   */
  const filteredCoins = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  };


  /**
   * 
   * @param {*} coin 
   */
  const onSelectedCoin = (coin) => {
    if (coin) {
      navigation.push("CoinScreen", {
        name: coin.symbol.toUpperCase(),
        coin: JSON.stringify(coin),
      });
    }
  };

  return (
    <View>
      <SearchHeader
        placeholder="Search a coin..."
        text={query}
        onChangeText={(text) => setQuery(text)}
      />
      <CoinList
        coins={coins}
        loading={loading}
        onRefresh={makeCallCoins}
        onPress={onSelectedCoin}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
