import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InventoryScreen from './InventoryScreen';
import HouseBasketScreen from './HouseBasketScreen';
import ScanReceiptScreen from "./ScanReceiptScreen";
import LogoutScreen from "./LogoutScreen";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
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
        component={ScanReceiptScreen}
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
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          tabBarLabel: '',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen

