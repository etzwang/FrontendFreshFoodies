import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InventoryScreen from './pages/InventoryScreen.js';
import HouseBasketScreen from './pages/HouseBasketScreen';
import ProfileScreen from './pages/ProfileScreen';
import StatisticsScreen from "./pages/StatisticsScreen.js";
import ScannerScreen from "./pages/ScannerScreen.js";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.image}>
      <Tab.Navigator>
        <Tab.Screen name="Inventory" component={InventoryScreen} />
        <Tab.Screen name="HouseBasket" component={HouseBasketScreen} />
        <Tab.Screen name="Scanner" component={ScannerScreen} />
        <Tab.Screen name="Statistics" component={StatisticsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
