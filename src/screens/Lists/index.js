import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import List from '../../components/List';

// import openDatabase hook 
import { openDatabase } from 'react-native-sqlite-storage'

// create constatn object that refers to database 
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the lists table 
const listsTableName = 'lists';


const ListsScreen = props => {

  const navigation = useNavigation();

  const [lists, setlists] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare transaction that will execute SELECT
      shopperDB.transaction(txn => {
        
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${listsTableName}`, 
          [],
          //callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            // if more than one row of data was selected 
            if (len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array 
                let item = res.rows.item(i);
                if (item.priority == 'LOW') {
                  block = 'green'
                } else {
                  block = 'red'
                }
                results.push({
                  id: item.id,
                  name: item.name,
                  store: item.store,
                  priority: item.priority,
                  date: item.date,
                  color: block,
                });
              }
              // assign results array to lists state variables
              setlists(results);
            } else {
              // if no rows of data were selected 
              // assign empty array to lists state variables
              setlists([]);
            }
          },
          error => {
            console.log('Error getting lists' + error.message);
          },
        )
      });
    });
      return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
            data={lists}
            renderItem={({item}) => <List post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Double tap to add a list'
                accessibilityHint='Goes to add list Screen'
                style={styles.button}
                onPress={() => navigation.navigate('Add List')}>
                <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ListsScreen;
