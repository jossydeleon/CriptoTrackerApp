/**
 * Created by @jdl_developer
 * This component shows an icon and message centered.
 * Note: This component requires
 * - react-native-elements
 */

import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../theme/theme";

export default function IconMessage({
  containerStyle,
  icon,
  iconSize,
  title,
  titleStyle,
  iconColor,
}) {
  return (
    <View style={containerStyle}>
      <Icon
        name={icon}
        type="font-awesome-5"
        color={iconColor ? iconColor : theme.colors.primary}
        size={iconSize ? iconSize : 90}
      />
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.font.textSize,
    paddingTop: 10,
    textAlign: "center",
  },
});

IconMessage.propTypes = {
  containerStyle: PropTypes.object,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.object,
  iconColor: PropTypes.string,
};
