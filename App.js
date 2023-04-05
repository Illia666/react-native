import * as React from "react";
// import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";
// import react from "react";


export default function App() {
  const routing = useRoute({});
  return <NavigationContainer>{routing}</NavigationContainer>;
}

