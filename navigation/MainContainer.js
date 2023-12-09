import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Exercise Screens
import ExerciseScreen from "./exerciseScreens/ExerciseScreen";

import HomeScreen from "./exerciseScreens/HomeScreen";
import ExerciseDiary from "./exerciseScreens/ExerciseDiary";
import ExercisePrograms from "./exerciseScreens/ExercisePrograms";
import ChooseProgramPart from "./exerciseScreens/ChooseProgramPart";
import DoExercise from "./exerciseScreens/DoExercise";
import SpecificDiary from "./exerciseScreens/SpecificDiary";
import DiaryList from "./exerciseScreens/DiaryList";
//Food Screens
import FoodScreen from "./foodScreens/FoodScreen";
import RecipeSearch from "./foodScreens/RecipeSearch";
import FoodDiary from "./foodScreens/FoodDiary";
import Food_camera from "./components/Food_camera";
import FoodDiaryList from "./foodScreens/FoodDiaryList";
//Tab names
const homeName = "Home";
const exercisesName = "Exercises";
const foodsName = "Foods";

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
        <Stack.Screen name="ExercisePrograms" component={ExercisePrograms} />
        <Stack.Screen name="ChooseProgramPart" component={ChooseProgramPart} />
        <Stack.Screen name="DoExercise" component={DoExercise} />
        <Stack.Screen name="SpecificDiary" component={SpecificDiary} />
        <Stack.Screen name="DiaryList" component={DiaryList} />
        <Stack.Screen name="RecipeSearch" component={RecipeSearch} />
        <Stack.Screen name="FoodDiary" component={FoodDiary} />
        <Stack.Screen name="Food_camera" component={Food_camera} />
        <Stack.Screen name="FoodDiaryList" component={FoodDiaryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
