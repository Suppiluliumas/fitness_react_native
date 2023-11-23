import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import ExerciseDiary from "./ExerciseDiary";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function ExerciseScreen({navigation}) {
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Here are exercise stuff</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ExerciseDiary')}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Go to Exercise Diary</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ExercisePrograms')}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Exercise Programs</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

