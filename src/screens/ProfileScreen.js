import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Text, Card, Button, Avatar, Header, Icon } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { removeData } from "../functions/AsyncStorageFunction";
import UploadPhoto from "../components/UploadPhoto";
import HeaderHome from "./../components/Header";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "../components/Loading";


const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.mainViewStyle}>
            <HeaderHome
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
          <View style={styles.viewStyle2}>
          <UploadPhoto props={props} />
            <Text style={styles.textStyle2}>
              {auth.CurrentUser.displayName}
            </Text>
            <Button
              title={' Delete Profile '}
              onPress={function () {
                let key = auth.CurrentUser.email;
                removeData(key);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
                alert("Profile Deleted");
              }}
            />
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="school" type='MaterialCommunityIcons' color="#777777" size={30} />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>170042060</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" type='MaterialCommunityIcons' color="#777777" size={30} />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.email}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="place" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>Trishal</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="date-range" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.birthday}</Text>
            </View>
            <View style={styles.row}>
              <MaterialIcons name="work" size={30} color="#777777" />
              <Text style={{ fontSize: 24, color: "#777777", marginLeft: 20 }}>{auth.CurrentUser.work}</Text>
            </View>
          </View>

        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  textStyle2: {
    padding: 20,
    fontSize: 30,
    color: "#162f3e",
    fontStyle: 'normal'
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  viewStyle2: {
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
  },
  userInfoSection: {
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    margin: 10,
    padding: 10
  },
});

export default ProfileScreen;