import * as React from "react";
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome, SolidIcons } from 'react-native-fontawesome';
import DropDownPicker from 'react-native-dropdown-picker';


const SortDropDown = (props) => {
  console.log('sort drop down: ' + props.sortValue)
  const [sortItems, setSortItems] = React.useState([
    { label: "Category", value: "category" },
    { label: "Expiration Date", value: "expiration_date" },
    { label: "Quantity", value: "quantity" },
    { label: "Location", value: "location" },
  ]);
  const [sortOpen, setSortOpen] = React.useState(false);

  return (
    <View style={styles.main}>
      <DropDownPicker
          open={sortOpen}
          value={props.sortValue}
          items={sortItems}
          setOpen={setSortOpen}
          setValue={props.setSortValue}
          setItems={setSortItems}
          placeholder="Sort By..."
          textStyle={{
            fontSize: 16
          }}
          style={{
            backgroundColor: 'white',
            zIndex: 10,
            position: 'relative',
            borderColor: '#2FC6B7',
            borderRadius: '4',
            width: '50%',
            borderWidth: '3',
          }}
          dropDownContainerStyle={{
            zIndex:3000,
            borderRadius: '4',
            width: '50%',
            borderColor: '#2FC6B7',
            borderBottomWidth: 3,
            borderRightWidth: 3,
            borderLeftWidth: 3,
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    fontSize: '70px'
  },
  buttonDropdown: {
    backgroundColor: '#ADEBE7',
    paddingHorizontal: 0,
    borderWidth: 5,
    borderRadius: 8,
    borderColor: '#ADEBE7'
  },
  dropdown3DropdownStyle: {
    backgroundColor: '#ADEBE7',
    borderColor: 'white',
    height: 200,
    borderRadius: 8,
    borderWidth: 0,
  }
})

export default SortDropDown;