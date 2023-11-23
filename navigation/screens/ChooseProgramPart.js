import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import firebaseConfig from "../../Firebase_config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
export default function ChooseProgramPart({ navigation }) {
  const route = useRoute();
  const { programName } = route.params;
  const [programExercises, setExercisePrograms] = useState([]);

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
    <View style={styles.container}>
      {programExercises.length > 0 ? (
        <FlatList
          data={programExercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("DoExercise", {
                    programName: programName,
                    programPartName: item,
                  })
                }
              >
                <Text style={styles.buttonText}>{item}</Text>
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

const styles = StyleSheet.create({
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20, // Add marginBottom for space between buttons
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
