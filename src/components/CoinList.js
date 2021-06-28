import React, { memo } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinItem from "./CoinItem";

const CoinList = memo(({ coins, loading, onRefresh, onPress }) => {

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={coins}
      keyExtractor={(coin) => coin.id.toString()}
      renderItem={({ item }) => <CoinItem coin={item} onPress={onPress} />}
      enableEmptySections={true}
      refreshControl={
        <RefreshControl
          //refresh control used for the pull to refresh
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
    />
  );
})

export default CoinList;
