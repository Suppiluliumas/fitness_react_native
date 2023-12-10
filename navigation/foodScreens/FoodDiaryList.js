import { FlatList, View,Text,Image,Button, Alert, TouchableOpacity } from "react-native";
import {
  getStorage,
  ref,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../Firebase_config";
import { useState,useEffect } from "react";
import { diaryListStyles } from "../../stylesheet";
import { Modal } from "react-native";
export default function FoodDiaryList() {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const [imageUrls, setImageUrls] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const listRef = ref(storage, "images/");

    listAll(listRef)
      .then(async (res) => {
        // Käy kaikki images polun tiedostot läpi
        const urls = await Promise.all(
          res.items.map(async (itemRef) => {
            try {
            // Palautetaan yksitellen jokainen dowloadUrl/kuva
              const downloadURL = await getDownloadURL(itemRef);
              return downloadURL;
            } catch (error) {
              console.error("Error getting download URL:", error);
              return null;
            }
          })
        );
        //Poistetaan nullit ja lisätään array imageUrlsiin
        setImageUrls(urls.filter((url) => url !== null));
      })
      .catch((error) => {
        console.error("Error listing items:", error);
      });
  }, [refresh]);

  const deletePhoto=(uri) => {
    // Erotellaan urista identifier numeroasarja
    const identifier = uri.match(/images%2F(\d+)\?/)[1];
    const deleteRef = ref(storage, `images/${identifier}`)
    deleteObject(deleteRef).then(() => {
        Alert.alert("Photo deleted successfully!")
        //Päivitetään sivu kun kuva on poistettu onnistuneesti muuttamalla refresh statea
        setRefresh((prevRefresh) => !prevRefresh);
    }).catch((error)=> {
        Alert.alert("Error deleting photo:", error.message);
    }) 
  }
  const openModal = (uri) => {
    setModalVisible(true);
    setSelectedImage(uri);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };
  return (
    <View>
      <FlatList
        data={imageUrls}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
            </TouchableOpacity>
            <Button title="Delete photo" onPress={() => deletePhoto(item)} />
            <View style={diaryListStyles.separator} />
          </View>
        )}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
         <View style={diaryListStyles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={diaryListStyles.enlargedImage} />
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
}
