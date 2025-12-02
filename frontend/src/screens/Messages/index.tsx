import React, { useState } from "react";
import { View, Pressable, FlatList } from "react-native";
import { Text } from "react-native-paper";

import { isEmpty } from "lodash";

import { NoData } from "@/src/components/NoData";
import { SearchComponent } from "@/src/components/searchBar";
import { Spinner } from "@/src/components/elements/Spinner";
import { useCustomQuery } from "@/src/useQueryContext";

import { Message } from "./message";
import { styles } from "./styles/index";
import { useMessages } from "./MessagesProvider";

const TABS = ["All"];

export const MessagesScreen = () => {
  const [activeTab, setActiveTab] = useState(1);

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
        placeholder="Search Contacts"
        height={36}
        customStyle={{ paddingHorizontal: 15 }}
      />
      <View style={styles.tabsRow}>
        {TABS.map((tab, idx) => (
          <Pressable
            key={idx}
            style={styles.tabItem}
            onPress={() => setActiveTab(idx)}
          >
            <Text
              style={[styles.tabText, activeTab === idx && styles.tabActive]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
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
        />
      )}
    </View>
  );
};
