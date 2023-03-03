import * as React from "react";
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InventoryScreen from './pages/InventoryScreen.js';
import HouseBasketScreen from './pages/HouseBasketScreen';
import ScannerScreen from "./pages/ScannerScreen.js";
import Manual from "./pages/Manual.js";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F8F8F8',
          borderTopWidth: 2
        },
        tabBarActiveTintColor: '#2FC6B7',
        tabBarInactiveTintColor: 'black', 
      }}
    >
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen}
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fridge-outline" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="scan1" color={color} size={35} />
          ),
        }}  
      />
      <Tab.Screen
        name="HouseBasket"
        component={HouseBasketScreen}
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-basket" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer style={styles.image}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Manual" component={Manual} />
      </Stack.Navigator>
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
