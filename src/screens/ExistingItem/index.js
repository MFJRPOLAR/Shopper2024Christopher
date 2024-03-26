import React, {useState} from 'react';
import styles from './styles';
import { View, Text, TextInput, Pressable, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';

// import openDatabase hook 
import { openDatabase } from 'react-native-sqlite-storage'

// create constatn object that refers to database 
const shopperDB = openDatabase({name: 'Shopper.db'});

// create constant that contains the name of the lists table 
const itemsTableName = 'items';

const ExistingItemScreen = props => {

    const post = props.route.params.post;

    const [name, setName] = useState(post.name);
    const [price, setPrice] = useState(post.price);
    const [quantity, setQuantity] = useState(post.quantity);


    const navigation = useNavigation();

    const onListUpdate = () => {
        if (!name){
            alert('Please enter a item name.');
            return;
        }
        if (!price){
          alert('Please enter a item price.');
          return;
        }
        if (!quantity){
          alert('Please enter a item quantity.');
          return;
        }
        shopperDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${itemsTableName} SET name = "${name}", price = "${price}", quantity = "${quantity}" WHERE id = "${post.id}"`,
                [],
                () => {
                    console.log(`${name} update successfully`);
                },
                error => {
                    console.log('Error on updating list ' + error.message);
                }
            );
        });

        alert(name + ' updated!');
    }

    const onListDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this list?',
            // code for buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        shopperDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${itemsTableName} WHERE id= ${post.id}`,
                                [],
                                () => {
                                    console.log(`${name} deleted successfully`);
                                },
                                error => {
                                    console.log('Error on deleting list '+ error.message);
                                }
                            );
                        });
                        alert('Item Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
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
            value={price.toString()}
            onChangeText={value => setPrice(value)}
            style={styles.name}
            placeholder={'Enter Price'}
            placeholderTextColor={'grey'}
        />
        <TextInput
            value={quantity.toString()}
            onChangeText={value => setQuantity(value)}
            style={styles.name}
            placeholder={'Enter Quantity'}
            placeholderTextColor={'grey'}
        />
      </View>
      <View style={styles.bottomContainer}>
          <Pressable style={styles.updateButton} onPress={onListUpdate}>
              <Text style={styles.buttonText}>Update</Text>
          </Pressable>
      </View>
      <View style={styles.bottomContainer}>
          <Pressable style={styles.deleteButton} onPress={onListDelete}>
              <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
      </View>
    </View>
  );
};

export default ExistingItemScreen;