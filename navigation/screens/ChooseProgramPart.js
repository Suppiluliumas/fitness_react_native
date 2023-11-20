import { Text, View, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import firebaseConfig from "../../Firebase_config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
export default function ChooseProgramPart({navigation}) {
  const route = useRoute();
  const { programName } = route.params;
  const [programExercises, setExercisePrograms] = useState([])

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const programExercisesRef = ref(db, `exercisePrograms/${programName}`);

    get(programExercisesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Saliohjelman osat
          const programExercises = Object.keys(data);
          setExercisePrograms(programExercises);
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
      {programExercises.length > 0 ? (
        <FlatList
          data={programExercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item}</Text>
              <Button
                onPress={() =>
                  navigation.navigate("DoExercise", {
                    programName: programName,
                    programPartName: item, // Napin title parametrina
                  })
                }
                title={item}
              />
            </View>
          )}
        />
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}
