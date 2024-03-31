import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";


const SEARCH = gql`
    query FindByUsername($username: String) {
    findByUsername(username: $username) {
    username
    name
    followers {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    followings {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
}

`

function SearchUser() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");

  const [findUser, { data, loading, error }] = useMutation(SEARCH);

  const handleSubmit = async () => {
    try {
      await findUser({
        variables: { username }
      });

      navigation.navigate("Profile", { username });
    } catch (error) {
      console.log(error);
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


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        placeholder="Caption"
        onChangeText={setContent}
        value={content}
        style={{
          height: '5%',
          borderWidth: 0.5,
          textAlign: 'center',
          alignItems: 'center',
          borderRadius: 5,
          margin: 5,
        }}
      />

      <View>
        <TouchableOpacity
          title="Search"
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
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

export default SearchUser;