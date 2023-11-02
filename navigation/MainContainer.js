import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import ExerciseScreen from "./screens/ExerciseScreen";
import FoodScreen from "./screens/FoodScreen";
import HomeScreen from "./screens/HomeScreen";
import ExerciseDiary from "./screens/ExerciseDiary";

//Screen names
const homeName = "Home";
const exercisesName = "Exercises";
const foodsName = "Foods";
const exerciseDiary = "ExerciseDiary";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Exercises") {
            iconName = focused ? "basketball" : "basketball-outline";
          } else if (route.name === "Foods") {
            iconName = focused ? "fast-food" : "fast-food-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={exercisesName} component={ExerciseScreen} />
      <Tab.Screen name={foodsName} component={FoodScreen} />
    </Tab.Navigator>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ExerciseDiary" component={ExerciseDiary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
