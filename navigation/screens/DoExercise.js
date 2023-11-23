import React, { useState, useEffect } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  serverTimestamp,
  set,
} from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { onValue } from "firebase/database";
export default function DoExercise() {
  const route = useRoute();
  const { programName } = route.params;
  const { programPartName } = route.params;
  const [exercises, setExercises] = useState([]);
  const [diaryEntry, setDiaryEntry] = useState({
    reps: "",
    sets: "",
    weight: "",
  });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const programExercisesRef = ref(
      db,
      `exercisePrograms/${programName}/${programPartName}/`
    );
    // Using a listener to get real-time updates
    const firebaseListen = onValue(programExercisesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setExercises(data.exercises);
      } else {
        console.log("No data available");
      }
    });
    return () => firebaseListen();
  }, [programName, programPartName]);

  const handleLogEntry = () => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const diaryRef = ref(
      db,
      `exerciseDiary/${programName}/${programPartName}/`
    );

    const timestamp = serverTimestamp();
    const entries = {};

    exercises.forEach((exercise) => {
      entries[exercise.name] = {
        reps: diaryEntry.reps,
        sets: diaryEntry.sets,
        weight: diaryEntry.weight,
      };
    });

    const entryData = {
      timestamp: timestamp,
      exercises: entries,
    };

    // Push the entry with all exercises under the same timestamp
    push(diaryRef, entryData)
      .then(() => {
        console.log("Diary entry added successfully");
        Alert.alert("Diary entry added successfully");
        // Clear DiaryEntry state
        setDiaryEntry({ reps: "", sets: "", weight: "" });
      })
      .catch((error) => {
        console.error("Error adding diary entry:", error);
        Alert.alert("Error adding diary entry:", error);
      });
  };

  return (
    <ScrollView>
      <Text>List of Exercises:</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View>
            <Text style={{ color: "blue", fontWeight: "500" }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Text style={{ marginRight: 8 }}>Reps:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setDiaryEntry((prevEntry) => ({ ...prevEntry, reps: text }))
                }
                placeholder={`Enter reps`}
                keyboardType="numeric"
              />
              <Text style={{ marginRight: 8 }}>Sets:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setDiaryEntry((prevEntry) => ({ ...prevEntry, sets: text }))
                }
                placeholder={`Enter sets`}
                keyboardType="numeric"
              />
              <Text style={{ marginRight: 8 }}>Weight (kg):</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setDiaryEntry((prevEntry) => ({
                    ...prevEntry,
                    weight: text,
                  }))
                }
                placeholder={`Enter kg`}
                keyboardType="numeric"
              />
            </View>
          </View>
        )}
      />
     <Button
        title="Log exercises"
        onPress={handleLogEntry}
        style={styles.buttonContainer}
      />
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
