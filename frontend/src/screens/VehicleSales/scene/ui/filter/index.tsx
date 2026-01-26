import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";

import { PopupMenu } from "@/src/components/popup";
import { Modal } from "@/src/components/modal";
import { SearchableCountryModal } from "@/src/components/SearchableCountryModal";
import { Colors } from "@/constants/ui";

import { styles } from "./styles";

const VEHICLE_TYPES = ["Bike", "Passenger", "Taxi", "Truck", "Lorry"];

const PriceInput: React.FC<{
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}> = ({ label, value, onChangeText, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.fieldsetWrapper}>
      <View style={styles.fieldsetLabel}>
        <Text style={styles.fieldsetLabelText}>{label}</Text>
      </View>
      <View
        style={[
          styles.fieldsetInputContainer,
          isFocused && styles.fieldsetInputFocused,
        ]}
      >
        <Text style={styles.currencyPrefix}>R</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="numeric"
          placeholder={placeholder || "0"}
          placeholderTextColor={Colors.mediumGrey}
          style={styles.fieldsetInput}
        />
      </View>
    </View>
  );
};

interface FilterModalProps {
  showReset: boolean;
  visible: boolean;
  onDismiss: () => void;
  onReset: () => void;
  brands: { id: string; label: string; icon?: string }[];
  selectedBrands: string[];
  selectedFuelTypes: string[];
  selectedVehicleTypes: string[];
  selectedCountry: string | null;
  priceRange: [number, number];
  onToggleBrand: (b: string) => void;
  onFuelToggle: (fuel: string) => void;
  onCountryChange: (country: string | null) => void;
  onPriceChange: (low: number, high: number) => void;
  onApply: () => void;
  onToggleVehicleTypes: (value: string) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  showReset,
  visible,
  onDismiss,
  onReset,
  brands,
  selectedBrands,
  selectedFuelTypes,
  selectedVehicleTypes,
  selectedCountry,
  priceRange,
  onToggleBrand,
  onFuelToggle,
  onCountryChange,
  onPriceChange,
  onApply,
  onToggleVehicleTypes,
}) => {
  const [localMinPrice, setLocalMinPrice] = useState(
    priceRange[0]?.toString() || ""
  );
  const [localMaxPrice, setLocalMaxPrice] = useState(
    priceRange[1]?.toString() || ""
  );
  const [showCountryModal, setShowCountryModal] = useState(false);

  const handleMinChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setLocalMinPrice(numericText);
    const minVal = numericText ? parseInt(numericText, 10) : 0;
    const maxVal = localMaxPrice ? parseInt(localMaxPrice, 10) : 0;
    onPriceChange(minVal, maxVal);
  };

  const handleMaxChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setLocalMaxPrice(numericText);
    const minVal = localMinPrice ? parseInt(localMinPrice, 10) : 0;
    const maxVal = numericText ? parseInt(numericText, 10) : 0;
    onPriceChange(minVal, maxVal);
  };

  if (!visible) return null;

  const getVehicleTypesData = () =>
    VEHICLE_TYPES.map((type) => ({
      value: type.toLowerCase(),
      label: type,
      isSelected: selectedVehicleTypes.includes(type.toLowerCase()),
    }));

  return (
    <Modal onDismiss={onDismiss}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filters</Text>
          {showReset && (
            <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.contentSection}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.row}>
            <Text style={styles.contentTitle}>Vehicle Type</Text>
            <PopupMenu
              options={VEHICLE_TYPES.map((value) => value.toLowerCase())}
              selectedValue={null}
              onSelect={onToggleVehicleTypes}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={styles.viewAll}>View all</Text>
            </PopupMenu>
          </View>

          <FlatList
            data={getVehicleTypesData()}
            keyExtractor={(item) => item.value}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipFlatlist}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onToggleVehicleTypes(item.value)}
                style={[
                  styles.chipBtn,
                  item.isSelected && styles.chipBtnSelected,
                  {
                    backgroundColor: item.isSelected
                      ? Colors.mrDBlue
                      : Colors.white,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: item.isSelected
                        ? Colors.white
                        : Colors.darkCharcoalGrey,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.sectionDivider} />

          <View style={styles.row}>
            <Text style={styles.contentTitle}>Country</Text>
            <TouchableOpacity onPress={() => setShowCountryModal(true)}>
              <Text style={styles.viewAll}>
                {selectedCountry || "Select"}
              </Text>
            </TouchableOpacity>
          </View>

          {selectedCountry && (
            <View
              style={{
                paddingHorizontal: 8,
                paddingTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => onCountryChange(null)}
                style={[
                  styles.chipBtn,
                  {
                    backgroundColor: Colors.mrDBlue,
                    alignSelf: "flex-start",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    {
                      color: Colors.white,
                    },
                  ]}
                >
                  {selectedCountry}
                </Text>
                <AntDesign
                  name="close"
                  size={14}
                  color={Colors.white}
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.sectionDivider} />

          <View style={styles.row}>
            <Text style={styles.contentTitle}>Brand</Text>
            <PopupMenu
              options={brands.map((b) => b.label)}
              selectedValue={null}
              onSelect={(label) => {
                const found = brands.find((b) => b.label === label);
                if (found) onToggleBrand(found.id);
              }}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={styles.viewAll}>View all</Text>
            </PopupMenu>
          </View>

          <FlatList
            data={brands}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipFlatlist}
            renderItem={({ item }) => {
              const isSelected = selectedBrands.includes(item.id);

              return (
                <TouchableOpacity
                  onPress={() => onToggleBrand(item.id)}
                  style={[
                    styles.chipBtn,
                    isSelected && styles.chipBtnSelected,
                    {
                      backgroundColor: isSelected
                        ? Colors.mrDBlue
                        : Colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      {
                        color: isSelected
                          ? Colors.white
                          : Colors.darkCharcoalGrey,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.sectionDivider} />

          <View style={styles.fuelCheckbox}>
            <Text style={styles.contentTitle}>Fuel Type</Text>
            <FlatList
              data={["Diesel", "Petrol", "Electric", "Hybrid", "Hydrogen"]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.fuelOptions}
              renderItem={({ item }) => {
                const key = item.toLowerCase();
                const selected = selectedFuelTypes.includes(key);
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => onFuelToggle(key)}
                    style={[
                      styles.checkbox,
                      selected && styles.checkboxSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.box,
                        {
                          borderColor: selected
                            ? Colors.mrDBlue
                            : Colors.lightGrey,
                        },
                      ]}
                    >
                      {selected && (
                        <AntDesign
                          name="check"
                          size={14}
                          color={Colors.mrDBlue}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.checkboxText,
                        { color: Colors.darkCharcoalGrey },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.priceInputContainer}>
            <Text style={styles.contentTitle}>Price Range</Text>
            <View style={styles.priceInputRow}>
              <PriceInput
                label="Min"
                value={localMinPrice}
                onChangeText={handleMinChange}
                placeholder="0"
              />
              <PriceInput
                label="Max"
                value={localMaxPrice}
                onChangeText={handleMaxChange}
                placeholder="500000"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onApply} style={styles.footerBtn}>
              <Text style={styles.footerText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <SearchableCountryModal
        visible={showCountryModal}
        onDismiss={() => setShowCountryModal(false)}
        onSelect={(country) => {
          onCountryChange(country);
          setShowCountryModal(false);
        }}
        selectedCountry={selectedCountry}
      />
    </Modal>
  );
};
