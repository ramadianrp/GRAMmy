import { View, Text, Button, ActivityIndicator } from "react-native";
import PostCard from "../components/Card"
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { gql, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

export const POSTNEWER = gql`
    query PostsNewer {
    postsNewer {
    _id
    username
    content
    imgUrl
    authorId
    tags
    createdAt
    updatedAt
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
  }
}
`

const USER_PROFILE = gql`
  query Users {
  users {
    _id
    email
    name
    username
    followers {
      _id
      followingId
      followerId
    }
    followings {
      _id
      followerId
      followingId
    }
  }
}
`;

function HomeScreen({ navigation }) {
    const { loading: loading2, error: error2, data: data2, refetch: refetch2 } = useQuery(USER_PROFILE);
    const { loading, error, data, refetch } = useQuery(POSTNEWER, {
        notifyOnNetworkStatusChange: true
    });

    const [refreshing, setRefreshing] = useState(false)
    let flag = false

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        await refetch2()
        flag = false
        setRefreshing(false);
    };

    let user = data2?.myProfile;

    if (loading || loading2) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator
                    size="large" />
            </View>
        );
    }

    if (error || error2) {
        return <Text>Error: {error.message}</Text>;
    }


    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            {data.postsNewer.map((post, index) => (
                <PostCard key={index} post={post} flag={flag} user={user} refetch={refetch} id={post._id} navigate={navigation.navigate} />
            ))}
        </ScrollView>
    );
}

export default HomeScreen;
