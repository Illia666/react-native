import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        source={require("../../assets/images/Photo%20BG.jpg")}
      >
        <View style={styles.box}>
          <View style={styles.avatarBox}>
            <View style={styles.avatar}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.img} />
              ) : (
                <View style={styles.noAvatar}></View>
              )}
              {!photo ? (
                <TouchableOpacity
                  style={styles.btnPlus}
                  activeOpacity={0.7}
                  onPress={pickImage}
                >
                  <View>
                    <Image
                      source={require("../../assets/images/add.png")}
                      style={{ width: 25, height: 25 }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ ...styles.btnPlus, left: 100, top: 70 }}
                  activeOpacity={0.7}
                  onPress={() => setPhoto(null)}
                >
                  <View>
                    <Image
                      source={require("../../assets/images/del.png")}
                      style={{ width: 40, height: 40 }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Login")}
          >
            <View style={styles.autBtn}>
              <Image
                source={require("../../assets/images/log-out.png")}
                style={{ width: 24, height: 24 }}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.userName}>Profile Screen</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  box: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    marginTop: 140,
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },
  avatarBox: {
    position: "relative",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -60,
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  noAvatar: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnPlus: {
    position: "absolute",
    top: 80,
    left: 107,
  },
  autBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userName: {
    marginTop: 92,
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
  },
});
