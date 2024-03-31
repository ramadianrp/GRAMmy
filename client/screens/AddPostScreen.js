import { View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";


const ADDPOST = gql`
    mutation CreatePost($content: String!, $tags: [String], $imgUrl: String) {
    createPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
    authorId
    username
    content
    tags
    imgUrl
    likes {
      username
      createdAt
      updatedAt
    }
    comments {
      content
      username
      createdAt
      updatedAt
    }

}
}

`

function CreatePost() {
    const navigation = useNavigation();

    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [imgUrl, setImgUrl] = useState("");

    const [addPost, { data, loading, error }] = useMutation(ADDPOST);

    async function handleSubmit() {
        try {
            await addPost({
                variables: {
                    content,
                    tags,
                    imgUrl
                }
            })
            navigation.navigate("Home");
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

            <TextInput
                placeholder="Tags"
                onChangeText={setTags}
                value={tags}
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
                placeholder="imgUrl"
                onChangeText={setImgUrl}
                value={imgUrl}
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
                    title="Post"
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
                        POST
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default CreatePost;