import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CoinScreen from "../screens/CoinScreen";
import { theme } from "../theme/theme";
import HeaderLogo from "../components/HeaderLogo";
import { Screens } from ".";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        gestureEnabled: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name={Screens.Home}
        component={BottomTabNavigator}
        options={{
          headerTitle: (props) => <HeaderLogo {...props} />,
        }}
      />

      <Stack.Screen
        name={Screens.CoinDetails}
        component={CoinScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
}
