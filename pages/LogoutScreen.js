import * as React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from "react-native";
import Button from "./components/Button.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import Title from "../assets/title.svg";
import Groceries from "../assets/groceries.svg"
import Basket from "../assets/basket.svg"

const LogoutScreen = () => {
  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.removeItem("user_email")
    navigation.push("Login")
  }

  const leaveSharedFridge = () => {
    // DAVID NEED TO CALL API THAT LEAVES THE FRIDGE
    alert('Leave Shared fridge called!')
    navigation.navigate("HouseBasket")
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Looking Glass</Text>
      <View style={styles.form}>
        <ScrollView showsVerticalScrollIndicator={false}  style={styles.scrollForm}>
          <View style={[styles.introPage, {}]}>
            <ImageBackground source={require("../assets/intro_background.png")} resizeMode="cover" style={styles.image}>
            <Title/>
            </ImageBackground>
          </View>

          <View style={[styles.introPage, {height: Dimensions.get('window').height * (0.7)}]}>
            <View style={[styles.textBox, {marginBottom: Dimensions.get('window').height * (0.05)}]}>
              <Text style={styles.headerText}>Track your</Text>
              <Text style={styles.headerText}>groceries</Text>
            </View>
            <Groceries width={150}/>
            <View style={styles.textBox}>
              <Text style={styles.footerText}>Record the quantities</Text>
              <Text style={styles.footerText}>and expiration dates</Text>
              <Text style={styles.footerText}>of your food items</Text>
            </View>
          </View>

          <View style={[styles.introPage, {height: Dimensions.get('window').height * (0.7)}]}>
            <View style={[styles.textBox, {marginBottom: Dimensions.get('window').height * (0.05)}]}>
              <Text style={styles.headerText}>Create a</Text>
              <Text style={styles.headerText}>shared fridge</Text>
            </View>
            <Basket width={150}/>
            <View style={[styles.textBox, {marginTop: Dimensions.get('window').height * (0.02)}]}>
              <Text style={styles.footerText}>Do you have any roommates?</Text>
              <Text style={styles.footerText}>Offer up any extra or</Text>
              <Text style={styles.footerText}>unused groceries to the</Text>
              <Text style={styles.footerText}>"shared fridge"</Text>
            </View>
          </View>

          <View style={styles.introPage}>
            <View style={styles.textBox}>
              <Button onPress={leaveSharedFridge} title="Leave Shared Fridge" color="#ADEBE7"/>
            </View>
            <View style={styles.textBox}>
              <Button onPress={logout} title="Logout" color="#2FC6B7" />
            </View>
          </View>
        </ScrollView>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    backgroundColor: "#FFFFFF"
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: "100%"
  },
  introPage: {
    width: "100%",
    height: Dimensions.get('window').height * (0.8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    // borderWidth: 1,
  },
  scrollForm: {
    width: "100%",
    height: "87.5%",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    backgroundColor: "#FFFFFF"
  },
  headerText: {
    fontSize: 50,
    fontWeight: "500"
  },
  footerText: {
    fontSize: 25,
  },
  textBox: {
    width: "75%",
    // backgroundColor: "blue",
    height: Dimensions.get('window').height * (0.2),
    alignItems: "center",
    justifyContent: "center",
  }
});

export default LogoutScreen;