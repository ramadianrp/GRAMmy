import { View, Text, Button } from 'react-native';

function AddPostScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Add Post Screen</Text>
            <Button title="Go Home" onPress={() => navigation.navigate("HomeScreen", { id: 2 })} />
        </View>
    )
}

export default AddPostScreen;