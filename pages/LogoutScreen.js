import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./components/Button.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const LogoutScreen = () => {
  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.removeItem("user_email")
    navigation.push("Login")
  }

  const leaveSharedFridge = () => {
    // DAVID NEED TO CALL API THAT LEAVES THE FRIDGE
    alert('Leave Shared fridge called!')
    navigation.navigate("HouseBasket")
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.form}>
        <Button onPress={leaveSharedFridge} title="Leave Shared Fridge" color="#ADEBE7"/>
        <Button onPress={logout} title="Logout" color="#2FC6B7" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2FC6B7"
  },
  title: {
    color: "#FFFFFF",
    fontWeight: 'bold',
    fontSize: 35,
    paddingBottom: "1%",
  },
  form: {
    width: "100%",
    height: "87.5%",
    alignItems: "center",
    justifyContent: "center",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    backgroundColor: "#FFFFFF"
  },
});

export default LogoutScreen;