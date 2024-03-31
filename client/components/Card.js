import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { POSTNEWER } from "../screens/HomeScreen";

const ADD_LIKE = gql`
  mutation AddLike($postId: ID!) {
  addLike(postId: $postId) {
    createdAt
    updatedAt
    username
  }
}
`;


function Card({ post, id, navigate, user, flag }) {
    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(ADD_LIKE, {
        refetchQueries: [{ query: POSTNEWER }],
    });

    // console.log('Post', toString(user));

    const toggleLike = async () => {
        try {
            await likePost({ variables: { id } });
            setLiked(!liked);
        } catch (error) {
            console.error("Error", error.message);
            Alert.alert("Error!", error.message);
        }
    };
    
    post.likes.map((item) => {
        if (item.username === user.username) {
            flag = true;
        }
    });

    return (
        <View style={styles.card}>
            <TouchableOpacity>
                <View style={styles.header}>
                    <Image
                        // source={user.picUrl}

                        style={styles.avatar}
                    />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.username}>{post.username}</Text>
                        <Text style={styles.tags}>{post.tags}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Image
                source={{
                    uri: post.imgUrl,
                }}
                style={styles.image}
            />
            <View style={styles.footer}>
                <View style={styles.caption}>
                    <TouchableOpacity onPress={toggleLike}>
                        <AntDesign
                            name={flag ? "heart" : "hearto"}
                            size={24}
                            color={flag ? "red" : "black"}
                            style={styles.iconHeart}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate("Comments", { id: post._id })}
                    >
                        <FontAwesome
                            name="commenting"
                            size={24}
                            color="black"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather
                            name="send"
                            size={24}
                            color="black"
                            style={styles.iconShare}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.count}>
                    <Text style={styles.countText}>{post.likes.length} likes</Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.description}>
                            <Text style={[styles.textFooter, { marginRight: 5 }]}>
                                {post.username}
                                {"  "}
                            </Text>
                            {post.content}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginTop: 5 }}
                        onPress={() => navigate("Comments", { id: post._id })}
                    >
                        <Text style={{ color: 'black'}}>
                            View all {post.comments.length} comments
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderColor: "#ddd",
        marginBottom: 0,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginLeft: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontWeight: "bold",
        fontSize: 14,
    },
    image: {
        width: "100%",
        height: 500,
    },
    footer: {
        padding: 10,
    },
    caption: {
        flexDirection: "row",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
        marginStart: 5,
        marginTop: -5,
    },
    iconHeart: {
        marginTop: 5,
        marginRight: 15,
    },
    icon: {
        marginRight: 15,
        fontSize: 25,
        alignItems: "center",
        alignContent: "center",
    },
    iconShare: {
        marginRight: 15,
        fontSize: 23,
        alignItems: "center",
        alignContent: "center",
        marginTop: 6,
    },
    count: {
        flexDirection: "row",
        alignItems: "center",
        fontSize: 14,
        marginBottom: 5,
        marginStart: 0,
        marginTop: -5,
    },
    countText: {
        marginTop: 5,
        marginLeft: 10,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        fontWeight: "400",
    },
    textFooter: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 14,
    },
    tags: {
        fontSize: 12,
        marginTop: 1,
        color: "black",
    },
});

export default Card;
