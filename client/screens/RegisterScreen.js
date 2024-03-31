import { View, Text, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";



function Register({ navigation }) {
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