import * as React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getUserFridgeIds,
  addOrRemoveFoodFromFridge,
} from "./utils/HttpUtils.js";


const DeleteSingleItemScreen = ({ route }) => {
  const [name, setName] = React.useState(null);
  const navigation = useNavigation();

  let item = route.params.item
  console.log("item: " + JSON.stringify(item))

  async function confirm() {
    const fridgeIds = await getUserFridgeIds();
    let id = route.params.isPersonalFridge ? fridgeIds[0] : fridgeIds[1]
    await addOrRemoveFoodFromFridge(id, [item.slug], "remove");
    navigation.goBack()
  }
  async function cancel() {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Are you sure you want to delete?</Text>
      <Text style={styles.itemProps}>Name: { item.slug }</Text>
      <Text style={styles.itemProps}>Quantity: { item.quantity }</Text>
      <Text style={styles.itemProps}>Category: { item.category }</Text>
      <Text style={styles.itemProps}>Location: { item.location }</Text>
      <View style={styles.buttonFlex}>
        <TouchableOpacity style={styles.btn} onPress={confirm}>
          <Text style={styles.text}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={cancel}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  textInput: {
    color: 'black',
    padding: 13,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey'
  },
  btn: {
    backgroundColor: '#2FC6B7',
    justifyContent: "center",
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
    padding: 10,
    margin: 20
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  buttonFlex: {
    flexDirection:"row",
    justifyContent: "center",
    marginTop: 10
  },
  itemProps: {
    fontSize: 20,
    marginLeft: "20%",
    marginTop: 10
  }
})


export default DeleteSingleItemScreen;