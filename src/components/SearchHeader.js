import React from "react";
import { useTheme } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../theme/theme";

const SearchHeader = ({ text, onChangeText, onClearText, placeholder }) => {
  const { colors } = useTheme();

  return (
    <SearchBar
      round
      lightTheme
      autoCorrect={false}
      //searchIcon={{ size: 20 }}
      cancelIcon
      showCancel={true}
      platform={"ios"}
      value={text}
      onChangeText={onChangeText}
      onClear={onClearText}
      placeholder={placeholder}
      //cancelButtonTitle={"Cancel"}
      cancelButtonProps={{
        color: colors.primary,
      }}
      inputStyle={{
        fontSize: wp("4%"),
        color: "white",
      }}
      containerStyle={{
        backgroundColor: theme.colors.dark,
      }}
      inputContainerStyle={{
        backgroundColor: theme.colors.secondary,
      }}
    />
  );
};

export default SearchHeader;
