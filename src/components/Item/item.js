import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const database = require('../Handlers/database.js');

const Item = props => {

    const post = props.post;

    //console.log(post);

    const navigation = useNavigation();

    const onPress = () => {
        if (post.list_id){
            try{
                database.addListItem(post.list_id, post.id)
            }catch(error){
                console.log('Error adding list item' + error)
            }
            alert('Item added to list!')
        }else{
            console.log(post.name)
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 3}}>
                <Text style={styles.name} numberOfLines={1}>Item Name: {post.name}</Text>
                <Text style={styles.price} numberOfLines={1}>Price: ${post.price}</Text>
            </View>
            <View style={{flex:2}}>
                <Text style={styles.quantity}>Quantity: {post.quantity}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Item;