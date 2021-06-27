import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "@use-expo/font";
import { theme } from "../theme/theme";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const HeaderLogo = ({ style }) => {
  let [fontsLoaded] = useFonts({
    "MeriendaOne-Regular": require("../../assets/fonts/merienda.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.header}>Crypto Tracker</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    fontFamily: "MeriendaOne-Regular",
    //fontSize: wp("5%"),
    color: theme.colors.white,
    textAlign: "center",
  },
});

export default HeaderLogo;
