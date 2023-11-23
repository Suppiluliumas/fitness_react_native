import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, DataSnapshot } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
export default function SpecificDiary({ navigation }) {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const route = useRoute();
  const { programName } = route.params;

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const diaryEntriesRef = ref(db, `exerciseDiary/${programName}`);

    get(diaryEntriesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Extract program parts with timestamps and flatten the result
          const programPartsArray = Object.entries(data).flatMap(
            ([programPart, programDetails]) =>
              Object.entries(programDetails).map(([exerciseId, exerciseDetails]) => ({
                programPart,
                exerciseId,
                timestamp: exerciseDetails.timestamp,
              }))
          );

          // Set the state with program parts
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
    <View style={styles.container}>
      <Text>Exercise Diary Entries:</Text>
      <FlatList
        data={diaryEntries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.buttonContainer}
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
              <Text style={styles.buttonText}>{item.programPart}</Text>
              <Text style={styles.buttonText}> Timestamp: {item.timestamp}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "yellow",
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
