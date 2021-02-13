import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "./../components/Loading";


const SignIn = (props) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    if (loading) { return <Loading /> }
    else {
        return (
            <AuthContext.Consumer>
                {(auth) => (<View style={styles.viewStyle}>
                    <View style={styles.viewStyle}>
                        <Card>
                            <Image style={styles.tinyLogo} source={require('./../../assets/logo.png')} />
                            <Input
                                leftIcon={<MaterialCommunityIcons name="email-edit" size={20} color="#de3358" />}
                                placeholder='IUT E-mail Address'
                                onChangeText={
                                    function (currentInput) {
                                        setEmail(currentInput);
                                    }
                                }
                            />
                            <Input
                                leftIcon={<FontAwesome5 name="key" size={20} color="#de3358" />}
                                placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={
                                    function (currentInput) {
                                        setPassword(currentInput);
                                    }
                                }
                            />
                            <Button
                                //                             style={styles.buttonStyle}
                                icon={<AntDesign name="login" size={24} color="white" />}
                                title='    Sign In'
                                type='solid'
                                buttonStyle={{ backgroundColor: "#de3358" }}
                                onPress={async function () {
                                    setLoading(true)
                                    firebase
                                        .auth()
                                        .signInWithEmailAndPassword(Email, Password)
                                        .then((userCreds) => {
                                            setLoading(false)
                                            auth.setIsLoggedIn(true);
                                            auth.setCurrentUser(userCreds.user);
                                        })
                                        .catch((error) => {
                                            setLoading(false)
                                            alert(error);
                                        });
                                }}
                            />
                            <Button
                                //                             style={styles.buttonStyle}
                                icon={<AntDesign name="user" size={24} color="#de3358" />}
                                title="    Don't Have an Account?"
                                titleStyle={{ color: "#de3358" }}
                                type='clear'
                                onPress={
                                    function () {
                                        props.navigation.navigate("SignUp");
                                    }
                                }

                            />
                        </Card>
                    </View>
                </View>)}
            </AuthContext.Consumer>
        );
    }
}

const styles = StyleSheet.create(
    {
        textStyle: {
            fontSize: 30,
            color: "black"
        },
        viewStyle: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white'
        },
        tinyLogo: {
            width: 102,
            height: 102,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 40,
        },
        //         buttonStyle: {
        //             padding: 10,
        //             margin: 10,
        //         }
    }
);

export default SignIn;
