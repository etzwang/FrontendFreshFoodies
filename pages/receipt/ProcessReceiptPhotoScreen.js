import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FoodDictionary from "../utils/FoodDictionary";

const ProcessReceiptPhotoScreen = ({ route }) => {
    // route.params.text
    const navigation = useNavigation();

    let detected_items = route.params.text.map(v => v.toLowerCase());

    var items = []
    for (let i = 0; i < detected_items.length; i++) {
        for (const word of detected_items[i].split(/[ ,]+/)) {
            if (FoodDictionary[word] === undefined) {
                continue
            }
            items.push(
                <Text key = {i}>
                    { FoodDictionary[word] }
                </Text>
            )
        }
    }

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Detected Items</Text>
            <View style={styles.form}>
                { items }
            </View>
        </View>
      );
}

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
    }
  });

export default ProcessReceiptPhotoScreen