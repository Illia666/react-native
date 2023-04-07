import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../Nested/DefaultScreenPosts";
import CommentsScreen from "../Nested/CommentsScreen";
import MapScreen from "../Nested/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: "#E8E8E8",
          backgroundColor: "#FFFFFF",
        },
        headerTitleStyle: {
          textAlign: "center",
          fontFamily: "Roboto-Bold",
          fontSize: 17,
        },
      }}
    >
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Комментарии" }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
