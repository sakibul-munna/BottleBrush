import './fixtimerbug';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./src/screens/HomeScreen";
import NotificationScreen from "./src/screens/NotificationScreen"
import ProfileScreen from "./src/screens/ProfileScreen";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";
import CreatePostScreen from "./src/screens/CreatePostScreen";
import Onboarding from "./src/screens/Onboarding";
import MessageScreen from "./src/screens/MessageScreen";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVUxY6_EbssrY1_je-oCP-0V9mVOX2vkM",
  authDomain: "bottle-brush.firebaseapp.com",
  databaseURL: "https://bottle-brush-default-rtdb.firebaseio.com",
  projectId: "bottle-brush",
  storageBucket: "bottle-brush.appspot.com",
  messagingSenderId: "280286938121",
  appId: "1:280286938121:web:a2b4403b6e3833202564d8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const AuthStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator drawerContentOptions={{activeTintColor: '#de3358'}}>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} options={{ headerShown: false }} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </AppDrawer.Navigator>
  );
};

const HomePostStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="PostDetailsScreen" component={PostDetailsScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home" barStyle={{ backgroundColor: '#de3358'}}>
      <HomeTab.Screen
        name="Home"
        component={HomePostStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
                <AntDesign name="home" color="white" size={22} />
              ),
          headerShown: false
        }}
      />
      <HomeTab.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{
          tabBarLabel: "Create Post",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="pencil-plus" size={26} color="white" />
            ) : (
              <MaterialCommunityIcons name="pencil-plus-outline" size={26} color="white" />
              ),
          headerShown: false
        }}
      />
            <HomeTab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
                <Ionicons
                  name="ios-notifications-outline"
                  size={22}
                  color="white"
                />
              ),
          headerShown: false
        }}
      />
    </HomeTab.Navigator>
  );
};

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Onboarding">
      <AuthStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
