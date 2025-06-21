import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import store from './store';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import Dashboard from './screens/Dashboard';
import ReflectionScreen from './screens/ReflectionScreen';
import PointsScreen from './screens/PointsScreen';
import RewardsScreen from './screens/RewardsScreen';
import ProgressScreen from './screens/ProgressScreen';
import MoodUpdateScreen from './screens/MoodUpdateScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Reflect" component={ReflectionScreen} />
              <Stack.Screen name="Points" component={PointsScreen} />
              <Stack.Screen name="Rewards" component={RewardsScreen} />
              <Stack.Screen name="Progress" component={ProgressScreen} />
              <Stack.Screen name="Mood" component={MoodUpdateScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
