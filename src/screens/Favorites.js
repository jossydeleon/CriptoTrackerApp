import React from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CoinFavoriteItem from "../components/CoinFavoriteItem";
import IconMessage from "../components/IconMessage";
import { useDispatch } from "react-redux";
import { dispatchDeleteFromFavorites } from "../redux/actions";
import { Screens } from "../navigation";

const Favorites = ({ navigation }) => {
  
  //Redux
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  /**
   * Navigate to Coin details passing coin as a parameter
   */
  const handleCoinDetails = (coin) => {
    navigation.push(Screens.CoinDetails, {
      name: coin.symbol.toUpperCase(),
      coin: JSON.stringify(coin),
    });
  };

  /**
   *
   * @param {*} coin
   */
  const handleDeleteFavorite = (coin) => {
    dispatch(dispatchDeleteFromFavorites(coin));
  };

  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={favorites}
        keyExtractor={(coin) => coin.id.toString()}
        renderItem={({ item }) => (
          <CoinFavoriteItem
            coin={item}
            onPress={handleCoinDetails}
            onDelete={handleDeleteFavorite}
          />
        )}
        enableEmptySections={true}
        ListEmptyComponent={
          <IconMessage
            icon={"bitcoin"}
            iconSize={50}
            title={"You don't have favorites"}
            titleStyle={{ color: "white" }}
          />
        }
        contentContainerStyle={[
          { flexGrow: 1 },
          !favorites.length && { justifyContent: "center" },
        ]}
      />
    </>
  );
};

export default Favorites;
