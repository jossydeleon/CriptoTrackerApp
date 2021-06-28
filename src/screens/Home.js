import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import CoinList from "../components/CoinList";
import SearchHeader from "../components/SearchHeader";
import { Screens } from "../navigation";

const Home = ({ navigation }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  /**
   * Effect to call function when component load
   */
  useEffect(() => {
    makeCallCoins();
  }, []);

  /**
   * Make request to coingecko to get all coins in market
   */
  const makeCallCoins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false"
      );
      setCoins(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [coins]);

  /**
   *
   * @param {*} coin
   */
  const handleSelectedCoin = useCallback((coin) => {
    if (coin) {
      navigation.push(Screens.CoinDetails, {
        name: coin.symbol.toUpperCase(),
        coin: JSON.stringify(coin),
      });
    }
  }, []);

  const filteredCoins = useMemo(
    () =>
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLocaleLowerCase())
      ),
    [coins, query]
  );

  return (
    <View>
      <SearchHeader
        placeholder="Search a coin..."
        text={query}
        onChangeText={(text) => setQuery(text)}
      />
      <CoinList
        coins={filteredCoins}
        loading={loading}
        onRefresh={makeCallCoins}
        onPress={handleSelectedCoin}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
