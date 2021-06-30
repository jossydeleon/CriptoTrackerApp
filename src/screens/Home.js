import React, { useEffect, useState, useMemo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import CoinList from "../components/CoinList";
import SearchHeader from "../components/SearchHeader";
import { Screens } from "../navigation";
import { useDispatch, useSelector } from "react-redux";
import actionCreators from "../redux/actions";

const Home = ({ navigation }) => {

  //Redux
  const dispatch = useDispatch();
  const { fetchCryptoCoins } = actionCreators.coinsActions;
  const {coins, loading, error} = useSelector(state => state.coins);


   //State to handle typing on search bar
   const [query, setQuery] = useState("");

  /**
   * Effect to call function when component load
   */
  useEffect(() => {
    handleRequestCoins();
  }, []);


  useEffect(() => {
    if(error) {
      alert(error)
    }
  }, [error])


  /**
   * Handle process of request coins
   */
  const handleRequestCoins = useCallback(() => {
    dispatch(fetchCryptoCoins());
  },[coins])


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
        onRefresh={handleRequestCoins}
        onPress={handleSelectedCoin}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
