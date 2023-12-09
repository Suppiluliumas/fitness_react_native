import * as React from 'react';
import {View, Text} from 'react-native';
import { styles } from '../../stylesheet';
import { TouchableOpacity } from 'react-native';
export default function FoodScreen({navigation}) {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('RecipeSearch')}
        style={styles.touchable}
      >
        <Text style={styles.text}>Recipe Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('FoodDiary')}
        style={styles.touchable}
      >
        <Text style={styles.text}>Camera and Foodphotolist</Text>
      </TouchableOpacity>
    </View>
  );
}

