import * as React from 'react';
import {View, Text} from 'react-native';
import { StyleSheet } from 'react-native';
export default function HomeScreen({navigation}) {

    return (
        <View style={styles.container}>
          
         <Text>
            This is Homescreen!
         </Text>
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