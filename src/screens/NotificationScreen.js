import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { getDataJSON } from "../functions/AsyncStorageFunction";
import { AuthContext } from "../providers/AuthProvider";
import { NotificationsCard } from "../components/NotificationsCard";
import HeaderHome from "../components/Header"
const NotificationScreen = (props) => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [currentUserNotifications, setCurrentUserNotifications] = useState([]);

  const loadNotifications = async () => {
    let not = await getDataJSON('Notifications');
    if (not != null) {
      setAllNotifications(not);
    }
    else {
      setAllNotifications([]);
    }
    console.log(allNotifications);
  }

  useEffect(() => {
    loadNotifications();
  }, []);
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
                      <HeaderHome
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
          <SafeAreaView>
            <FlatList
              data={allNotifications}
              inverted={true}
              keyExtractor={(item) => item.post_ID}
              renderItem={function ({ item }) {
                if (item.notified_user_email === auth.CurrentUser.email) {
                  return (
                    <NotificationsCard
                      creator={item.creator}
                      type={item.type}
                    />
                  );
                }
              }}
            />
          </SafeAreaView>
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
  viewStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

export default NotificationScreen;