import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Colors } from '../utils/colors';
import HomeScreen from '../screens/HomeScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

interface TabNavigatorProps {
  onLogout?: () => void;
}

// Minimalist icon components
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{
      width: size * 0.6,
      height: size * 0.6,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 4,
      backgroundColor: 'transparent',
    }} />
    <View style={{
      position: 'absolute',
      width: size * 0.3,
      height: size * 0.3,
      backgroundColor: color,
      borderRadius: 2,
    }} />
  </View>
);

const PaymentIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{
      width: size * 0.8,
      height: size * 0.5,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 4,
      backgroundColor: 'transparent',
    }} />
    <View style={{
      position: 'absolute',
      width: size * 0.4,
      height: 2,
      backgroundColor: color,
      top: size * 0.25 - 1,
    }} />
  </View>
);

const BenefitsIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{
      width: size * 0.6,
      height: size * 0.6,
      borderWidth: 2,
      borderColor: color,
      borderRadius: size * 0.3,
      backgroundColor: 'transparent',
    }} />
    <View style={{
      position: 'absolute',
      width: size * 0.2,
      height: size * 0.2,
      backgroundColor: color,
      borderRadius: size * 0.1,
    }} />
  </View>
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{
      width: size * 0.6,
      height: size * 0.6,
      borderWidth: 2,
      borderColor: color,
      borderRadius: size * 0.3,
      backgroundColor: 'transparent',
    }} />
    <View style={{
      position: 'absolute',
      width: size * 0.3,
      height: 2,
      backgroundColor: color,
      borderRadius: 1,
    }} />
    <View style={{
      position: 'absolute',
      width: 2,
      height: size * 0.3,
      backgroundColor: color,
      borderRadius: 1,
    }} />
  </View>
);

const TabNavigator: React.FC<TabNavigatorProps> = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundCard,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 12,
          shadowColor: Colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PaymentIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Benefits"
        component={BenefitsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BenefitsIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} size={size} />
          ),
        }}
      >
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
