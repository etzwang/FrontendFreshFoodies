import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import SortDropDown from './SortDropDown';

let data = {
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
  location: ["fridge, freezer, counter, pantry"]
}

const InventoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sort}>
        {/* <Text>sort by {data.sort_by[0]}</Text> */}
        <SortDropDown />
      </View>
      <View style={styles.inventory_container}>
        <Text style={{fontSize: '20'}}>{data.category[0]}</Text>
        <View style={styles.items_container}>
          <View style={styles.item}><Text>banana</Text></View>
          <View style={styles.item}><Text>apple</Text></View>
          <View style={styles.item}><Text>cucumber</Text></View>
          <View style={styles.item}><Text>tomato</Text></View>
          <View style={styles.item}><Text>onions</Text></View>
        </View>
        <Text style={{fontSize: '20', paddingTop: '5%'}}>{data.category[1]}</Text>
        <View style={styles.items_container}>
          <View style={styles.item}><Text>steak</Text></View>
          <View style={styles.item}><Text>chicken</Text></View>
        </View>
        <Text style={{fontSize: '20', paddingTop: '5%'}}>{data.category[2]}</Text>
        <View style={styles.items_container}>
          <View style={styles.item}><Text>banana</Text></View>
          <View style={styles.item}><Text>apple</Text></View>
          <View style={styles.item}><Text>cucumber</Text></View>
          <View style={styles.item}><Text>tomato</Text></View>
          <View style={styles.item}><Text>onions</Text></View>
        </View>
      </View>
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
    // backgroundColor: 'blue'
  },
  inventory_container: {
    flex: 9,
    // backgroundColor: 'white'
  },
  items_container: {
    padding: '1%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'normal'
  },
  item: {
    margin: '1%',
    backgroundColor:'white',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default InventoryScreen;