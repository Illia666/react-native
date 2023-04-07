import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

const CommentsScreen = ({ route }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");

  const commentHandler = (text) => setComment(text);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route.params]);

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View>
            {photo && (
              <View>
                <View style={styles.imgBox}>
                  <Image style={styles.img} source={{ uri: photo }} />
                </View>
              </View>
            )}
            <Text>
              If you don't receive the locations in the emulator, you may have
              to turn off "Improve Location Accuracy" in Settings - Location in
              the emulator. This will turn off Wi-Fi location and only use GPS.
              Then you can manipulate the location with GPS data through the
              emulator. If you don't receive the locations in the emulator, you
              may have to turn off "Improve Location Accuracy" in Settings -
              Location in the emulator. This will turn off Wi-Fi location and
              only use GPS. Then you can manipulate the location with GPS data
              through the emulator. If you don't receive the locations in the
              emulator, you may have to turn off "Improve Location Accuracy" in
              Settings - Location in the emulator. This will turn off Wi-Fi
              location and only use GPS. Then you can manipulate the location
              with GPS data through the emulator.
            </Text>

            <TextInput
              value={comment}
              onChangeText={commentHandler}
              placeholder="Комментировать..."
              style={
                !isShowKeyboard
                  ? styles.input
                  : { ...styles.input, marginBottom: 160 }
              }
              onFocus={onFocus}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 60,
  },
  imgBox: {
    height: 240,
    marginBottom: 8,
    marginBottom: 32,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },

  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
});
