import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./components/Button.js";
import Fridge from "../assets/fridge.svg";

const HouseBasketScreen = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Shared Fridge</Text>
      <View style={styles.form}>
        <Fridge width={115} height={215} />
        <Text style={{padding: "10%"}}>It looks like your shared fridge is empty.</Text>
        <Text style={{padding: "10%", fontWeight: "bold"}}>Let's offer up some groceries!</Text>
        <Button onPress={{}} title="Offer Up" color="#2FC6B7"/>
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
    backgroundColor: "#FFFFFF"
  },
});

export default HouseBasketScreen;