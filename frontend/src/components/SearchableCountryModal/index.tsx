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
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@/constants/ui";
import { COUNTRIES } from "@/constants/countries";

import { styles } from "./styles";

type SearchableCountryModalProps = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (country: string | null) => void;
  selectedCountry: string | null;
};

export const SearchableCountryModal = (
  props: SearchableCountryModalProps,
) => {
  const { visible, onDismiss, onSelect, selectedCountry } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const countryList = Object.values(COUNTRIES).map((country) => country.name);
  const sortedCountries = countryList.sort();
  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(sortedCountries);

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
      setFilteredCountries(sortedCountries);
    }
  }, [visible]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCountries(sortedCountries);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = sortedCountries.filter((country) =>
      country.toLowerCase().includes(query),
    );

    setFilteredCountries(filtered);
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

  const handleSelect = (country: string) => {
    onSelect(country);
    handleDismiss();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <Text style={styles.countryName}>{text}</Text>;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <Text style={styles.countryName}>
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

  const renderCountryItem = ({ item }: { item: string }) => {
    const isSelected = selectedCountry === item;

    return (
      <TouchableOpacity
        style={[styles.countryItem, isSelected && styles.countryItemSelected]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.countryContent}>
          <View style={styles.countryBadge}>
            <Text style={styles.countryBadgeText}>{item.charAt(0)}</Text>
          </View>
          <View style={styles.countryInfo}>
            {highlightText(item, searchQuery)}
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
      <Text style={styles.emptyTitle}>No countries match your search</Text>
      <Text style={styles.emptySubtitle}>
        Try searching for "South Africa", "Kenya", "Nigeria", etc.
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
              <Text style={styles.headerTitle}>Select Country</Text>
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
                placeholder="Search country..."
                placeholderTextColor={Colors.mediumGrey}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="words"
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

          {/* Countries List */}
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item}
            renderItem={renderCountryItem}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.listContent,
              filteredCountries.length === 0 && styles.listContentEmpty,
            ]}
          />
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};
