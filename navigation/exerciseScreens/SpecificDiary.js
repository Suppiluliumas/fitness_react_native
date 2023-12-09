import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {styles} from "../../stylesheet.js";
import ConvertTime from "../components/ConvertTime.js";
export default function SpecificDiary({ navigation }) {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const route = useRoute();
  const { programName } = route.params;
  //Convert firebasetimestamp to readable date
 
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const diaryEntriesRef = ref(db, `exerciseDiary/${programName}`);

    get(diaryEntriesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Extract program parts with timestamps
          const programPartsArray = Object.entries(data).flatMap(
            ([programPart, programDetails]) =>
              Object.entries(programDetails).map(
                ([exerciseId, exerciseDetails]) => ({
                  programPart,
                  exerciseId,
                  timestamp: ConvertTime(exerciseDetails.timestamp),
                })
              )
          );

          // Set the state with program parts
          console.log(programPartsArray);
          setDiaryEntries(programPartsArray);
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
      <FlatList
        data={diaryEntries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() =>
              navigation.navigate("DiaryList", {
                programName: programName,
                programPart: item.programPart,
                exerciseId: item.exerciseId,
                timestamp: item.timestamp,
              })
            }
          >
            <View style={styles.container}>
              <Text style={styles.text}>{item.programPart}</Text>
              <Text style={styles.text}>{item.timestamp}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

