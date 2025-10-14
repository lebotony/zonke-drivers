import { View, Image as RNImage, SafeAreaView, ScrollView } from "react-native"
import { Text } from "react-native-paper"

import { styles } from "./styles"
import { PostCard } from "./ui/postCard"


export const PostsComponent = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.headerTilte}>Posts</Text>
                </View>

                <ScrollView style={styles.mainSection} showsVerticalScrollIndicator={false}>
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </ScrollView>
        </SafeAreaView>
    )
}