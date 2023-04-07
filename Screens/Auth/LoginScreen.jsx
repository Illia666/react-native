import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView,
} from "react-native";

import { Button } from "react-native-web";

const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [hidePass, setHidePass] = useState(true);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Пожалуйста, заполните все поля для ввода");
    } else {
      setError(null);
      const user = { email, password };
      setEmail("");
      setPassword("");
      navigation.navigate("Home", { screen: "DefaultScreen", params: user });
    }
  };

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
        <ImageBackground
          style={{ flex: 1, justifyContent: "flex-end" }}
          source={require("../../assets/images/Photo%20BG.jpg")}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? -200 : 0,
            }}
          >
            <Text style={styles.title}>Войти</Text>
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholder="Адрес электронной почты"
              style={styles.input}
              onFocus={onFocus}
            />
            <View>
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Пароль"
                secureTextEntry={hidePass ? true : false}
                style={styles.input}
                onFocus={onFocus}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setHidePass(!hidePass)}
                style={styles.passwordBtn}
              >
                <Text style={styles.passwordText}>Показать</Text>
              </TouchableOpacity>
            </View>
            {!!error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.7}
              onPress={onLogin}
            >
              <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.text}>Нет аккаунта? Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopEndRadius: 25,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 32,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    marginHorizontal: 16,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  text: {
    textAlign: "center",
    marginBottom: 111,
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  passwordBtn: {
    position: "absolute",
    top: 13,
    right: 34,
  },
  passwordText: {
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
  },
  error: {
    textAlign: "center",
    color: "red",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    marginTop: 10,
  },
});
