import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
  const animation = useRef();

  useEffect(() => {
    animation.current.play();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <LottieView
        ref={animation}
        source={require("../../assets/loaders/coins.json")}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
   alignSelf:'center',
   flex: 1,
   justifyContent:'center'
  },
  animation: {
    width: 230,
    height: 230,
    backgroundColor: "transparent",
  },
});

export default Loading;
