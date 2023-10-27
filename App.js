import * as React from "react";
import { AppRegistry } from 'react-native';
import { Text, View } from "react-native";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet } from "react-native";
export default function App() {

  return (
   <MainContainer/>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
