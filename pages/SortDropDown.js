import * as React from "react";
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome, SolidIcons } from 'react-native-fontawesome';

const SortDropDown = (props) => {
  const [selected, setSelected] = React.useState("");

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
    backgroundColor: '#ADEBE7',
    paddingHorizontal: 0,
    borderWidth: 1,
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