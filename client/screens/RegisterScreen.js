import { View, Text, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";



function Register() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginBottom: 15,
            fontFamily: 'Helvetica',
            fontWeight: 'bold',
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
        placeholder="Password"
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
            marginTop: 30
          }}
        >
          Don't have an account? Sign up below
        </Text>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>

    </View>


  );
}

export default Register;