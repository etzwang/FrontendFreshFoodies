import React, { Component, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import OfferUpItemList from "./OfferUpItemList";
import SortDropDown from "./SortDropDown";
import Button from "./components/Button.js";
import { useNavigation } from "@react-navigation/native";
import {
  getUserPersonalFridgeObject,
  getUserFridgeIds,
  addOrRemoveFoodFromFridge,
} from "./utils/HttpUtils.js";

const OfferUp = (navigation) => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    getUserPersonalFridgeObject().then((obj) => {
      if (obj === undefined) {
        alert("no shared fridge or failed to get shared fridge");
      }
      var foods = obj.foods;
      // this is the food object, and is an array of object like this:
      // {"category":"produce","location":"fridge","name":"apple","quantity":1,"slug":"apple"}
      console.log("pushing foods: " + JSON.stringify(foods));
      setData(foods);
    });
  }, [navigation?.route?.params?.newData]);

  console.log("inside offerup screen");
  // console.log(props.route.params.data)
  const sort_by = ["category", "expiration_date", "quantity", "location"];
  const location = ["fridge", "freezer", "counter", "pantry"];
  const category = ["produce", "meat", "dairy"];
  const nav = useNavigation();

  const [selected, setSelected] = React.useState("");
  var [foodArray, setfoodArray] = React.useState([]); // array of foods being selected to offer up

  const handleOfferUp = async () => {
    console.log(foodArray);
    fridgeIds = await getUserFridgeIds();
    console.log("FRIDGE IDS: " + fridgeIds);
    setfoodArray([]);
    addOrRemoveFoodFromFridge(fridgeIds[0], foodArray, "remove");
    // addOrRemoveFoodFromFridge(fridgeIds[1], foodArray, "add")
    nav.goBack();
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>My Fridge</Text>
      <View style={styles.form}>
        <View style={styles.container}>
          <View style={styles.sort}>
            <SortDropDown sort={sort_by} setSelected={setSelected} />
          </View>
          <OfferUpItemList
            sort={selected}
            data={data}
            location={location}
            category={category}
            basket="inventory"
            details="Scan a receipt to upload your items"
            foodArray={foodArray}
          />
          <View style={styles.btn}>
            <Button
              onPress={() => handleOfferUp()}
              title="Offer Up!"
              color="#ADEBE7"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: "1%",
    width: "95%",
  },
  sort: {
    position: "sticky",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    maxHeight: "10%",
    position: "absolute",
    right: "2%",
    top: "5%",
    zIndex: 100, // brings to front
  },
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
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
  btn: {
    position: "sticky",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    maxHeight: "10%",
    position: "absolute",
    right: "5%",
    bottom: "10%",
    zIndex: 100,
  },
});

export default OfferUp;
