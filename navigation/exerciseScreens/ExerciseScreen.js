import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export default function ExerciseScreen({ navigation }) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Here are exercise stuff</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ExerciseDiary")}
          style={styles.touchable}
        >
          <Text style={styles.text}>Go to Exercise Diary</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ExercisePrograms")}
          style={styles.touchable}
        >
          <Text style={styles.text}>Exercise Programs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Adjust the dimensions of the container to make the touchable area larger
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    backgroundColor: "yellow",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: screenWidth * 0.8, // Set width to 80% of the screen width
    alignItems: "center",
  },
  text: {
    // Text styles
    color: "black",
    fontSize: 16,
  },
});
