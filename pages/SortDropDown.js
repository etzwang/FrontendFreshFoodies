import * as React from "react";
import {View, Text} from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";



const SortDropDown = () => {
  const [selected, setSelected] = React.useState("");
  const data = [
    {key:'1', value:'category'},
    {key:'2', value:'expiration_date'},
    {key:'3', value:'quantity'},
    {key:'4', value:'location'},
  ];
  return (
    <View>
      <SelectList data={data} setSelected={setSelected}/>
    </View>
  )
  
}

export default SortDropDown;