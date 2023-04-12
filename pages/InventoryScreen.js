import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ItemList from "./ItemList";
import SortDropDown from './SortDropDown';

const InventoryScreen = (props) => {
  var data = []
  if (props.route?.params?.data !== undefined) {
    data.push(...props.route.params.data)
  }

  console.log("inside inventory screen")
  // console.log(props.route.params.data)
  const sort_by = ["category", "expiration_date", "quantity", "location"]
  const location = ["fridge", "freezer", "counter", "pantry"]
  const category = ["produce", "meat", "dairy"]
  
  // if (props && props.route.params && props.route.params.newItem) {
  //   const newItem = props.route.params.newItem;
  //   console.log("pushing new item into database: ")
  //   console.log(newItem)
  //   setData([...data, newItem]);
  //   data.inventory.push(newItem)
  // }

  const [selected, setSelected] = React.useState("");
  return (
    <View style={styles.page}>
      <Text style={styles.title}>My Fridge</Text>
      <View style={styles.form}>
        <View style={styles.container}>
          <View style={styles.sort}>
            <SortDropDown sort={sort_by} setSelected={setSelected}/>
          </View>
          <ItemList sort={selected} data = {data} location={location} category={category}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding:'1%',
    width: '95%'
  },
  sort: {
    position: 'sticky',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxHeight: '10%',
    position: 'absolute',
    right: '2%',
    top: '5%',
    zIndex: 100, // brings to front
  },
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
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
});

export default InventoryScreen;