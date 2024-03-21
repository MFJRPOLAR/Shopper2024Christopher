import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Item from '../../components/Item/item';

// import openDatabase hook 
import { openDatabase } from 'react-native-sqlite-storage'


// create constatn object that refers to database 
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the lists table 
const itemsTableName = 'items';
const listItemsTableName = 'list_items';

const ViewListItemsScreen = props => {

  const post = props.route.params.post;
  const navigation = useNavigation();

  const [items, setitems ] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare variable to compute the total price
      let total = 0.0;
      // declare transaction that will execute SELECT
      shopperDB.transaction(txn => {
        
        // execute SELECT
        txn.executeSql(
          `SELECT items.id, name, price, quantity FROM ${itemsTableName}, ${listItemsTableName} WHERE items.id = item_id AND list_id = ${post.id}`, 
          [],
          //callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected
            let len = res.rows.length;
            // console.log('Number of rows: ' + len);
            // if more than one row of data was selected 
            if (len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array 
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                });
                // compute total price 
                total += item.price * item.quantity;
              }
              // assign results array to lists state variables
              setitems(results);
              // assign computed total price to the total price state variable
              setTotalPrice(total);
            } else {
              // if no rows of data were selected 
              // assign empty array to lists state variables
              setitems([]);
              // assign a value of 0 to the total price state variables
              setTotalPrice(0.0);
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

  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{post.name}</Text>
      </View>
    );
  }

  const ListFooter = () => {
    return(
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total Price: $ {totalPrice.toFixed(2)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        renderItem={({item}) => <Item post={item}/>}
        ListFooterComponent={ListFooter}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

export default ViewListItemsScreen;