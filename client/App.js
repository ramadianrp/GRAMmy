import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import TabNavigator from "./navigators/TabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { GestureHandlerRootView } from "react-native-gesture-handler";



export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <GestureHandlerRootView>
          <SafeAreaView style={{ flex: 1 }}>
            <StackNavigator />
            {/* <TabNavigator /> */}
          </SafeAreaView>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ApolloProvider>
  );
}

