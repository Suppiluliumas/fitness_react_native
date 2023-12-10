import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import {diaryListStyles} from "../../stylesheet.js";
export default function DiaryList({ navigation }) {
  const route = useRoute();
  const { programName } = route.params;
  const { programPart } = route.params;
  const { exerciseId } = route.params;
  const [diaryEntries, setDiaryEntries] = useState();

  //Lasketaan yhteispaino
  const countLiftedWeight = (exerciseData) => {
    const theWeight =
      parseInt(exerciseData.reps) *
      parseInt(exerciseData.sets) *
      parseInt(exerciseData.weight);
    return theWeight;
  };
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const diaryEntriesRef = ref(
      db,
      `exerciseDiary/${programName}/${programPart}/${exerciseId}/`
    );
    get(diaryEntriesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          const entriesArray = Object.entries(data).flatMap(([key, value]) => {
            //luodaan kullekin exerciseName- ja exerciseData-parille objekti
            return Object.entries(value).map(
              ([exerciseName, exerciseData]) => ({
                exerciseName,
                reps: exerciseData.reps,
                sets: exerciseData.sets,
                weight: exerciseData.weight,
                wholeWeight: countLiftedWeight(exerciseData),
              })
            );
          });
          setDiaryEntries(entriesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={diaryEntries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={diaryListStyles.entryContainer}>
            <Text style ={diaryListStyles.entryText}>{item.exerciseName}</Text>
            <View style={diaryListStyles.separator} />
            <Text style ={diaryListStyles.entryText}>Sets: {item.sets}</Text>
            <View style={diaryListStyles.separator} />
            <Text style ={diaryListStyles.entryText}>Reps: {item.reps}</Text>
            <View style={diaryListStyles.separator} />
            <Text style ={diaryListStyles.entryText}>Weight: {item.weight}</Text>
            <View style={diaryListStyles.separator} />
            <Text style ={diaryListStyles.entryText}>Lifted Weight: {item.wholeWeight}</Text>
          </View>
        )}
      />
    </View>
  );
}
