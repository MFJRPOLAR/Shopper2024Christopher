import React, {useState} from 'react';
import {View, Text, Pressable, SafeAreaView, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import bcrypt from 'react-native-bcrypt';
import { openDatabase } from 'react-native-sqlite-storage';
const shopperDB = openDatabase({name: 'Shopper.db'});
const userTableName = 'users'; 

const HomeScreen = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityTextEntry, setSecurityTextEntry] = useState(true);

  const onIconPress = () => {
    setSecurityTextEntry(!securityTextEntry);
  };

  const onSubmit = () => {
    if (!username || !password){
      Alert.alert('Invalid Input', 'Username and password are required');
      return;
    }

    shopperDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${userTableName} WHERE username = "${username}"`,
        [],
        (_,res) => {
          let user = res.rows.length; 
          if (user==0){
            Alert.alert('Invalid User', 'Username is invalid!');
            return;
          } else {
            let item = res.rows.item(0);
            let isPasswordCorrect = bcrypt.compareSync(password, item.password);
            if (!isPasswordCorrect){
              Alert.alert('Invalid User', 'Password is invalid!');
              return;
            }

            if (user != 0 && isPasswordCorrect){
              navigation.navigate('Start Shopping!');
            }
          }
        },
        error => {
          console.log('Error getting user ' + error.message);
        }
      );
    });
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome to Shopper
        </Text>
        <TextInput
          placeholder='Enter Username'
          placeholderTextColor='grey'
          value={username}
          autoCapitalize='none'
          onChangeText={setUsername}
          style={{
            color: 'black',
            fontSize: 16,
            width: '100%',
            marginVertical: 15,
            borderColor: 'lightgrey',
            borderBottomWidth: 1.0,
            paddingTop: 100, 
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 1.0,
            borderColor: 'lightgrey',
            marginVertical: 15,
          }}
        >
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor='grey'
            value={password}
            autoCapitalize='none'
            onChangeText={setPassword}
            secureTextEntry = {securityTextEntry}
            style = {{
              color: 'black',
              fontSize: 16,
              width: '100%',
              flex: 1,
            }}
          />
          <TouchableOpacity onPress={onIconPress}>
              {securityTextEntry === true ? (
                <Entypo name="eye" size={20} />
              ) : (
                <Entypo name="eye-with-line" size={20} />
              )

              }
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          onPress={() => onSubmit()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;