import React, { useState, useEffect, useRef } from "react";
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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { LICENCES } from "@/src/screens/Drivers/Scene/utils/constants";

import { styles } from "./styles";

type LicenceItem = {
  slug: string;
  name: string;
};

type SearchableLicenceModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (licenceName: string) => void;
  selectedItems?: string[];
};

export const SearchableLicenceModal = (props: SearchableLicenceModalProps) => {
  const { visible, onDismiss, onSelect, selectedItems = [] } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLicences, setFilteredLicences] = useState<LicenceItem[]>(LICENCES);

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

      // Auto-focus input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      setSearchQuery("");
      setFilteredLicences(LICENCES);
    }
  }, [visible]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLicences(LICENCES);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = LICENCES.filter((licence) => {
      const nameMatch = licence.name.toLowerCase().includes(query);
      const slugMatch = licence.slug.toLowerCase().includes(query);
      return nameMatch || slugMatch;
    });

    setFilteredLicences(filtered);
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

  const handleSelect = (licence: LicenceItem) => {
    onSelect(licence.name);
    handleDismiss();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <Text style={styles.licenceName}>{text}</Text>;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <Text style={styles.licenceName}>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={index} style={styles.highlightedText}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const renderLicenceItem = ({ item }: { item: LicenceItem }) => {
    const isSelected = selectedItems.includes(item.slug);

    return (
      <TouchableOpacity
        style={[styles.licenceItem, isSelected && styles.licenceItemSelected]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.licenceContent}>
          {highlightText(item.name, searchQuery)}
          <Text style={styles.licenceSlug}>({item.slug})</Text>
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
      <Text style={styles.emptyTitle}>No licences match your search</Text>
      <Text style={styles.emptySubtitle}>
        Try searching for "Class B", "A1", "PSV", etc.
      </Text>
    </View>
  );

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View style={[styles.container, { opacity: backdropOpacity }]}>
        <BlurView intensity={60} tint="dark" style={styles.blurView}>
          <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.7)" />
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
              <Text style={styles.headerTitle}>Select Licence</Text>
              <TouchableOpacity
                onPress={handleDismiss}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={28} color={Colors.darkCharcoalGrey} />
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
                placeholder="Search your licence (e.g. Class B, A1, PSV…)"
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
                  <Ionicons name="close-circle" size={20} color={Colors.mediumGrey} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Licences List */}
          <FlatList
            data={filteredLicences}
            keyExtractor={(item) => item.slug}
            renderItem={renderLicenceItem}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.listContent,
              filteredLicences.length === 0 && styles.listContentEmpty,
            ]}
          />
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};
