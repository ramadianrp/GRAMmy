import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";





const REGISTER = gql`
    mutation Register($name: String, $email: String, $username: String, $password: String) {
  register(name: $name, email: $email, username: $username, password: $password) {
    name
    email
    username
  }
}
`



function Register({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [register, { data, loading, error }] = useMutation(REGISTER, {
        onCompleted: async (data) => {
            await SecureStore.setItemAsync("accessToken", data?.register.accessToken);
            navigation.navigate("Login");
        }
    });

    async function handleSubmit() {
        try {
            await register({
                variables: {
                    name,
                    email,
                    username,
                    password
                }
            });
            navigation.navigate("Login");
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        color: 'black',
                        marginBottom: 15,
                        fontFamily: 'Helvetica',
                        fontSize: 20,
                    }}
                >
                    Register
                </Text>
            </View>
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
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
                placeholder="Full Name"
                onChangeText={setName}
                value={name}
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
                    marginBottom: 25,
                    alignItems: 'center'
                }}
            />


            <View>
                <TouchableOpacity
                    title="Register"
                    onPress={handleSubmit}
                    style={{
                        backgroundColor: 'blue',
                        padding: 10,
                        borderRadius: 5,
                        margin: 5
                    }}

                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 15,
                        }}
                    >
                        Register
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
                        margin: 50
                    }}
                >
                    Kalo udah daftar otomatis lo setuju sama peraturan kita boss. gausah protes
                </Text>
                <Button
                    title="Already have an account? Login here"
                    onPress={() => {
                        navigation.navigate("Login")
                    }}
                />
            </View>

        </View>


    );
}

export default Register;