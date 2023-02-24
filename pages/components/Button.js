import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const App = ({ onPress, title, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
        backgroundColor: color,
        borderRadius: 20,
        width: 271,
        height: 75,
        justifyContent: "center",
        // paddingVertical: 18,
        // paddingHorizontal: 30,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 2,  
        elevation: 5
      }}>
        <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
    alignSelf: "center",
  }
});

export default App;
