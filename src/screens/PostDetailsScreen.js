import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, } from "react-native";
import { Card, Button, Text, Avatar, ActivityIndicator, Input, Header, SafeAreaView } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import { storeDataJSON, addDataJSON, getDataJSON } from '../functions/AsyncStorageFunction';
import CommentCard from "../components/CommentCard";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "./../components/Loading"
import HeaderHome from "./../components/Header"

const PostDetailsScreen = (props) => {
    let info = props.route.params;
    const [currentComment, setcurrentComment] = useState('');
    const [Post, setPost] = useState({});
    const [postComments, setPostComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const input = React.createRef();

    const loadPostandComments = async (postId) => {
        firebase.firestore().collection('posts').doc(info).onSnapshot((doc) => {
            let snap = doc.data();
            setPost(snap);
            setPostComments(snap.comments)
        });
        console.log("Post e ki ache ? " + Post.likes.length);
    }

    useEffect(() => {
        setLoading(true);
        loadPostandComments();
        setLoading(false);
    }, []);
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
                        <Card style={styles.cardStyle}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    containerStyle={{ backgroundColor: "#ffab91" }}
                                    rounded
                                    icon={{ name: "user", type: "font-awesome", color: "#de3358" }}
                                    activeOpacity={1}
                                />
                                <Text h4Style={{ padding: 10 }} h4>
                                    {Post.author}
                                </Text>
                            </View>
                            <Text style={{ fontStyle: "italic" }}> {Post.created_at}</Text>
                            <Text
                                style={{
                                    paddingVertical: 10,
                                }}
                            >
                                {Post.body}
                            </Text>
                        </Card>
                        <Card.Divider />
                        <Input
                            ref={input}
                            clearButtonMode={'always'}
                            placeholder="  Write Something!"
                            leftIcon={<Entypo name="pencil" size={24} color="#de3358" />}
                            style={styles.inputStyle}
                            multiline={true}
                            onChangeText={
                                function (comment) {
                                    setcurrentComment(comment);
                                }
                            }
                        />
                        <View style={styles.buttonStyle}>
                            <Button title="Comment" 
                            titleStyle={{ color: "#de3358" }}
                            color="#de3358" type="outline" onPress={
                                function () {
                                    setLoading(true);
                                    if(currentComment != ""){
                                        let comment = {
                                            "author" : auth.CurrentUser.displayName,
                                            "comment_body": currentComment,
                                            "commentor_id": auth.CurrentUser.uid,
                                            "post_ID": info,
                                            "created_at": "Commented On " + moment().format("DD MMM, YYYY"),
                                        }
                                        firebase.firestore().collection('posts').doc(info).update({
                                            comments: firebase.firestore.FieldValue.arrayUnion(comment)
                                        }).then(()=>{
                                            
                                        });
                                    }else{
                                        alert("Comment is empty!");
                                    }
                                    input.current.clear();
                                    setcurrentComment('');
                                    setLoading(false);
                                }
                            }
                            />
                        </View>
                        <FlatList
                            data={postComments}
                            scrollsToTop={true}
                            keyExtractor={(item) => item.comment_ID}
                            renderItem={function ({ item }) {
                                return (
                                    <CommentCard
                                        author={item.author}
                                        time={item.created_at}
                                        body={item.comment_body}
                                    />
                                );
                            }}
                        />
                    </View>
                )}
            </AuthContext.Consumer>
        )
    }
    else {
        return (
            <Loading />
        );
    }

}
const styles = StyleSheet.create({
    textstyle: {
        margin: 10,
        marginLeft: 20,
        paddingBottom: 10,
        fontSize: 36,
    },
    buttonStyle: {
        paddingTop: 5,
        marginLeft: 100,
        marginRight: 100,
        fontSize: 20,
    },
    inputStyle: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 2
    },
    view2Style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewStyle: {
        flex: 1,
    },
    mainviewStyle: {
        flex: 1,
        borderRadius: 10,
        borderBottomWidth: 20,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderColor: 'transparent',
    },
});


export default PostDetailsScreen;
