import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, dbOperations } from '../database/db';
import MobileCard from './reusable/MobileCard';
import MobileStatusBadge from './reusable/MobileStatusBadge';

// Constants
const QUICK_ACTIONS = [
  { id: 'browse', icon: '📱', label: 'Browse Gadgets', screen: 'GadgetList', color: '#4299e1' },
  { id: 'rentals', icon: '📋', label: 'My Rentals', screen: 'Rentals', color: '#48bb78' },
  { id: 'profile', icon: '👤', label: 'Profile', screen: 'Profile', color: '#ed8936' },
  { id: 'support', icon: '💬', label: 'Support', screen: 'Support', color: '#9f7aea' },
];

const STATS_CONFIG = [
  { id: 'available', icon: '📦', label: 'Available', key: 'availableGadgets' },
  { id: 'active', icon: '🔄', label: 'Active Rentals', key: 'activeRentals' },
  { id: 'total', icon: '📊', label: 'Total Rentals', key: 'totalRentals' },
];

const MobileDashboard = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    availableGadgets: 0,
    activeRentals: 0,
    totalRentals: 0
  });
  const [recentRentals, setRecentRentals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // Set up navigation focus listener for refresh
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user) {
        refreshDashboardData();
      }
    });

    return unsubscribe;
  }, [navigation, user]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      await loadUserData();
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('mobileUser');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        loadDashboardData(parsedUser.id);
      } else {
        navigation.replace('Login');
      }
    } catch (err) {
      console.error('Error loading user data:', err);
      throw err;
    }
  };

  const loadDashboardData = useCallback((userId) => {
    try {
      // Get stats from database operations
      const availableGadgets = dbOperations.getAvailableGadgets?.()?.length || 0;
      const activeRentals = dbOperations.getActiveRentals?.()?.length || 0;
      const totalRentals = db.rentals?.length || 0;

      setStats({
        availableGadgets,
        activeRentals,
        totalRentals
      });

      // Get user's recent rentals
      const userRentals = db.rentals
        ?.filter(r => r.userId === userId)
        ?.sort((a, b) => new Date(b.rentDate) - new Date(a.rentDate))
        ?.slice(0, 3) || [];
      
      setRecentRentals(userRentals);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard statistics');
    }
  }, []);

  const refreshDashboardData = useCallback(async () => {
    if (user) {
      loadDashboardData(user.id);
    }
  }, [user, loadDashboardData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      await loadUserData();
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('mobileUser');
              navigation.replace('Login');
            } catch (err) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  }, [navigation]);

  const navigateToScreen = useCallback((screen) => {
    navigation.navigate(screen);
  }, [navigation]);

  // Memoized values
  const welcomeMessage = useMemo(() => {
    if (!user) return '';
    const hour = new Date().getHours();
    let greeting = 'Welcome back';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    return `${greeting},`;
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadInitialData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) return null;

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={['#667eea']}
          tintColor="#667eea"
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header with logout */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{welcomeMessage}</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}> ➜]</Text>
        </TouchableOpacity>
      </View>

      {/* User info */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userBadge}>
          <Text style={styles.userType}>{user.userType}</Text>
        </View>
        <Text style={styles.userCollege}>{user.college}</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {STATS_CONFIG.map((stat) => (
          <MobileCard 
            key={stat.id} 
            variant={stat.id === 'available' ? 'primary' : 'default'}
            style={styles.statCard}
          >
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <View style={styles.statInfo}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stats[stat.key]}</Text>
              </View>
            </View>
          </MobileCard>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              onPress={() => navigateToScreen(action.screen)}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Rentals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Rentals</Text>
          <TouchableOpacity 
            onPress={() => navigateToScreen('Rentals')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {recentRentals.length > 0 ? (
          recentRentals.map((rental) => (
            <TouchableOpacity
              key={rental.id}
              onPress={() => navigation.navigate('RentalDetails', { rentalId: rental.id })}
            >
              <MobileCard style={styles.rentalCard}>
                <View style={styles.rentalItem}>
                  <View style={styles.rentalInfo}>
                    <Text style={styles.rentalName} numberOfLines={1}>
                      {rental.gadgetName}
                    </Text>
                    <Text style={styles.rentalDate}>
                      {new Date(rental.rentDate).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                  <MobileStatusBadge status={rental.status} />
                </View>
              </MobileCard>
            </TouchableOpacity>
          ))
        ) : (
          <MobileCard>
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📭</Text>
              <Text style={styles.emptyStateText}>
                No rentals yet. Start renting now!
              </Text>
              <TouchableOpacity 
                style={styles.browseButton}
                onPress={() => navigateToScreen('GadgetList')}
              >
                <Text style={styles.browseButtonText}>Browse Gadgets</Text>
              </TouchableOpacity>
            </View>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutText: {
    fontSize: 18,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userBadge: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  userType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4a5568',
  },
  userCollege: {
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
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  section: {
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '23%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 11,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '500',
  },
  rentalCard: {
    marginBottom: 8,
  },
  rentalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rentalInfo: {
    flex: 1,
    marginRight: 12,
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
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateIcon: {
    fontSize: 40,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#a0aec0',
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 12,
    color: '#718096',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#e53e3e',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MobileDashboard;