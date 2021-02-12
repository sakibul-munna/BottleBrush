import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PostCard from "./../components/PostCard";
import HeaderHome from "./../components/Header";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "../components/Loading";

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    firebase.firestore().collection('posts').orderBy("created_at", "desc").onSnapshot((querySnapshot) => {
      let temp_posts = []
      querySnapshot.forEach((doc) => {
        temp_posts.push({
          key: doc.id,
          data: doc.data(),
        });
      });
      setPosts(temp_posts);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert(error);
    })
  };

  
  useEffect(() => {
    loadPosts();
  }, []);

  if (!loading) {
    return (
          <View style={styles.viewStyle}>
            <HeaderHome
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
            {/* {<Card>
              <Input
                ref={input}
                clearButtonMode={'always'}
                clearButtonMode={'always'}
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={
                  function (currentPost) {
                    setRecentPost(currentPost);
                  }
                }
              />
              <Button title="Post" type="outline" onPress={function () {
                setLoading(true);
                firebase.firestore().collection('posts').add({
                  userId: auth.CurrentUser.uid,
                  author: auth.CurrentUser.displayName,
                  body: recentPost,
                  created_at: "Posted On " + moment().format("DD MMM, YYYY"),
                  likes: [],
                  comments: []
                }).then(() => {
                  setLoading(false);
                  alert('Post Created Successfully!');
                }).catch((error) => {
                  setLoading(false);
                  alert(error);
                })
              }} />
            </Card> } */}
              <FlatList
                data={posts}
                renderItem={function ({ item }) {
                  
                  return (
                    <PostCard
                      post_ID={item.key}
                      author={item.data.author}
                      title={item.data.created_at}
                      body={item.data.body}
                      navigation={props.navigation}
                    />
                  );
                }}
              />
          </View>
    );
  } else {
    return (
      <Loading />
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default HomeScreen;