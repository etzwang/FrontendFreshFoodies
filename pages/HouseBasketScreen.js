import React, { Component, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./components/Button.js";
import Fridge from "../assets/fridge.svg";
import { useNavigation } from "@react-navigation/native";
import { getUserSharedFridgeObject } from "./utils/HttpUtils.js";


const HouseBasketScreen = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    getUserSharedFridgeObject().then((obj) => {
      var foods = obj.foods;
      // this is the food object, and is an array of object like this:
      // {"category":"produce","location":"fridge","name":"apple","quantity":1,"slug":"apple"}
      console.log("pushing foods: " + JSON.stringify(foods));
      // props.data.push(...foods);
      setData(foods);
    });
  }, [navigation?.route?.params?.newData]);
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Shared Fridge</Text>
      <View style={styles.form}>
        <Fridge width={115} height={215} />
        <Text style={{ padding: "10%" }}>
          It looks like your shared fridge is empty.
        </Text>
        <Text style={{ padding: "10%", fontWeight: "bold" }}>
          Let's offer up some groceries!
        </Text>
        <Button
          onPress={() => navigation.push("OfferUp")}
          title="Offer Up"
          color="#2FC6B7"
          width={150}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2FC6B7",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
    backgroundColor: "#FFFFFF",
  }
});

export default HouseBasketScreen;
