import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar,} from 'react-native-elements';

const UploadPhoto=() =>{

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Permisson Needed!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!image.cancelled) {
      setPhoto(image.uri);
    }
  };
  

  return (
    <View>
      <Avatar
            size="xlarge"
            onPress={function(){
              pickImage()
            }}
            rounded 
            source={{
              uri: photo 
                 }}
                />
   </View>
  );
}

export default  UploadPhoto;