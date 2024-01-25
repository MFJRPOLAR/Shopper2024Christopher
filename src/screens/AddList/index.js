import React, { useState } from 'react';
import { View, Text, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const databse = require('../../components/Handlers/database.js');

const AddListScreen = props => {

    const navigation = useNavigation()

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [date, setDate] = useState('');

    const onListAdd = () => {
        if (!name){
            alert('Please enter a shopping list name.');
            return;
        }
        if (!store){
          alert('Please enter a shopping list store.');
          return;
        }
        if (!date){
          alert('Please enter a shopping list date.');
          return;
        }
        try {
            databse.addList(name,store,date);
        } catch (error){
          console.log('Error adding list ' + error);
        }

        alert(name + ' Added.');
        navigation.navigate('Start Shopping!');
    }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TextInput
            value={name}
            onChangeText={value => setName(value)}
            style={styles.name}
            placeholder={'Enter Name'}
            placeholderTextColor={'grey'}
        />
        <TextInput
            value={store}
            onChangeText={value => setStore(value)}
            style={styles.store}
            placeholder={'Enter Store'}
            placeholderTextColor={'grey'}
        />
        <TextInput
            value={date}
            onChangeText={value => setDate(value)}
            style={styles.date}
            placeholder={'Enter Date in format YYYY-MM-DD'}
            placeholderTextColor={'grey'}
        />
      </View>
      <View style={styles.bottomContainer}>
          <Pressable style={styles.button} onPress={onListAdd}>
              <Text style={styles.buttonText}>Add</Text>
          </Pressable>
      </View>
    </View>
  );
};

export default AddListScreen;