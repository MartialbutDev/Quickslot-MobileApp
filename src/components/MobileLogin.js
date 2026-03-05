import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { dbOperations } from '../database/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MobileButton from './reusable/MobileButton';

const MobileLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate network delay
    setTimeout(async () => {
      const user = dbOperations.authenticateUser(email);

      if (user) {
        // Store user data
        await AsyncStorage.setItem('mobileUser', JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          college: user.college,
          idNumber: user.idNumber
        }));
        
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Login Failed', 'Invalid email or account not active');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/Quickslot.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
              {/* <Text style={styles.subtitle}>SEARCH. RENT. POWER UP.</Text> */}
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@ustp.edu.ph"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <MobileButton
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.loginButton}
              />

              <Text style={styles.footerText}>
                Use your USTP email to login
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 1,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 12,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#718096',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default MobileLogin;