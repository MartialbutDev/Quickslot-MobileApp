import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MobileGadgetList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gadget List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  text: {
    fontSize: 20,
    color: '#1a1a2e',
  },
});

export default MobileGadgetList;