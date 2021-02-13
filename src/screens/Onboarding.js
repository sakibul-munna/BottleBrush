import React from 'react';
import { View, Image} from "react-native";
import { ImageBackground, StyleSheet, StatusBar} from 'react-native';
import {Dimensions} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');


export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        
          <View>
          <Image style={styles.bg} source={require('./../../assets/bg1.jpg')} /> 
          </View>

        
        <View>
        
        <Image style={styles.tinyLogo} source={require('./../../assets/logo.png')} />
        </View>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 1 }}>
            <Block style={styles.text}>
              <Block>
                <Text style={styles.text} color="white" size={40}>Welcome</Text>
              </Block>
              <Block >
                <Text style={styles.text} color="white" size={30}>to</Text>
              </Block>
              <Text size={50} style={styles.text} color= "#de3358">
                BottleBrush
              </Text>
              <Text></Text>
              <Text size={14} fontWeight= 'light' style={styles.text} color= "white">
                An app only made for IUTians
              </Text>
            </Block>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                // color={'blue'}
                onPress={() => navigation.navigate('SignIn')}>
                LET'S START
              </Button>
            </Block>
          </Block>
        </Block>
      
      </Block>
    );
  };};

const styles = StyleSheet.create({

  text:{
    fontStyle:"italic",
    textAlign: 'center',

  },

  padded: {
    marginVertical: 10,
    paddingHorizontal: theme.SIZES.BASE * .7,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },

  tinyLogo:{
    width: 152,
    height: 152,
    alignSelf: "center",
    marginTop:90,
    marginBottom:40,
},

  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  bg: {
    zIndex: -2,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
