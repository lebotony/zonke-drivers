import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";

import { isEmpty } from "lodash";

import { NoData } from "@/src/components/NoData";
import { SearchComponent } from "@/src/components/searchBar";
import { Spinner } from "@/src/components/elements/Spinner";
import { useCustomQuery } from "@/src/useQueryContext";

import { Message } from "./message";
import { styles } from "./styles/index";
import { useMessages } from "./MessagesProvider";

export const MessagesScreen = () => {
  const { getCachedData } = useCustomQuery();
  const { threads, user } = getCachedData(["threads", "user"]);

  const {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    currentThreadId,
    onSetCurrentThread,
    onSetSearchTerm,
  } = useMessages();

  if (!threads) return <Spinner />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <SearchComponent
        onChange={onSetSearchTerm}
        placeholder="Search conversations..."
        height={44}
        customStyle={{ paddingHorizontal: 20, marginBottom: 8 }}
      />
      {isEmpty(threads) ? (
        <NoData messages />
      ) : (
        <FlatList
          style={styles.messageList}
          data={threads as Thread[]}
          keyExtractor={(thread) => thread?.id}
          keyboardShouldPersistTaps="handled"
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <Message
              onSetCurrentThread={onSetCurrentThread}
              currentThreadId={currentThreadId}
              thread={item}
              user={user}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messageListContent}
        />
      )}
    </View>
  );
};
