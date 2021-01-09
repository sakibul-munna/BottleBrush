import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { removeData } from "../functions/AsyncStorageFunction";

const CommentCard = (props) => {
    return (
        <Card>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Avatar
                    containerStyle={{ backgroundColor: "#ffab91" }}
                    rounded
                    icon={{ name: "user", type: "font-awesome", color: "black" }}
                    activeOpacity={1}
                />
                <Text h4Style={{ padding: 10 }} h4>
                    {props.author}
                </Text>
            </View>
            <Text style={{ fontStyle: "italic" }}> {props.time}</Text>
            <Text
                style={{
                    paddingVertical: 10,
                }}
            >
                {props.body}
            </Text>
            <Card.Divider />
        </Card>
    );
};

export default CommentCard;