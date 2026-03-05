import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const MobileCard = ({ children, onPress, variant = 'default', style }) => {
  const getVariantStyle = () => {
    switch(variant) {
      case 'primary':
        return styles.primaryCard;
      case 'warning':
        return styles.warningCard;
      case 'success':
        return styles.successCard;
      default:
        return styles.defaultCard;
    }
  };

  const CardContent = () => (
    <View style={[styles.card, getVariantStyle(), style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  defaultCard: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  primaryCard: {
    backgroundColor: '#667eea',
  },
  warningCard: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#f56565',
  },
  successCard: {
    backgroundColor: '#f0fff4',
    borderLeftWidth: 4,
    borderLeftColor: '#48bb78',
  },
});

export default MobileCard;