import React, { useState } from "react";
import { StyleSheet, View, Image} from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "./../components/Loading";

const SignUp = (props) => {
    const [Name, setName] = useState("");
    const [IUTMailAddress, setIUTMail] = useState("");
    const [SID, setSID] = useState("");
    const [Password, setPassword] = useState("");
    const [BatchYear, setBatchYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");

    if (loading) { return <Loading /> }
    else {
        return (
            <View style={styles.viewStyle}>
                <Card>
                    <Image style={styles.tinyLogo} source={require('./../../assets/logo.png')} />
                    <Input
                        leftIcon={<MaterialIcons name="person" size={20} color="#de3358" />}
                        placeholder='Name'
                        onChangeText={
                            function (currentInput) {
                                setName(currentInput);
                            }
                        }
                    />
                    <Input
                        leftIcon={<MaterialCommunityIcons name="email-edit" size={20} color="#de3358" />}
                        placeholder='IUT E-Mail Address'
                        onChangeText={
                            function (currentInput) {
                                setIUTMail(currentInput);
                            }
                        }

                    />

                    <Input
                        leftIcon={<MaterialCommunityIcons name="school" size={20} color="#de3358" />}
                        placeholder='Student ID'
                        onChangeText={
                            function (currentInput) {
                                setSID(currentInput);
                            }
                        }
                    />


                    <Input
                        leftIcon={<FontAwesome5 name="key" size={20} color="#de3358" />}
                        placeholder='Password'
                        onChangeText={
                            function (currentInput) {
                                setPassword(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<MaterialIcons name="place" size={20} color="#de3358" />}
                        placeholder='IUT Batch Year'
                        onChangeText={
                            function (currentInput) {
                                setBatchYear(currentInput);
                            }
                        }
                    />
                    <Input
                        placeholder='Admin Reference Code'
                        onChangeText={
                            function (currentInput) {
                                setCode(currentInput);
                            }
                        }
                    />
                    <Button
                        style={styles.buttonStyle}
                        icon={<AntDesign name="user" size={20} color="white" />}
                        title='  Sign Up'
                        type='solid'
                        buttonStyle={{ backgroundColor: "#de3358" }}
                        onPress={
                            function () {
                                if (IUTMailAddress.includes("@iut-dhaka.edu")) {
                                    setIUTMail(currentInput);
                                    if (Name && IUTMailAddress && SID && Password && BatchYear && code) {
                                        setLoading(true);
                                        firebase.auth().createUserWithEmailAndPassword(IUTMailAddress, Password).then(((userCreds) => {
                                            userCreds.user.updateProfile({ displayName: Name });
                                            firebase.firestore().collection('users').doc(userCreds.user.uid).set({
                                                name: Name,
                                                email: IUTMailAddress,
                                                sId: SID,
                                                password: Password,
                                                batchYear: BatchYear,
                                                ref_code: code
                                            }).then(() => {
                                                setLoading(false);
                                                alert('Account Created Succesfully!  Firebase ID is:  ' + userCreds.user.uid);
                                                console.log(userCreds.user);
                                                props.navigation.navigate("SignIn");
                                            }).catch((error) => {
                                                alert(error)
                                            })
                                        })).catch((error) => {
                                            setLoading(false);
                                            alert(error);
                                        })
                                    } else {
                                        setLoading(false);
                                        alert("Fields cannot be empty!")
                                    }
                                }
                                else {
                                    setIUTMail("");
                                    alert("Please use an email address of IUT-Domain");
                                }
                            }
                        }
                    />
                    <Button
//                         style={styles.buttonStyle}
                        icon={<AntDesign name="login" size={20} color="black" />}
                        title="   Already Have an Account?"
                        titleStyle={{ color: "#de3358" }}
                        type='clear'
                        onPress={
                            function () {
                                props.navigation.navigate("SignIn");
                            }
                        }

                    />
                </Card>
            </View>
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
            backgroundColor: '#FFFFFF',
            // backgroundImage: "linear-gradient(to right, #b24592 , #f15f79)"
        },
        viewStyle2: {
            justifyContent: 'flex-start',
            margin: 10,
            paddingBottom: 10
        },
        
        tinyLogo:{
            width: 102,
            height: 102,
            alignSelf: "center",
            marginTop:10,
            marginBottom:40,
        },
   
        title: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
    }
);

export default SignUp;
