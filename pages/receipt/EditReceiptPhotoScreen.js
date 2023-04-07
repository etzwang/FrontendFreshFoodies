import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../components/Button.js";
import { FontAwesome5 } from '@expo/vector-icons';

const EditReceiptPhotoScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false)
  const makeRequest = async () => {
    setIsLoading(true);
    console.log("making receipt request");

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: route.params.b64,
      redirect: 'follow'
    };
  
    fetch("https://looking-glass-api.herokuapp.com/api/receipt", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        alert(result);
      })
      .catch(error => console.log('error', error.message));
    setIsLoading(false);
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Upload items</Text>
      {isLoading && // DOESNT WORK
        <View style={styles.loading}>
          <FontAwesome5 name="spinner" color="black" size={30} />
        </View>
      }
      <View style={styles.form}>
        <Image
          style={styles.picture}
          key={route.params.b64}
          source={{ uri: `data:image/png;base64,${route.params.b64}` }}
        />
        <Button onPress={makeRequest} title="Confirm" color="#2FC6B7" />
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

export default EditReceiptPhotoScreen;
