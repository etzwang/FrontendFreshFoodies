import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function OfferUpItemList(props) {
  // create inventory
  let inventory = {};
  let sortCategoryList = [];
  let sort = props.sort ? props.sort : "Category"; // if props sort is undefined - default is category

  if (sort == "Category" || sort == "Location") {
    // create the lists of each
    for (let i = 0; i < props[sort].length; i++) {
      let sortName = props[sort][i];
      sortCategoryList.push(sortName);
      inventory[sortName] = [];
    }

    // var data = AsyncStorage.getItem("data");
    // add the items into the lists
    for (let i = 0; i < props.data.length; i++) {
      let item = props.data[i];
      inventory[item[sort]].push(item);
    }
  } else if (sort == "Expiration_date") {
    sortCategoryList.push(
      "Expired",
      "Expiring today",
      "Expiring the next two days",
      "Expiring within two weeks",
      "Expiring later this month",
      "Expiring in month+"
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
      if (dateDiff < 0) sortName = "Expired";
      else if (dateDiff == 0) sortName = "Expiring today";
      else if (dateDiff <= 2) sortName = "Expiring the next two days";
      else if (dateDiff <= 14) sortName = "Expiring within two weeks";
      else if (dateDiff <= 30) sortName = "Expiring later this month";
      else sortName = "Expiring in month+";

      // pushing it into inventory!
      inventory[sortName].push(item);
    }
  } else if (sort == "quantity") {
    let quantitySort = props.data;
    quantitySort.sort(function (b, a) {
      return b.quantity - a.quantity;
    });
    sortCategoryList.push("Quantity");
    inventory["Quantity"] = [];
    for (let i = 0; i < quantitySort.length; i++) {
      inventory["Quantity"].push(quantitySort[i]);
    }
  }

  // now produce it onto the inventory
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
      for (let j = 0; j < inventory[currSort].length; j++) {
        let currItem = inventory[currSort][j].name;

        const [clicked, setClicked] = useState(false);

        function handlePress(currItem) {
          if (!props.foodArray.includes(currItem)) {
            //checking weather array contain the id
            props.foodArray.push(currItem); //adding to array because value doesnt exists
          } else {
            props.foodArray.splice(props.foodArray.indexOf(currItem), 1); //deleting
          }
          // props.foodArray.push(currItem);
          console.log(props.foodArray);
          setClicked((current) => !current);
        }

        items.push(
          <TouchableOpacity
            onPress={() => handlePress(inventory[currSort][j])}
            key={currItem + "_item"}
            style={{
              margin: "1%",
              backgroundColor: "white",
              width: "48%",
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: clicked ? 3 : 1,
              borderRadius: 10,
              borderColor: clicked ? "#2FC6B7" : "grey",
              shadowColor: "grey",
              shadowOpacity: 0.8,
              shadowRadius: 4,
              shadowOffset: {
                height: 1,
                width: 1,
              },
            }}
          >
            <Text style={{ fontSize: 20 }} key={currItem + "_item_text"}>
              {currItem}
            </Text>
            <View style={styles.item_info} key={currItem + "_item_info"}>
              <View
                style={styles.info_container}
                key={currItem + "_ctnr_quantity"}
              >
                <Text
                  style={styles.item_info_detail}
                  key={currItem + "_ctnr_quantity_count"}
                >
                  {inventory[currSort][j].quantity}
                </Text>
                <Text
                  style={styles.item_info_title}
                  key={currItem + "_ctnr_quantity_text"}
                >
                  quantity
                </Text>
              </View>
              <View
                style={styles.info_container}
                key={currItem + "_ctnr_exp_date"}
              >
                <Text
                  style={styles.item_info_detail}
                  key={currItem + "_ctnr_exp_date_date"}
                >
                  {inventory[currSort][j].expiration_date}
                </Text>
                <Text
                  style={styles.item_info_title}
                  key={currItem + "_ctnr_exp_date_text"}
                >
                  expiration date
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
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

  if (inventoryContainer.length == 0) {
    inventoryContainer.push(
      <Text style={styles.empty} key={0}>
        It looks like your {props.basket} is empty.
      </Text>
    );
    inventoryContainer.push(
      <Text style={styles.empty} key={1}>
        {props.details}
      </Text>
    );
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
  },
});

export default OfferUpItemList;
