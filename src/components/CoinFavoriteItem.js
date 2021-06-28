import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar, Button } from "react-native-elements";
import { theme } from "../theme/theme";

const CoinFavoriteItem = ({ coin, onPress, onDelete }) => {
  return (
    <ListItem.Swipeable
      containerStyle={styles.containerItem}
      onPress={() => onPress(coin)}
      rightContent={
        <Button
          title="Delete"
          icon={{ name: "delete", color: "white" }}
          buttonStyle={styles.buttonDelete}
          onPress={() => onDelete(coin)}
        />
      }
    >
      <Avatar source={{ uri: coin.image }} />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{coin.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.symbol}>
          {coin.symbol}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: theme.colors.dark,
  },
  title: {
    color: theme.colors.gray,
    fontWeight: "bold",
  },
  symbol: {
    textTransform: "uppercase",
    color: theme.colors.darkgray,
    fontWeight: "bold",
  },
  buttonDelete: {
    minHeight: "100%",
    backgroundColor: "red",
  },
});

export default CoinFavoriteItem;
