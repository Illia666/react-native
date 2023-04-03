import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

import RegistrationScreen from "./.expo/Screens/RegistrationScreen";
import LoginScreen from "./.expo/Screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen></RegistrationScreen>
      {/* <LoginScreen></LoginScreen> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});