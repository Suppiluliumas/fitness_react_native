import * as React from 'react';
import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native';
export default function FoodScreen({navigation}) {

    return (
        <View style={styles.container}>
          
         <Text
         onPress={() => navigation.navigate('Home')}>FoodScreen</Text>
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    });