
import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import TabNavigator from "./navigators/TabNavigator";



export default function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      <StackNavigator />
    </NavigationContainer>
  );
}

