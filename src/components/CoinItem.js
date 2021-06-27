import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import useUtil from "../hooks/util/useUtil";
import { theme } from "../theme/theme";

const CoinItem = ({ coin, onPress }) => {

  const { trimTwoDecimals, currencyDollarFormatter } = useUtil();

  return (
    <ListItem containerStyle={styles.containerItem} onPress={() => onPress(coin)}>
      <Avatar source={{ uri: coin.image }} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{coin.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.symbol}>
          {coin.symbol}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content right>
        <ListItem.Title
          style={styles.currentPrice}
        >{currencyDollarFormatter(coin.current_price)}</ListItem.Title>
        <View
          style={[styles.boxPercent,
            coin.price_change_percentage_24h > 0
              ? styles.boxPercentPositive
              : styles.boxPercentNegative,
          ]}
        >
          <ListItem.Title
            style={styles.percent}
          >{`${trimTwoDecimals(coin.price_change_percentage_24h)}%`}</ListItem.Title>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: theme.colors.dark,
  },
  title: {
    color: theme.colors.gray,
    fontWeight:'bold',
  },
  currentPrice: {
    color: theme.colors.gray,
    fontSize:13,
    fontWeight:'bold',
    paddingVertical:2
  },
  symbol: {
    textTransform: "uppercase",
    color: theme.colors.darkgray,
    fontWeight:'bold',
  },
  percent: {
    color: "white",
    fontWeight: "bold",
    fontSize:12
  },
  boxPercent: {
    padding: 2,
    borderRadius:5
  },
  boxPercentPositive: {
    backgroundColor: "green",
  },
  boxPercentNegative: {
    backgroundColor: "red",
  },
});

export default CoinItem;
