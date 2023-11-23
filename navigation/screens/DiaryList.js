import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import styles from "../../stylesheet.js";
export default function DiaryList({ navigation }) {
  const route = useRoute();
  const { programName } = route.params;
  const { programPart } = route.params;
  const { exerciseId } = route.params;
  const { timestamp } = route.params;
  const [diaryEntries, setDiaryEntries] = useState();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const diaryEntriesRef = ref(
      db,
      `exerciseDiary/${programName}/${programPart}/${exerciseId}/exercises`
    );
    get(diaryEntriesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          const entriesArray = Object.entries(data).flatMap(
            ([exerciseName, exerciseData]) => ({
              exerciseName,
              reps: exerciseData.reps,
              sets: exerciseData.sets,
              weight: exerciseData.weight,
            })
          );

          setDiaryEntries(entriesArray);
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
      <FlatList
        data={diaryEntries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.exerciseName}</Text>
            <Text>Sets: {item.sets}</Text>
            <Text>Reps: {item.reps}</Text>
            <Text>Weight: {item.weight}</Text>
          </View>
        )}
      />
    </View>
  );
}
