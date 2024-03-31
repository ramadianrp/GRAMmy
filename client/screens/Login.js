import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Register } from "./RegisterScreen";
import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import AuthContext from "../context/auth";
import * as SecureStore from "expo-secure-store";




const LOGIN = gql`
  mutation Login($username: String, $password: String) {
  login(username: $username, password: $password) {
    accessToken
  }
}
`

function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsSignedIn } = useContext(AuthContext);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
      setIsSignedIn(true);
    }
  });

  // console.log({ data, loading, error });


  async function handleSubmit() {
    try {
      await login({ variables: { username, password } });
      navigation.navigate("Home");

    } catch (err) {
      console.log(err.message, "<<<<<< ini login");
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator 
        size="large" 
        />
      </View>
    );
  }

  // if (error) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text
  //         style={{
  //           textAlign: "center",
  //           color: "black",
  //           fontWeight: "bold",
  //           fontSize: 15,
  //           marginTop: 50
  //         }}
  //       >
  //         {error.message}
  //       </Text>
  //       <Button
  //         title="Try Again"
  //         onPress={() => {
  //           navigation.navigate("Login");
  //         }}
  //       />
  //     </View>
  //   );
  // }



  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginBottom: 15,
            fontFamily: 'Helvetica',
            // fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          Welcome!
        </Text>
      </View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={{
          height: '5%',
          borderWidth: 0.5,
          textAlign: 'center',
          alignItems: 'center',
          borderRadius: 5,
          margin: 5,
        }}
      />

      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        style={{
          height: '5%',
          borderWidth: 0.5,
          textAlign: 'center',
          borderRadius: 5,
          margin: 5,
          alignItems: 'center'
        }}
      />

      <View>
        <TouchableOpacity
          title="Login"
          // onPress={handleSubmit}
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            margin: 5
          }}

        >
          <Text
            onPress={handleSubmit}
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 50
          }}
        >
          Don't have an account? Sign up below
        </Text>
        <Button
          title="Sign up"
          onPress={() => {
            navigation.navigate("Register")
          }}
        />
      </View>

    </View>


  );
}

export default Login;