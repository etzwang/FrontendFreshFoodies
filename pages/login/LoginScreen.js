import React, { useState } from 'react';  
import { View, Text, StyleSheet, TextInput } from "react-native";
import Button from "../components/Button.js";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [userName, setUserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userPassword, setUserPassword] = useState(null)
  const navigation = useNavigation();

  const verifyFields = async () => {
    if (userName == null) {
      alert("Please enter a name.")
      return;
    }
    if (userEmail == null) {
      alert("Please enter an email.")
      return;
    }
    if (userPassword == null) {
      alert("Please enter a password.")
      return
    }
    // AsyncStorage.setItem('user_email', userEmail);
    // AsyncStorage.setItem('user_email', userPassword);
    // navigation.navigate("Home")
  }

  const sendLoginRequest = async () => {
    await verifyFields();
    // try to login with the given email + password
    console.log("making login request");

    var body = {
      email: userEmail
    }
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    console.log("request: " + JSON.stringify(requestOptions))

    var response;
    try {
      response = await fetch("https://looking-glass-api.herokuapp.com/api/login", requestOptions)
      console.log("response: " + JSON.stringify(response))
    } catch (e) {
      console.log('error', error.message)
    }

    if (response.status != 200) {
      console.log("login failed")
    }
  }

  const sendSignupRequest = async () => {
    await verifyFields();
    console.log("making signup request");

    var body = {
      name: userName,
      email: userEmail,
      password: userPassword
    }
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    };

    console.log("request: " + JSON.stringify(requestOptions))

    var response;
    try {
      response = await fetch("https://looking-glass-api.herokuapp.com/api/signup", requestOptions)
      console.log("response: " + JSON.stringify(response))
    } catch (e) {
      console.log('error', error.message)
    }

    if (response.status != 200) {
      console.log("login failed")
    }
  }

  return (
    <View style={styles.page}>
    <Text style={styles.title}>BEEP</Text>
    <View style={styles.form}>
      <TextInput
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
        placeholder={'Your Name'}
        style={styles.input}
      />
      <TextInput
        value={userEmail}
        onChangeText={(userEmail) => setUserEmail(userEmail)}
        placeholder={'Your Email'}
        style={styles.input}
      />
      <TextInput
        value={userPassword}
        onChangeText={(userPassword) => setUserPassword(userPassword)}
        placeholder={'Your Password'}
        style={styles.input}
      />
      <Button
        onPress={sendLoginRequest}
        title="Login"
        color="#2FC6B7"
      />
      <Text style={{ padding: "10%" }}>or</Text>
      <Button
        onPress={sendSignupRequest}
        title="Signup"
        color="#2FC6B7"
      />
      <Text style={{ padding: "10%" }}>PLEASE DO NOT USE A PASSWORD YOU CARE ABOUT, USE ONLY FOR TESTING</Text>
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
