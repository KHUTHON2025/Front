import { View, Text, Dimensions, ActivityIndicator, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screen/HomeScreen"
import LiveCameraScreen from "./screen/LiveCameraScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LiveCamera" component={LiveCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
