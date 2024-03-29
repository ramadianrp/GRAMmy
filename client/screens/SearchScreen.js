import { View, Text, Button } from "react-native";



function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Page</Text>
      <Button title="Login button later" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default SearchScreen;