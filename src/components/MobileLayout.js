import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MobileLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
});

export default MobileLayout;