import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import ItemList from "./ItemList";
import SortDropDown from './SortDropDown';


const InventoryScreen = () => {
  const data = {
    inventory: [
      {
        name: "banana",
        category: "produce",
        quantity: 1,
        expiration_date: "2023-02-21",
        location: "counter"
      },
      {
        name: "steak",
        category: "meat",
        quantity: 2,
        expiration_date: "2023-02-25",
        location: "freezer"
      },
      {
        name: "egg",
        category: "dairy",
        quantity: 6,
        expiration_date: "2023-02-30",
        location: "fridge"
      },
      {
        name: "apple",
        category: "produce",
        quantity: 3,
        expiration_date: "2023-02-22",
        location: "fridge"
      },
  
    ],
    category: ["produce", "meat", "dairy"],
    sort_by: ["category", "expiration_date", "quantity", "location"],
    location: ["fridge", "freezer", "counter", "pantry"]
  };
  
  const [selected, setSelected] = React.useState("");
  console.log(setSelected);
  return (
    <View style={styles.container}>
      <View style={styles.sort}>
        <SortDropDown sort={data.sort_by} setSelected={setSelected}/>
      </View>
      <View style={{height: '5%'}}></View>
      <ItemList sort={selected} data={data}/>
      <View style={{height: '1%'}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding:'5%'
  },
  sort: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxHeight: '10%',
    position: 'absolute',
    right: '2%',
    top: '5%',
    zIndex: 100, // brings to front
  }
});

export default InventoryScreen;