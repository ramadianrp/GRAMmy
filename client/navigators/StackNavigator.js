import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator()

import LoginScreen from "../screens/Login"
import HomeScreen from "../screens/HomeScreen"
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";


function StackNavigator(){
    return(
        <Stack.Navigator>
            {/* <Stack.Screen name="Login" component={LoginScreen}/> */}
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default StackNavigator;




