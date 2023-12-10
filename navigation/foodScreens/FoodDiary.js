import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
import { styles } from "../../stylesheet";
export default function FoodDiary({navigation}) {
  return (
    <View style={{flex:1,alignContent:"space-around"}}>
      <TouchableOpacity style={styles.touchable} title="Open Camera" onPress={() => navigation.navigate("Food_camera")}>
        <Text>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} title="List of Food photos" onPress={() => navigation.navigate("FoodDiaryList")}>
        <Text>Gallery of Food photos</Text>
      </TouchableOpacity>
    </View>
  );
}
