import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import firebaseConfig from "../../Firebase_config";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";

export default function ExerciseDiary() {
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const exercisesRef = ref(db, "/");

    get(exercisesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setExercises(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ScrollView>
      <View>
        {exercises ? (
          <View>
            <Text>Data from Firebase:</Text>
            <Text>{JSON.stringify(exercises, null, 2)}</Text>
          </View>
        ) : (
          <Text>Loading data...</Text>
        )}
      </View>
    </ScrollView>
  );
}
