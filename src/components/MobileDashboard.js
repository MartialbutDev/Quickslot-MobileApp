import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, dbOperations } from '../database/db';
import MobileCard from './reusable/MobileCard';
import MobileStatusBadge from './reusable/MobileStatusBadge';

const MobileDashboard = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    availableGadgets: 0,
    activeRentals: 0,
    totalRentals: 0
  });
  const [recentRentals, setRecentRentals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await AsyncStorage.getItem('mobileUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadDashboardData(parsedUser.id);
    } else {
      navigation.replace('Login');
    }
  };

  const loadDashboardData = (userId) => {
    setStats({
      availableGadgets: dbOperations.getAvailableGadgets().length,
      activeRentals: dbOperations.getActiveRentals().length,
      totalRentals: db.rentals.length
    });

    const userRentals = db.rentals
      .filter(r => r.userId === userId)
      .slice(-3)
      .reverse();
    
    setRecentRentals(userRentals);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const quickActions = [
    { icon: '📱', label: 'Browse Gadgets', screen: 'GadgetList', color: '#4299e1' },
    { icon: '📋', label: 'My Rentals', screen: 'Rentals', color: '#48bb78' },
    { icon: '👤', label: 'Profile', screen: 'Profile', color: '#ed8936' },
  ];

  if (!user) return null;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userType}>{user.userType} • {user.college}</Text>
      </View>

      <View style={styles.statsGrid}>
        <MobileCard variant="primary" style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📦</Text>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Available</Text>
              <Text style={styles.statValue}>{stats.availableGadgets}</Text>
            </View>
          </View>
        </MobileCard>

        <MobileCard style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔄</Text>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Active Rentals</Text>
              <Text style={styles.statValue}>{stats.activeRentals}</Text>
            </View>
          </View>
        </MobileCard>

        <MobileCard style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📊</Text>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Total</Text>
              <Text style={styles.statValue}>{stats.totalRentals}</Text>
            </View>
          </View>
        </MobileCard>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.recentRentals}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Rentals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Rentals')}>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        {recentRentals.length > 0 ? (
          recentRentals.map(rental => (
            <MobileCard key={rental.id}>
              <View style={styles.rentalItem}>
                <View style={styles.rentalInfo}>
                  <Text style={styles.rentalName}>{rental.gadgetName}</Text>
                  <Text style={styles.rentalDate}>
                    Rented: {new Date(rental.rentDate).toLocaleDateString()}
                  </Text>
                </View>
                <MobileStatusBadge status={rental.status} />
              </View>
            </MobileCard>
          ))
        ) : (
          <MobileCard>
            <Text style={styles.emptyText}>No rentals yet. Start renting now!</Text>
          </MobileCard>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  userType: {
    fontSize: 14,
    color: '#718096',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statInfo: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    color: '#667eea',
    fontSize: 14,
  },
  rentalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rentalInfo: {
    flex: 1,
  },
  rentalName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  rentalDate: {
    fontSize: 12,
    color: '#718096',
  },
  emptyText: {
    textAlign: 'center',
    color: '#a0aec0',
    padding: 16,
  },
});

export default MobileDashboard;