import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { useNavigation } from "@react-navigation/native";

function Manual(props) {
  // console.log('inside manual')
  // console.log(props.navigation.setOptions)
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [date, setDate] = useState(null)

  const [locationOpen, setlocationOpen] = useState(false);
  const [locationValue, setlocationValue] = useState(null);
  const [locationItems, setlocationItems] = useState([
    {label: 'fridge', value: 'fridge'},
    {label: 'freezer', value: 'freezer'},
    {label: 'counter', value: 'counter'},
    {label: 'pantry', value: 'pantry'},
  ]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    {label: 'produce', value: 'produce'},
    {label: 'meat', value: 'meat'},
    {label: 'dairy', value: 'dairy'}
  ]);

  const navigation = useNavigation();
  const onPress = () => {
    if (name == null || quantity == null || categoryValue == null || locationValue == null || date == null) {
      console.log('must fill out everything in the form!')
    } else {
      let newItem = {
        name: name,
        category: categoryValue,
        quantity: quantity,
        expiration_date: date,
        location: locationValue
      }
      props.navigation.setOptions([...props.route.params.data, newItem]);
      navigation.navigate('Inventory')
    }
  };
  const title = 'submit';

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>form</Text>
      <Text style={styles.form}>item name:</Text>
      <TextInput 
        editable
        maxLength={40}
        value={name}
        placeholder="enter an item name..."
        onChangeText={setName}
        autoCapitalize='none'
        style={styles.textInput}
      />
      <Text style={styles.form}>quantity:</Text>
      <TextInput 
        editable
        maxLength={2}
        value={quantity}
        placeholder="enter quantity..."
        onChangeText={setQuantity}
        style={styles.textInput}
        keyboardType="numeric"
      />
      <Text style={styles.form}>expiration date:</Text>
      <DatePicker 
        date={date}
        mode="date" //The enum of date, datetime and time
        placeholder="-"
        format="YYYY-MM-DD"
        minDate={date}
        confirmBtnText="confirm"
        cancelBtnText="cancel"
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <Text style={styles.form}>category</Text>
      <View style={styles.dropdownCtner1}>
        <DropDownPicker
          open={categoryOpen}
          value={categoryValue}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setCategoryValue}
          setcategoryItems={setCategoryItems}
          placeholder="-"
          style={{
            backgroundColor: '#fafafa',
            zIndex: 10,
            position: 'relative',
            borderColor: 'grey'
          }}
          dropDownContainerStyle={{zIndex:3000}}
        />
      </View>
      <Text style={styles.form}>location</Text>
      <View style={styles.dropdownCtner2}>
        <DropDownPicker
          open={locationOpen}
          value={locationValue}
          items={locationItems}
          setOpen={setlocationOpen}
          setValue={setlocationValue}
          setcategoryItems={setlocationItems}
          placeholder="-"
          style={{
            backgroundColor: '#fafafa',
            zIndex: 0,
            position: 'relative',
            borderColor: 'grey'
          }}
          dropDownContainerStyle={{zIndex:0}}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  form: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10
  },
  textInput: {
    color: 'black',
    padding: 13,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'grey'
  },
  dropdownCtner1: {
    zIndex: 3000
  },
  dropdownCtner2: {
    zIndex: 2000
  },
  btn: {
    backgroundColor: '#2FC6B7',
    justifyContent: "center",
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
    padding: 10,
    margin: 20
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    alignSelf: "center",
  }
})

export default Manual;