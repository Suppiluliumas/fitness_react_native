import { View, Button, Text, Image, Alert } from "react-native";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { Camera } from "expo-camera";
import firebaseConfig from "../../Firebase_config.js";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getBlob,
  getDownloadURL,
} from "firebase/storage";

export default function Food_camera() {
  const [hasCameraPermission, setPermission] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const camera = useRef(null);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  useEffect(() => {
    const askCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    };

    askCameraPermission();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({ base64: true });
      setPhotoName(photo.uri);
    }
  };
  const handleSave = async () => {
    try {
      const storageRef = ref(storage, "images/" + new Date().getTime());

      // Käytetään uria/photoName ja muutetaan se blob muotoon
      const response = await fetch(photoName);
      const blob = await response.blob();
      //Ladataan blob tiedosto storageen /images polkuun
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        Alert.alert("Photo added successfully");
      });
    } catch (error) {
      Alert.alert("Error adding photo:", error.message);
    }
  };
  console.log(hasCameraPermission);
  return (
    <View style={{ flex: 1 }}>
      {hasCameraPermission ? (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={camera}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button title="Take Photo" onPress={takePhoto} />
            </View>
          </Camera>
          {photoName && (
            <View style={{ flex: 1 }}>
              <Text>Photo Preview:</Text>
              <Image style={{ flex: 1 }} source={{ uri: photoName }} />
              <Button title="Save" onPress={handleSave} />
            </View>
          )}
        </View>
      ) : (
        <Text>No access to camera</Text>
      )}
    </View>
  );
}
