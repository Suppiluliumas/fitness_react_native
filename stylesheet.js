import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // Adjust the dimensions of the container to make the touchable area larger
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    backgroundColor: "yellow",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: screenWidth * 0.8, // Set width to 80% of the screen width
    alignItems: "center",
  },
  text: {
    // Text styles
    color: 'black',
    fontSize: 16,
  },
});
const diaryListStyles = StyleSheet.create({
  entryContainer: {
    marginBottom: 16,
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
  },
  entryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 5,
  },

});
export { styles, diaryListStyles}