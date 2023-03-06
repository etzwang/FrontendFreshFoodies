import React, { useState } from 'react';  
import { View, Text, StyleSheet, TextInput } from "react-native";
import Button from "../components/Button.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState(null)
  const navigation = useNavigation();

  const login = () => {
    if (userEmail == null) {
      alert("Please enter an email.")
      return;
    }
    AsyncStorage.setItem('user_email', userEmail);
    navigation.navigate("Home")
  }

  return (
    <View style={styles.page}>
    <Text style={styles.title}>BEEP</Text>
    <View style={styles.form}>
      <TextInput
        value={userEmail}
        onChangeText={(userEmail) => setUserEmail(userEmail)}
        placeholder={'Your Email'}
        style={styles.input}
      />
      <Button
        onPress={login}
        title="Login"
        color="#2FC6B7"
      />
      <Text style={{ padding: "10%" }}>or</Text>
      <Button
        onPress={() => navigation.navigate("Home")}
        title="Demo"
        color="#2FC6B7"
      />
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
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
});

export default LoginScreen;
