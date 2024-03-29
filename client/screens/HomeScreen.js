import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home</Text>
            <Button title="Go to Detail" onPress={() => navigation.navigate("Detail", { id: 1})} />
        </View>
    )
}

export default HomeScreen;