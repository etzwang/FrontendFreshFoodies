import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button.js";

const ConfirmReceiptPhotoScreen = ({ route }) => {
  const [makeRequestTitle, setMakeRequestTitle] = useState("Confirm");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const makeRequest = async () => {
    setMakeRequestTitle("Loading...");
    setIsLoading(true);

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: route.params.b64,
      redirect: 'follow'
    };
    
    let res;
    try {
      res = await fetch("https://looking-glass-api.herokuapp.com/api/receipt", requestOptions)
    } catch (error) {
      console.log('error', error)
        alert(error)
    }
    res = await res.json();
    console.log(res);
    setMakeRequestTitle("Confirm");
    setIsLoading(false);
    navigation.push("ProcessReceiptPhotoScreen", { text: res.text })
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Upload items</Text>
      <View style={styles.form}>
        <Image
          style={styles.picture}
          key={route.params.b64}
          source={{ uri: `data:image/png;base64,${route.params.b64}` }}
        />
        <Button onPress={isLoading ? null : makeRequest} title={makeRequestTitle} color="#2FC6B7" />
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
    backgroundColor: "#FFFFFF",
  },
  picture: {
    width: "90%",
    height: "80%",
    marginBottom: 10
  },
  loading: {
    position: "absolute",
    zIndex: 100
  }
});

export default ConfirmReceiptPhotoScreen;
