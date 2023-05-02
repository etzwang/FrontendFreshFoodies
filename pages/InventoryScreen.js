import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { Component, useCallback, useEffect, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import ItemList from "./ItemList";
import SortDropDown from "./SortDropDown";
import Button from "./components/Button.js";
import {
  getUserPersonalFridgeObject,
  getUserFridgeIds,
  addOrRemoveFoodFromFridge,
} from "./utils/HttpUtils.js";

const InventoryScreen = (navigation) => {
  const nav = useNavigation();
  const [data, setData] = React.useState([]);
  const sort_by = ["category", "expiration_date", "quantity", "location"];
  const location = ["fridge", "freezer", "counter", "pantry"];
  const category = ["produce", "meat", "dairy"];
  const [selected, setSelected] = React.useState("");
  var inventory = [];
  const [foodArray, setfoodArray] = React.useState([]); // array of foods being selected to delete
  const [rerender, setRerender] = React.useState([false]);

  useFocusEffect(
    useCallback(() => {
      getUserPersonalFridgeObject().then((obj) => {
        var foods = obj.foods;
        // this is the food object, and is an array of object like this:
        // {"category":"produce","location":"fridge","name":"apple","quantity":1,"slug":"apple"}
        console.log("pushing foods: " + JSON.stringify(foods));
        setData(foods);
        setRerender(false);
      });
    }, [navigation?.route?.params?.newData, rerender])
  );

  const handleRemove = async () => {
    console.log("handling remove: ");
    console.log(foodArray);
    const fridgeIds = await getUserFridgeIds();
    let foodNameArray = [];
    for (let i = 0; i < foodArray.length; i++) {
      console.log("handle remove: " + foodArray[i].slug);
      foodNameArray.push(foodArray[i].slug);
    }
    await addOrRemoveFoodFromFridge(fridgeIds[0], foodNameArray, "remove");
    setfoodArray([]);
    setRerender(true);
  };

  const handleOfferUp = async () => {
    console.log(foodArray);
    const fridgeIds = await getUserFridgeIds();
    console.log("FRIDGE IDS: " + fridgeIds);
    setfoodArray([]);
    let foodNameArray = [];
    for (let i = 0; i < foodArray.length; i++) {
      foodNameArray.push(foodArray[i].slug)
    }
    await addOrRemoveFoodFromFridge(fridgeIds[0], foodNameArray, "remove");
    await addOrRemoveFoodFromFridge(fridgeIds[1], foodArray, "add")
    setRerender(true);
  };

  if (data.length == 0) {
    inventory.push(
      <View style={styles.form} key={0}>
        <Text style={styles.empty} key={1}>
          It looks like your inventory is empty.
        </Text>
        <Text style={styles.empty} key={2}>
          Scan a receipt to upload your items
        </Text>
      </View>
    );
  } else {
    inventory = (
      <ItemList
        sort={selected}
        data={data}
        location={location}
        category={category}
        isPersonalFridge={true}
        foodArray={foodArray}
      />
    );
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>My Fridge</Text>
      <View style={styles.form}>
        <View style={styles.container}>
          <View style={styles.sort}>
            <SortDropDown sort={sort_by} setSelected={setSelected} />
          </View>
          {inventory}
          <View style={styles.btns}>
            <Button
              onPress={() => handleRemove()}
              title="Remove"
              color="#2FC6B7"
              width={100}
            />
            <Button
              onPress={() => nav.navigate("Manual")}
              title="Add"
              color="#2FC6B7"
              width={100}
            />
            <Button
              onPress={() => handleOfferUp()}
              title="Offer Up"
              color="#2FC6B7"
              width={100}
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
  empty: {
    fontSize: 18,
  },
  btns: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "flex-end"
  }
});

export default InventoryScreen;
