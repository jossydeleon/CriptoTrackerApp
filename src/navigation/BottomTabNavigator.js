import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../screens/Favorites";
import Home from "../screens/Home";
import { Icon } from "react-native-elements";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { theme } from "../theme/theme";
import { Screens } from ".";

//Assign constan to BottomTabNavigator
const BottomTab = createBottomTabNavigator();

/**
 * Function to get name of current bottom tab
 * @param {*} name Title of current bottom tab
 */
const getCurrentScreeenName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  switch (routeName) {
    case "Home":
      return "Home";
    case "Favorites":
      return "Favorites";
  }
};

/**
 * Function that represent bottom navigation tabs
 * @returns
 */
export default function BottomTabNavigator({ navigation, route }) {
  /**
   * useLayoutEffect to change title of header
   * When bottom navigation tab is changed.
   */
  useLayoutEffect(() => {
    const title = getCurrentScreeenName(route);
    if (title === Screens.Home) {
      /*
      navigation.setOptions({
        headerTitle: <SearchHeader placeholder="Search" />,
        headerStyle: {
          shadowColor: "transparent",
          borderBottomColor: "transparent",
          elevation: 0,
        },
      });
      */
    } else {
      
    }
  }, [navigation, route]);

  return (
    <BottomTab.Navigator
      initialRouteName={Screens.Home}
      screenOptions={{
        gestureEnabled: true,
      }}
      tabBarOptions={{
        inactiveTintColor: "#484d79",
        style: { backgroundColor: theme.colors.background },
        showLabel:false
      }}
    >
  
          <BottomTab.Screen
            name={Screens.Home}
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="bitcoin"
                  type="font-awesome-5"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
       

  
          <BottomTab.Screen
            name={Screens.Favorites}
            component={Favorites}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="heart"
                  type="font-awesome-5"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
  
    </BottomTab.Navigator>
  );
}
