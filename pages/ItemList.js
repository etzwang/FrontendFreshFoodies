import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

function ItemList(props) {
  // create inventory
  let inventory = {}
  let sort = props.sort ? props.sort : "category";
  console.log("sort is: " + sort);
  // let sort = "category";

  console.log(props.data[sort]);
  // create the lists of each
  for (let i = 0; i < props.data[sort].length; i++) {
    let sortName = props.data[sort][i];
    inventory[sortName] = [];
  } 

  // add the items into the lists
  for (let i = 0; i < props.data.inventory.length; i++) {
    let item = props.data.inventory[i];
    inventory[item[sort]].push(item);
  }

  // now produce it onto the inventory
  var inventoryContainer = [];
  for (let i = 0; i < props.data[sort].length; i++) {
    let currSort = props.data[sort][i];
    if (inventory[currSort].length > 0) {
      inventoryContainer.push(<Text style={{fontSize: 20}}>{currSort}</Text>);
      var items = [];
      for (let j = 0; j < inventory[currSort].length; j++) {
        items.push(<View style={styles.item}><Text>{inventory[currSort][j].name}</Text></View>);
      }
      inventoryContainer.push(<View style={styles.items_container}>{items}</View>);
    }
  }

  if (inventoryContainer.length == 0) {
    inventoryContainer.push(<Text style={styles.empty}>It looks like your inventory is empty.</Text>)
    inventoryContainer.push(<Text style={styles.empty}>Scan a receipt to upload your items</Text>)    
  }

  return (
      <ScrollView style={styles.container}>
        {inventoryContainer}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  items_container: {
    padding: '1%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    margin: '1%',
    backgroundColor:'white',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    paddingTop: '5%',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 0,
    width: '100%',
  }
});

export default ItemList;