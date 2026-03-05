import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MobileStatusBadge = ({ status, text }) => {
  const getStatusStyle = () => {
    const statusMap = {
      'available': styles.availableBadge,
      'rented': styles.rentedBadge,
      'maintenance': styles.maintenanceBadge,
      'overdue': styles.overdueBadge,
      'active': styles.activeBadge,
      'completed': styles.completedBadge,
      'pending': styles.pendingBadge
    };
    return statusMap[status] || styles.defaultBadge;
  };

  const getTextStyle = () => {
    const textMap = {
      'available': styles.availableText,
      'rented': styles.rentedText,
      'maintenance': styles.maintenanceText,
      'overdue': styles.overdueText,
      'active': styles.activeText,
      'completed': styles.completedText,
      'pending': styles.pendingText
    };
    return textMap[status] || styles.defaultText;
  };

  return (
    <View style={[styles.badge, getStatusStyle()]}>
      <Text style={[styles.text, getTextStyle()]}>
        {text || status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  availableBadge: {
    backgroundColor: '#c6f6d5',
  },
  availableText: {
    color: '#22543d',
  },
  rentedBadge: {
    backgroundColor: '#bee3f8',
  },
  rentedText: {
    color: '#2c5282',
  },
  maintenanceBadge: {
    backgroundColor: '#feebc8',
  },
  maintenanceText: {
    color: '#7b341e',
  },
  overdueBadge: {
    backgroundColor: '#fed7d7',
  },
  overdueText: {
    color: '#742a2a',
  },
  activeBadge: {
    backgroundColor: '#c6f6d5',
  },
  activeText: {
    color: '#22543d',
  },
  completedBadge: {
    backgroundColor: '#e9d8fd',
  },
  completedText: {
    color: '#44337a',
  },
  pendingBadge: {
    backgroundColor: '#fff3cd',
  },
  pendingText: {
    color: '#856404',
  },
  defaultBadge: {
    backgroundColor: '#e2e8f0',
  },
  defaultText: {
    color: '#4a5568',
  },
});

export default MobileStatusBadge;