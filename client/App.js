import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigators/StackNavigator';
import TabNavigator from "./navigators/TabNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";



export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <TabNavigator /> */}
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
}

