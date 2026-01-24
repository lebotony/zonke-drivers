import React, { useState, useEffect, useRef, JSX } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Pressable,
  Keyboard,
  Platform,
  StatusBar,
} from "react-native";
import { Portal, Text } from "react-native-paper";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { PLATFORM_FILTERS } from "@/src/screens/Drivers/Scene/utils/constants";

import { styles } from "./styles";

type PlatformItem = {
  value: string;
  slug: string;
  color: string;
  bgColor: string;
  icon?: JSX.Element;
  justIcon?: boolean;
};

type SearchablePlatformModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (platformValue: string) => void;
  selectedItems?: string[];
};

export const SearchablePlatformModal = (
  props: SearchablePlatformModalProps,
) => {
  const { visible, onDismiss, onSelect, selectedItems = [] } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlatforms, setFilteredPlatforms] =
    useState<PlatformItem[]>(PLATFORM_FILTERS);

  const slideAnim = useRef(new Animated.Value(800)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 11,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      setSearchQuery("");
      setFilteredPlatforms(PLATFORM_FILTERS);
    }
  }, [visible]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPlatforms(PLATFORM_FILTERS);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = PLATFORM_FILTERS.filter((platform) => {
      const nameMatch = platform.slug.toLowerCase().includes(query);
      const valueMatch = platform.value.toLowerCase().includes(query);
      return nameMatch || valueMatch;
    });

    setFilteredPlatforms(filtered);
  }, [searchQuery]);

  const handleDismiss = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 800,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  const handleSelect = (platform: PlatformItem) => {
    onSelect(platform.value);
    handleDismiss();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <Text style={styles.platformName}>{text}</Text>;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <Text style={styles.platformName}>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={index} style={styles.highlightedText}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          ),
        )}
      </Text>
    );
  };

  const renderPlatformItem = ({ item }: { item: PlatformItem }) => {
    const isSelected = selectedItems.includes(item.value);

    return (
      <TouchableOpacity
        style={[styles.platformItem, isSelected && styles.platformItemSelected]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.platformContent}>
          <View
            style={[styles.platformBadge, { backgroundColor: item.bgColor }]}
          >
            {item.icon ? (
              <View style={styles.platformIconWrapper}>{item.icon}</View>
            ) : (
              <Text style={[styles.platformBadgeText, { color: item.color }]}>
                {item.slug.charAt(0)}
              </Text>
            )}
          </View>
          <View style={styles.platformInfo}>
            {highlightText(item.slug, searchQuery)}
            <Text style={styles.platformValue}>@{item.value}</Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={22} color={Colors.mrDBlue} />
        )}
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search-outline" size={64} color={Colors.mediumGrey} />
      <Text style={styles.emptyTitle}>No platforms match your search</Text>
      <Text style={styles.emptySubtitle}>
        Try searching for "Uber", "Bolt", "DoorDash", etc.
      </Text>
    </View>
  );

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View style={[styles.container, { opacity: backdropOpacity }]}>
        <BlurView intensity={60} tint="dark" style={styles.blurView}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0,0,0,0.7)"
          />
          <Pressable style={styles.backdrop} onPress={handleDismiss} />
        </BlurView>

        <Animated.View
          style={[
            styles.modalWrapper,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.dragIndicator} />
            </View>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Select Platform</Text>
              <TouchableOpacity
                onPress={handleDismiss}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="close"
                  size={28}
                  color={Colors.darkCharcoalGrey}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Ionicons
                name="search"
                size={20}
                color={Colors.mediumGrey}
                style={styles.searchIcon}
              />
              <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder="Search platform (e.g. Uber, Bolt, DoorDash…)"
                placeholderTextColor={Colors.mediumGrey}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={handleClearSearch}
                  style={styles.clearButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={Colors.mediumGrey}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Platforms List */}
          <FlatList
            data={filteredPlatforms}
            keyExtractor={(item) => item.value}
            renderItem={renderPlatformItem}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.listContent,
              filteredPlatforms.length === 0 && styles.listContentEmpty,
            ]}
          />
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};
