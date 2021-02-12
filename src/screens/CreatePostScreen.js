import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "./../components/Header";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "./../components/Loading"

const CreatePostScreen = (props) => {
    const input = React.createRef();
    const [recentPost, setRecentPost] = useState([]);
    const [loading, setLoading] = useState(false);

    if (!loading) {
        return (
            <AuthContext.Consumer>
                {(auth) => (
                    <View style={styles.viewStyle}>
                        <HeaderHome
                            DrawerFunction={() => {
                                props.navigation.toggleDrawer();
                            }}
                        />
                        <Card>
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
                            <View>
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
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Button title="Post Anonymously!" type="outline" onPress={function () {
                                    setLoading(true);
                                    firebase.firestore().collection('posts').add({
                                        userId: "Anonymous",
                                        author: "Anonymous",
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
                            </View>
                        </Card>
                    </View>
                )}
            </AuthContext.Consumer>
        );
    }
    else {
        return (
          <Loading />
        );
      }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "blue",
    },
    viewStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonStyle: {
        marginTop: 10,
        padding: 10

    }
});

export default CreatePostScreen;