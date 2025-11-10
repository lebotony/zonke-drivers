import React, { useCallback } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";

import RangeSlider from "rn-range-slider";
import { AntDesign } from "@expo/vector-icons";

import { PopupMenu } from "@/src/components/popup";
import { Rail } from "@/src/components/slider/rail";
import { Thumb } from "@/src/components/slider/thumb";
import { RailSelected } from "@/src/components/slider/railSelected";
import { Label } from "@/src/components/slider/label";
import { Modal } from "@/src/components/modal";
import { Colors } from "@/src/../constants/ui";

import { styles } from "./styles";
import { VEHICLE_TYPES } from "../../../utils/constants";

interface FilterModalProps {
  showReset: boolean;
  visible: boolean;
  onDismiss: () => void;
  onReset: () => void;
  brands: { id: string; label: string; icon: string }[];
  selectedBrands: string[];
  selectedFuelTypes: string[];
  selectedVehicleTypes: string[];
  selectedRating: number | null;
  priceRange: [number, number] | [];
  onToggleBrand: (b: string) => void;
  onFuelToggle: (fuel: string) => void;
  onPriceChange: (low: number, high: number) => void;
  onRatingSelect: (r: number) => void;
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
  selectedRating,
  priceRange,
  onToggleBrand,
  onFuelToggle,
  onPriceChange,
  onRatingSelect,
  onApply,
  onToggleVehicleTypes,
}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={`R${value}`} />,
    []
  );

  if (!visible) return null;

  const getVehicleTypesData = () =>
    VEHICLE_TYPES.map((type) => ({
      value: type.toLowerCase(),
      label: type,
      isSelected: selectedVehicleTypes.includes(type.toLowerCase()),
    }));

  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal onDismiss={onDismiss}>
      <View style={{ maxHeight: screenHeight * 0.8 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter</Text>
          {showReset && (
            <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
              <Text style={{ color: Colors.mrDBlue }}>Reset</Text>
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
              options={VEHICLE_TYPES}
              selectedValue={null}
              onSelect={onToggleVehicleTypes}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={{ color: Colors.mrDBlue }}>View all</Text>
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
                  {
                    backgroundColor: item.isSelected
                      ? Colors.mrDBlue
                      : Colors.softGrey,
                  },
                ]}
              >
                <Text
                  style={{
                    color: item.isSelected
                      ? Colors.white
                      : Colors.darkCharcoalGrey,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

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
                    {
                      backgroundColor: isSelected
                        ? Colors.mrDBlue
                        : Colors.softGrey,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: isSelected
                        ? Colors.white
                        : Colors.darkCharcoalGrey,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.fuelCheckbox}>
            <Text style={styles.contentTitle}>Fuel Type</Text>
            <FlatList
              data={["Diesel", "Petrol", "Electric", "Hybrid", "Hydrogen"]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.fuelOptions}
              renderItem={({ item }) => {
                {
                  const key = item.toLowerCase();
                  const selected = selectedFuelTypes.includes(key);
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => onFuelToggle(key)}
                      style={styles.checkbox}
                    >
                      <View
                        style={[
                          styles.box,
                          {
                            borderWidth: selected ? 1.5 : 1,
                            borderColor: selected
                              ? Colors.mrDBlue
                              : Colors.mediumGrey,
                          },
                        ]}
                      >
                        {selected ? (
                          <AntDesign
                            name="check"
                            size={16}
                            color={Colors.mrDBlue}
                          />
                        ) : null}
                      </View>
                      <Text style={{ color: Colors.darkCharcoalGrey }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
          </View>

          {/* Price Range */}
          <View style={{ marginVertical: 15, marginHorizontal: 16 }}>
            <Text style={styles.contentTitle}>Price Range</Text>
            <RangeSlider
              min={0}
              max={235}
              step={5}
              low={priceRange[0]}
              high={priceRange[1]}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              onValueChanged={onPriceChange}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>R{priceRange[0]}</Text>
              <Text>R{priceRange[1]}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onApply} style={styles.footerBtn}>
              <Text style={styles.footerText}>Show results</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
