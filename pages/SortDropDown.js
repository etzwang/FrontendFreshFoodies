import * as React from "react";
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome, SolidIcons } from 'react-native-fontawesome';

const SortDropDown = (props) => {
  const [selected, setSelected] = React.useState("");
  console.log("in sortdropdown: " + selected + " hehe");
  // console.log("done");
  return (
    <View >
      <SelectDropdown 
        data={props.sort}
        setSelected={props.setSelected}
        onSelect={props.setSelected}
        defaultValue={props.sort[0]}
        buttonStyle={styles.buttonDropdown}
        dropdownStyle={styles.dropdown3DropdownStyle}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDropdown: {
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3DropdownStyle: {
    backgroundColor: 'white',
    borderBottomColor: '#444',
    height: 200,
  }
})

export default SortDropDown;