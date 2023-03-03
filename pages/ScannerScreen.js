import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./components/Button.js";
import { useNavigation } from "@react-navigation/native";

const ScannerScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload items</Text>
      <View style={styles.form}>
        <Button onPress={{}} title="Scan Receipt" color="#2FC6B7" />
        <Text style={{ padding: "10%" }}>or</Text>
        <Button
          onPress={() => navigation.navigate("Manual")}
          title="Manually Enter"
          color="#ADEBE7"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderTopEndRadius: "35px",
    borderTopStartRadius: "35px",
    backgroundColor: "#FFFFFF",
  },
});

export default ScannerScreen;
