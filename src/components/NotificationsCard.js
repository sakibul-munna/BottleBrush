import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";


const NotificationsCard = (props) => {
  let str = props.creator + " " + type + " your post.";
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar
              containerStyle={{ backgroundColor: "cyan" }}
              rounded
              icon={<MaterialIcons name="notifications" size={24} color="black" />}
              activeOpacity={1}
            />
            <Text style={{ paddingHorizontal: 10 }}>
              {str}
            </Text>
          </View>
        </Card>
      )}
    </AuthContext.Consumer>
  )

}

export default NotificationsCard;