import React, { Component, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function ItemList(props) {
  const navigation = useNavigation();
  // create inventory
  let inventory = {};
  let sortCategoryList = [];
  let sort = props.sort ? props.sort : "category"; // if props sort is undefined - default is category

  if (sort == "category" || sort == "location") {
    // create the lists of each
    for (let i = 0; i < props[sort].length; i++) {
      let sortName = props[sort][i];
      sortCategoryList.push(sortName);
      inventory[sortName] = [];
    }

    // add the items into the lists
    for (let i = 0; i < props.data.length; i++) {
      let item = props.data[i];
      // if (typeof item == 'undefined') {continue;}
      try {
        inventory[item[sort]].push(item);
      } catch(error) {
        continue;
      }
    }
  } else if (sort == "expiration_date") {
    sortCategoryList.push(
      "expired",
      "expiring today",
      "expiring the next two days",
      "expiring within two weeks",
      "expiring later this month",
      "expiring in month+"
    );
    let date = new Date();

    // create lists of each
    for (let i = 0; i < sortCategoryList.length; i++) {
      let sortName = sortCategoryList[i];
      inventory[sortName] = [];
    }
    // add items into the list
    for (let i = 0; i < props.data.length; i++) {
      let item = props.data[i];
      let curr = new Date(props.data[i].expiration_date); // current item's date of expiration
      let dateDiff = Math.trunc((curr - date) / (1000 * 3600 * 24)); // finding date diff

      // finding the right sort
      let sortName = "";
      if (dateDiff < 0) sortName = "expired";
      else if (dateDiff == 0) sortName = "expiring today";
      else if (dateDiff <= 2) sortName = "expiring the next two days";
      else if (dateDiff <= 14) sortName = "expiring within two weeks";
      else if (dateDiff <= 30) sortName = "expiring later this month";
      else sortName = "expiring in month+";

      // pushing it into inventory!
      inventory[sortName].push(item);
    }
  } else if (sort == "quantity") {
    let quantitySort = props.data;
    quantitySort.sort(function (b, a) {
      return b.quantity - a.quantity;
    });
    sortCategoryList.push("quantity");
    inventory["quantity"] = [];
    for (let i = 0; i < quantitySort.length; i++) {
      inventory["quantity"].push(quantitySort[i]);
    }
  }

  // now produce it onto the inventory
  const [selectedItems, setSelectedItems] = React.useState([]);
  const getSelected = contact => selectedItems.includes(contact.id);

  function handlePress(item) {
    if (selectedItems.includes(item.slug)) {
      const newListItems = selectedItems.filter(listItem => listItem !== item.slug);
      setSelectedItems([...newListItems]);
    } else {
      setSelectedItems([...selectedItems, item.slug]);
    }

    if (!props.foodArray.includes(item)) {
      //checking weather array contain the id
      props.foodArray.push(item); //adding to array because value doesnt exists
    } else {
      props.foodArray.splice(props.foodArray.indexOf(item), 1); //deleting
    }
  }

  const ListItem = ({ item, selected, onPress }) => {
    return(
    <TouchableOpacity
      onPress={() => onPress(item)}
      key={item.name + "_item"}
      style={selectedItems.includes(item.name) ? styles.itemClicked : styles.item}
    >
      <Text style={{ fontSize: 20 }} key={item.name + "_item_text"}>
        {item.name}
      </Text>
      <View style={styles.item_info} key={item.name + "_item_info"}>
        <View style={styles.info_container} key={item.name + "_ctnr_quantity"}>
          <Text
            style={styles.item_info_detail}
            key={item.name + "_ctnr_quantity_count"}
          >
            {item.quantity}
          </Text>
          <Text
            style={styles.item_info_title}
            key={item.name + "_ctnr_quantity_text"}
          >
            quantity
          </Text>
        </View>
        <View style={styles.info_container} key={item.name + "_ctnr_exp_date"}>
          <Text
            style={styles.item_info_detail}
            key={item.name + "_ctnr_exp_date_date"}
          >
            {item.expiration_date}
          </Text>
          <Text
            style={styles.item_info_title}
            key={item.name + "_ctnr_exp_date_text"}
          >
            expiration date
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )};

  var inventoryContainer = [];
  for (let i = 0; i < sortCategoryList.length; i++) {
    let currSort = sortCategoryList[i];
    if (inventory[currSort].length > 0) {
      inventoryContainer.push(
        <Text style={styles.category_title} key={"sort_" + currSort}>
          {currSort}
        </Text>
      );
      var items = [];
      inventoryContainer.push(
        <FlatList
          data={inventory[currSort]}
          renderItem={({ item }) => {
            return (
            <ListItem 
              onPress={() => handlePress(item)} 
              item={item}
              selected={getSelected(item)}
            />)
          }}
          keyExtractor={(item) => item.slug}
          scrollEnabled={false}
          numColumns={2}
        />
      );
      inventoryContainer.push(
        <View
          style={styles.items_container}
          key={"items_container_" + currSort}
        >
          {items}
        </View>
      );
    }
  }
  return <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>{inventoryContainer}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    marginTop: "2%",
  },
  items_container: {
    paddingTop: "1%",
    paddingBottom: "3%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    margin: "1%",
    backgroundColor: "white",
    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    shadowColor: "grey",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    overflow: "hidden",
  },
  itemClicked: {
    margin: "1%",
    backgroundColor: "white",
    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#2FC6B7",
    shadowColor: "grey",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    overflow: "hidden",
  },
  category_title: {
    fontSize: 25,
    paddingTop: "2%",
  },
  item_info: {
    flexDirection: "row",
  },
  info_container: {
    alignItems: "center",
    paddingTop: "5%",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  item_info_detail: {
    backgroundColor: "#ECECEC",
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ECECEC",
    overflow: "hidden",
  },
  item_info_title: {
    fontSize: 10,
  },
  empty: {
    paddingTop: "5%",
    textAlign: "center",
    fontSize: 18,
    marginTop: 0,
    width: "100%",
  }
});

export default ItemList;

let json = [
  {
    category: "produce",
    expiration_date: "2023-03-10",
    location: "counter",
    name: "banana",
    quantity: 1,
  },
  {
    category: "meat",
    expiration_date: "2023-02-25",
    location: "freezer",
    name: "steak",
    quantity: 2,
  },
  {
    category: "produce",
    expiration_date: "2023-03-07",
    location: "fridge",
    name: "apple",
    quantity: 3,
  },
  {
    category: "dairy",
    expiration_date: "2023-03-28",
    location: "fridge",
    name: "egg",
    quantity: 6,
  },
];
