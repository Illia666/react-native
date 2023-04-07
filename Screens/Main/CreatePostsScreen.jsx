import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

const CreatePostsScreen = ({ navigation }) => {
  const [cameraOn, setCameraOn] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [loc, setLoc] = useState(null);
  const [hasCamPermission, setHasCamPermission] = useState(false);
  const [hasLocPermission, setHasLocPermission] = useState(false);
  const [name, setName] = useState("");
  const [place, setPlace] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const nameHandler = (text) => setName(text);
  const placeHandler = (text) => setPlace(text);

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const cameraRef = useRef();

  const cameraReady = () => {
    setCameraOn(!cameraOn);
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCamPermission(status === "granted");
      const { status: stat } =
        await Location.requestForegroundPermissionsAsync();
      setHasLocPermission(stat === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef && cameraOn) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
        cameraReady();
        let location = await Location.getCurrentPositionAsync({});

        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLoc(coords);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const savePhoto = async () => {
    if (photo) {
      try {
        await MediaLibrary.createAssetAsync(photo);
        setPhoto(null);
        Alert.alert("Фото успешно сохранено!");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCameraOn(false);
      setPhoto(result.assets[0].uri);
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLoc(coords);
    }
  };

  const sendPhoto = () => {
    if (photo && loc) {
      const post = { photo, name, place, loc };
      navigation.navigate("DefaultScreen", { post });
      setPhoto(null);
      setLoc(null);
      setName("");
      setPlace(null);
      cameraReady();
    }
  };

  const deletePhoto = () => {
    setName("");
    setPlace(null);
    setPhoto(null);
    setLoc(null);
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Posts");
          cameraReady();
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -38,
            zIndex: 100,
            paddingHorizontal: 15,
          }}
        >
          <Image
            source={require("../../assets/images/arrow-left.png")}
            style={{ width: 23, height: 23 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <ScrollView style={styles.container}>
        {cameraOn ? (
          <Camera style={styles.camera} ref={cameraRef}>
            <TouchableWithoutFeedback onPress={takePhoto}>
              <View style={styles.photoBtn}>
                <Image
                  source={require("../../assets/images/camera.png")}
                  style={{ width: 24, height: 24 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </Camera>
        ) : (
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View style={styles.photoBox}>
                <Image source={{ uri: photo }} style={styles.img} />
                {photo ? (
                  <View style={styles.btnBox}>
                    <TouchableOpacity
                      style={styles.btnOptions}
                      activeOpacity={0.7}
                      onPress={() => {
                        setPhoto(null);
                        cameraReady();
                      }}
                    >
                      <View style={styles.photoBtn}>
                        <Image
                          source={require("../../assets/images/remake.png")}
                          style={{ width: 24, height: 24 }}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnOptions}
                      activeOpacity={0.7}
                      onPress={savePhoto}
                    >
                      <View style={styles.photoBtn}>
                        <Image
                          source={require("../../assets/images/save.png")}
                          style={{ width: 24, height: 24 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.btnBox}>
                    <View style={styles.photoBtn}>
                      <Image
                        source={require("../../assets/images/camera.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </View>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        )}
        <View style={styles.uploadBox}>
          <TouchableWithoutFeedback activeOpacity={0.7} onPress={cameraReady}>
            {!cameraOn ? (
              <Text style={styles.uploadBtnText}>Включить камеру</Text>
            ) : (
              <Text style={styles.uploadBtnText}>Выключить камеру</Text>
            )}
          </TouchableWithoutFeedback>
          <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
            <Text style={styles.uploadBtnText}>Загрузите фото</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder="Название..."
            style={styles.input}
            onFocus={onFocus}
          />
          <TextInput
            value={place}
            onChangeText={placeHandler}
            placeholder="Местность..."
            style={styles.input}
            onFocus={onFocus}
          />
        </View>

        <TouchableOpacity
          style={photo ? styles.btnActive : styles.btn}
          activeOpacity={0.7}
          onPress={sendPhoto}
        >
          <Text style={photo ? styles.btnTextActive : styles.btnText}>
            Опубликовать
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delBtnBox}
          activeOpacity={0.7}
          onPress={deletePhoto}
        >
          <View
            style={
              !photo
                ? styles.delBtn
                : {
                    ...styles.delBtn,
                    borderColor: "#FF6C00",
                    borderWidth: 1,
                    backgroundColor: "#fff",
                  }
            }
          >
            <Image
              source={require("../../assets/images/delPost.png")}
              style={{ width: 24, height: 24 }}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  photoBox: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  uploadBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 26,
  },
  uploadBtnText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  photoBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  btnActive: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextActive: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 100,
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  btnBox: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnOptions: {
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  delBtnBox: {
    width: "100%",
    alignItems: "center",
    marginTop: 32,
  },
  delBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
