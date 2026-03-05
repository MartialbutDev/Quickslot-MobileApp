import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MobileGadgetDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gadget Details Screen</Text>
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

export default MobileGadgetDetails;