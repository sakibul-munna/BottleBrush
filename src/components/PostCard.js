import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const PostCard = (props) => {
  let id = props.post_ID
  const [Liked, setLiked] = useState(false);
  const [LikesCount, setLikesCount] = useState(0);
  const [CommentsCount, setCommentsCount] = useState(0);


  const loadLikes = async () => {
    firebase.firestore().collection('posts').doc(id).onSnapshot(async (doc) => {
      let snap = doc.data();
      if (snap.likes !== undefined) {
        setLikesCount(snap.likes.length);
      } else {
        alert("lol");
      }
    });
  };

  const addLike = async (userid) => {
    if(Liked == false){
      firebase.firestore().collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userid)
      }).then(async () => {
        setLiked(true);
      }).catch((error) => {
        alert(error);
      });
    }else{
      firebase.firestore().collection('posts').doc(id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userid)
      }).then( async () => {
        setLiked(false);
      }).catch((error) => {
        alert(error);
      });
    }
  }
  const loadComments = async () => {
    firebase.firestore().collection('posts').doc(id).onSnapshot(async (doc) => {
      let snap = doc.data();
      if (snap.comments !== undefined) {
        setCommentsCount(snap.comments.length);
      } else {
        alert("lol");
      }
    });
  }

  useEffect(() => {
    loadComments();
    loadLikes();
  }, []);
  return (
    <AuthContext.Consumer>
      {(auth) => (
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
          <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
          <Text
            style={{
              paddingVertical: 10,
            }}
          >
            {props.body}
          </Text>
          <Card.Divider />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              type="outline"
              title={"Like (" + LikesCount + ")"}
              icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
              onPress={
                function () {
                  let newlike = {
                    "post_ID": props.post_ID,
                    "liker": auth.CurrentUser.displayName,
                    "liker_ID": auth.CurrentUser.uid,
                    "post_author": props.author
                  }
                  addLike(newlike);
                  
                  

                  /*let flag = 0;
                  if (allNotifications == undefined) {
                    flag = 1;
                  }
                  else {
                    flag = allNotifications.length + 1;
                  }
                  let newNotification = {
                    notified_user_email: props.currentUser_Email,
                    notification_ID: flag,
                    creator: auth.CurrentUser.name,
                    type: "Like",
                  }
                  if (allNotifications == undefined) {
                    setAllNotifications([newNotification]);
                    storeDataJSON('Notifications', [newNotification]);
                  } else {
                    setAllNotifications([...allNotifications, newNotification]);
                    addDataJSON('Notifications', newNotification);
                  }*/
                }
              }
            />
            <Button type="outline" title={"Comment (" + CommentsCount + ")"} onPress={
              function () {
                props.navigation.navigate("PostDetailsScreen", props.post_ID,  LikesCount);
              }
            } />
          </View>
        </Card>
      )}
    </AuthContext.Consumer>
  );
};

export default PostCard;