import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
//Screens
import ExerciseScreen from './screens/ExerciseScreen';
import FoodScreen from './screens/FoodScreen';
import HomeScreen from './screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

//Screen names
const homeName = 'Home';
const exercisesName = 'Exercises';
const foodsName = 'Foods';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused,color,size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn ===homeName) {
                        iconName = focused ? 'home': 'home-outline';
                    } else if (rn === exercisesName) {
                        iconName = focused ? 'basketball': 'basketball-outline'
                    } else if (rn === foodsName) {
                        iconName = focused ? 'fast-food' : 'fast-food-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}>
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={exercisesName} component={ExerciseScreen}/>
                <Tab.Screen name={foodsName} component={FoodScreen}/>

            </Tab.Navigator>

        </NavigationContainer>
    )
}