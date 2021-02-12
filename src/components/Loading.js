import React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
    >
      <ActivityIndicator size="large" color="black" animating={true} />
    </View>
  );
};

export default Loading;