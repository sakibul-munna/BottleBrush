import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { MaterialCommunityIcons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Loading from "./../components/Loading";

const SignUp = (props) => {
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [Birthday, setBirthday] = useState("");
    const [Address, setAddress] = useState('');
    const [Work, setWork] = useState("");
    const [loading, setLoading] = useState(false);

    if (loading) { return <Loading /> }
    else {
        return (
            <View style={styles.viewStyle}>
                <Card>
                    <Card.Title style={styles.textStyle}>Welcome to SignUP Screen</Card.Title>
                    <Card.Divider />
                    <Input
                        leftIcon={<MaterialIcons name="person" size={24} color="black" />}
                        placeholder='Name'
                        onChangeText={
                            function (currentInput) {
                                setName(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<MaterialCommunityIcons name="school" size={24} color="black" />}
                        placeholder='Student ID'
                        onChangeText={
                            function (currentInput) {
                                setSID(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<MaterialCommunityIcons name="email-edit" size={24} color="black" />}
                        placeholder='E-mail'
                        onChangeText={
                            function (currentInput) {
                                setEmail(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<FontAwesome5 name="key" size={24} color="black" />}
                        placeholder='Password'
                        onChangeText={
                            function (currentInput) {
                                setPassword(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<MaterialIcons name="place" size={24} color="black" />}
                        placeholder='Address'
                        onChangeText={
                            function (currentInput) {
                                setAddress(currentInput);
                            }
                        }
                    />

                    <Input
                        leftIcon={<MaterialIcons name="work" size={24} color="black" />}
                        placeholder='Work'
                        onChangeText={
                            function (currentInput) {
                                setWork(currentInput);
                            }
                        }
                    />

                    <View>
                        <View style={styles.viewStyle2}>

                            <Button icon={<MaterialIcons name="date-range" size={24} color="black" />}
                                style={styles.buttonStyle2} type="outline" color='blue' onPress={
                                    function () {
                                        setShow(true)
                                    }} title="  Select Your Birthday" />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="calendar"
                                onChange={function (event, selectedDate) {
                                    setShow(false);
                                    setDate(selectedDate);
                                    let str = selectedDate.toString();
                                    str = str.slice(4, 16)
                                    alert(str);
                                    setBirthday(str);
                                }
                                }
                            />
                        )}
                    </View>

                    <Button
                        style={styles.buttonStyle}
                        icon={<AntDesign name="user" size={24} color="black" />}
                        title='  Sign Up'
                        type='solid'
                        onPress={
                            function () {
                                if (Name && SID && Email && Password && Birthday && Address && Work) {
                                    setLoading(true);
                                    firebase.auth().createUserWithEmailAndPassword(Email, Password).then(((userCreds) => {
                                        userCreds.user.updateProfile({ displayName: Name });
                                        firebase.firestore().collection('users').doc(userCreds.user.uid).set({
                                            name: Name,
                                            sId: SID,
                                            email: Email,
                                            password: Password,
                                            birthday: Birthday,
                                            address: Address,
                                            work: Work

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
                        }
                    />
                    <Button
                        style={styles.buttonStyle}
                        icon={<AntDesign name="login" size={24} color="black" />}
                        title="   Already Have an Account?"
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
            backgroundColor: '#f2fbff'
        },
        viewStyle2: {
            justifyContent: 'flex-start',
            margin: 10,
            paddingBottom: 10
        },
        buttonStyle: {
            padding: 10,
            margin: 10,
        },
        buttonStyle2: {
            marginRight: 100,
            borderColor: "white"
        },
        title: {
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        },
    }
);

export default SignUp;