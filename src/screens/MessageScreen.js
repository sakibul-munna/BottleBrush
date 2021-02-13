import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import {Dimensions} from 'react-native';

const MessageScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar style={styles.search}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
const styles = StyleSheet.create({
    search:{
        position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: "cover",
    justifyContent: "center"

    },
    });

export default MessageScreen;
