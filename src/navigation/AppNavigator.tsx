import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import DocumentVerificationScreen from '../screens/DocumentVerificationScreen';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signUpData, setSignUpData] = useState<{
    emailOrPhone: string;
    type: 'email' | 'phone';
    otpCode?: string;
    password?: string;
    phoneNumber?: string;
    country?: string;
    city?: string;
  } | null>(null);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  const handleLogin = (emailOrPhone: string, password: string) => {
    // Simulate successful login
    setIsAuthenticated(true);
  };

  const handleSignUp = (email: string, password: string, phoneNumber: string, country: string, city: string) => {
    // For now, we'll use email as the primary identifier and proceed to OTP
    setSignUpData({ 
      emailOrPhone: email, 
      type: 'email',
      password,
      phoneNumber,
      country,
      city
    });
  };

  const handleOTPVerify = (otpCode: string) => {
    if (signUpData) {
      setSignUpData({ ...signUpData, otpCode });
    }
  };

  const handleCreatePassword = (password: string) => {
    // Password created successfully, proceed to document verification
  };

  const handleDocumentVerificationComplete = () => {
    setIsAuthenticated(true);
    setSignUpData(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSignUpData(null);
  };

  const handleOTPResend = () => {
    // Simulate resending OTP
    console.log('Resending OTP...');
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Main' : 'Login'}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => (
                <LoginScreen
                  onLogin={handleLogin}
                  onNavigateToSignUp={() => navigation.navigate('SignUp')}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="SignUp">
              {({ navigation }) => (
                <SignUpScreen
                  onSignUp={handleSignUp}
                  onNavigateToLogin={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>

            {signUpData && (
              <>
                <Stack.Screen name="OTPVerification">
                  {({ navigation }) => (
                    <OTPVerificationScreen
                      emailOrPhone={signUpData.emailOrPhone}
                      type={signUpData.type}
                      onVerify={handleOTPVerify}
                      onResend={handleOTPResend}
                      onGoBack={() => navigation.goBack()}
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen name="CreatePassword">
                  {({ navigation }) => (
                    <CreatePasswordScreen
                      emailOrPhone={signUpData.emailOrPhone}
                      type={signUpData.type}
                      otpCode={signUpData.otpCode || ''}
                      onCreatePassword={handleCreatePassword}
                      onGoBack={() => navigation.goBack()}
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen name="DocumentVerification">
                  {({ navigation }) => (
                    <DocumentVerificationScreen
                      emailOrPhone={signUpData.emailOrPhone}
                      type={signUpData.type}
                      onComplete={handleDocumentVerificationComplete}
                      onGoBack={() => navigation.goBack()}
                    />
                  )}
                </Stack.Screen>
              </>
            )}
          </>
        ) : (
          <Stack.Screen name="Main">
            {() => <MainScreen onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
