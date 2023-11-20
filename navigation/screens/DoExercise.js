import React, { useState, useEffect } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot,serverTimestamp,push, set } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
export default function DoExercise() {
  const route = useRoute();
  const { programName } = route.params;
  const { programPartName } = route.params;
  const [exercises, setExercises] = useState({});
  const [diaryEntry, setDiaryEntry] = useState({ reps: '', sets: '', weight: '' });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const programExercisesRef = ref(
      db,
      `exercisePrograms/${programName}/${programPartName}/`
    );
    get(programExercisesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Saliohjelman osan treenit
          Object.keys(data);
          console.log(data);
          setExercises(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLogEntry = (props) => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const diaryRef = ref(
      db,
      `exerciseDiary/${programName}/${programPartName}/${props.item.name}/`
    );
    const entryData = {
      reps: diaryEntry.reps,
      sets: diaryEntry.sets,
      weight: diaryEntry.weight,
      timestamp: serverTimestamp(),
    };
    push(diaryRef, entryData)
      .then(() => {
        console.log("Diary entry added successfully");
        //Tyhjentää DiaryEntry staten
        setDiaryEntry([]);
      })
      .catch((error) => {
        console.error("Error adding diary entry:", error);
      });
  };

  return (
    <View>
      <ScrollView>
        <Text>List of Exercises:</Text>
        <FlatList
          data={exercises.exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={{ color: "blue", fontWeight: "500" }}>
                {item.name}
              </Text>
              <View
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Text style={{ marginRight: 8 }}>Reps:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setDiaryEntry((prevEntry) => ({ ...prevEntry, reps: text }))}
                  placeholder={`Enter reps`}
                  keyboardType="numeric"
                />
                <Text style={{ marginRight: 8 }}>Sets:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setDiaryEntry((prevEntry) => ({ ...prevEntry, sets: text }))}
                  placeholder={`Enter sets`}
                  keyboardType="numeric"
                />
                <Text style={{ marginRight: 8 }}>Weight (kg):</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setDiaryEntry((prevEntry) => ({ ...prevEntry, weight: text }))}
                  placeholder={`Enter kg`}
                  keyboardType="numeric"
                />
              </View>
              <Button onPress={() => handleLogEntry({ item })} title="Log Entry" />
            </View>
          )}
        />
      </ScrollView>
    </View>
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
});
