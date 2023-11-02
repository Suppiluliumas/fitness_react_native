import * as React from "react";
import { View, Text, Button } from "react-native";
import { StyleSheet } from "react-native";
import ExerciseDiary from "./ExerciseDiary";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function ExerciseScreen({navigation}) {
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Here are exercise stuff</Text>
      <Button
        onPress={() => navigation.navigate('ExerciseDiary')}
        title="Go to Exercise Diary"
      />
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
