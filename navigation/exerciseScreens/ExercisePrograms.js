import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import firebaseConfig from "../../Firebase_config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../stylesheet";
export default function ExercisePrograms({ navigation }) {
  const [exercisePrograms, setExercisePrograms] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const exerciseProgramsRef = ref(db, "exercisePrograms");

    get(exerciseProgramsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Lista nimistä
          const programNames = Object.keys(data);
          setExercisePrograms(programNames);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View>
      {exercisePrograms.length > 0 ? (
        <FlatList
          data={exercisePrograms}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity
              style={styles.touchable}
                onPress={() =>
                  navigation.navigate("ChooseProgramPart", {
                    programName: item, // Napin title parametrina
                  })
                }
                >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}
