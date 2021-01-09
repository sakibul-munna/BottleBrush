import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { getDataJSON } from "../functions/AsyncStorageFunction";
import { AuthContext } from "../providers/AuthProvider";
import { NotificationsCard } from "../components/NotificationsCard";
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
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <SafeAreaView style={flex = 1}>
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
  },
});

export default NotificationScreen;