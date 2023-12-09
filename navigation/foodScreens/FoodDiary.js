import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native";
export default function FoodDiary({navigation}) {
  return (
    <View style={{flex:1,alignContent:"space-around"}}>
      <Button title="Open Camera" onPress={() => navigation.navigate("Food_camera")}>
        <Text>Food Camera</Text>
      </Button>
      <Button title="List of Food photos" onPress={() => navigation.navigate("FoodDiaryList")}>
        <Text>Food Camera</Text>
      </Button>
    </View>
  );
}
