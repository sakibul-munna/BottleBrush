import React, { useState } from "react";
import { StyleSheet, View, } from "react-native";
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
                    <Card>
                        <Card.Title style={styles.textStyle}>Sign In to BottleBrush</Card.Title>
                        <Card.Divider />
                        <Input
                            leftIcon={<MaterialCommunityIcons name="email-edit" size={24} color="black" />}
                            placeholder='E-mail Address'
                            onChangeText={
                                function (currentInput) {
                                    setEmail(currentInput);
                                }
                            }
                        />

                        <Input
                            leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={
                                function (currentInput) {
                                    setPassword(currentInput);
                                }
                            }
                        />
                        <Button
                            style={styles.buttonStyle}
                            icon={<AntDesign name="login" size={24} color="black" />}
                            title='    Sign In'
                            type='solid'
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
                            style={styles.buttonStyle}
                            icon={<AntDesign name="user" size={24} color="black" />}
                            title="    Don't Have an Account?"
                            type='clear'
                            onPress={
                                function () {
                                    props.navigation.navigate("SignUp");
                                }
                            }

                        />
                    </Card>
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
        buttonStyle: {
            padding: 10,
            margin: 10,
        }
    }
);

export default SignIn;