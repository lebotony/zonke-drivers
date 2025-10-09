import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import RangeSlider from "rn-range-slider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Thumb } from "../../../../../components/slider/thumb";
import { Rail } from "../../../../../components/slider/rail";
import { RailSelected } from "../../../../../components/slider/railSelected";
import { Label } from "../../../../../components/slider/label";
import { Modal } from "../../../../../components/modal";
import { Colors } from "../../../../../../constants/ui";
import { PopupMenu } from "../../../../../components/popup";

interface FilterModalProps {
  visible: boolean;
  onDismiss: () => void;
  onReset: () => void;
  categories: string[];
  brands: { id: string; label: string; icon: string }[];
  visibleCategories: string[];
  visibleBrands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedFuelTypes: string[];
  selectedRating: number | null;
  priceRange: [number, number];
  onToggleCategory: (c: string) => void;
  onToggleBrand: (b: string) => void;
  onFuelToggle: (fuel: string) => void;
  onPriceChange: (low: number, high: number) => void;
  onRatingSelect: (r: number) => void;
  onApply: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onDismiss,
  onReset,
  categories,
  brands,
  visibleCategories,
  visibleBrands,
  selectedCategories,
  selectedBrands,
  selectedFuelTypes,
  selectedRating,
  priceRange,
  onToggleCategory,
  onToggleBrand,
  onFuelToggle,
  onPriceChange,
  onRatingSelect,
  onApply,
}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={`$${value}`} />,
    []
  );

  if (!visible) return null;

  const getVisibleCategoryData = () =>
    visibleCategories.map((category) => ({
      value: category,
      label: category,
      isSelected: selectedCategories.includes(category),
    }));

  const getVisibleBrandData = () =>
    visibleBrands
      .map((id) => {
        const b = brands.find((br) => br.id === id);
        return b
          ? { ...b, isSelected: selectedBrands.includes(id) }
          : undefined;
      })
      .filter(Boolean) as any[];

  return (
    <Modal onDismiss={onDismiss}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter</Text>
          <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
            <Text style={{ color: Colors.mrDBlue }}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contentSection}>
          <View style={styles.row}>
            <Text style={styles.contentTitle}>Category</Text>
            <PopupMenu
              options={categories}
              selectedValue={null}
              onSelect={onToggleCategory}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={{ color: Colors.mrDBlue }}>View all</Text>
            </PopupMenu>
          </View>

          <FlatList
            data={getVisibleCategoryData()}
            keyExtractor={(item) => item.value}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipFlatlist}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onToggleCategory(item.value)}
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
            data={getVisibleBrandData()}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipFlatlist}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onToggleBrand(item.id)}
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

          <View style={styles.fuelCheckbox}>
            <Text style={styles.contentTitle}>Fuel Type</Text>
            <View style={styles.fuelOptions}>
              {["Diesel", "Petrol"].map((f) => {
                const key = f.toLowerCase();
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
                        <AntDesign name="check" size={16} color={Colors.mrDBlue} />
                      ) : null}
                    </View>
                    <Text style={{ color: Colors.darkCharcoalGrey }}>{f}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Price Range */}
          <View style={{ marginVertical: 18 }}>
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
              <Text>$0</Text>
              <Text>$235</Text>
            </View>
          </View>

          {/* Rating */}
          <Text style={styles.reviewContainer}>Customer Review</Text>
          <View style={{ gap: 12 }}>
            {[4, 3, 2].map((r) => (
              <TouchableOpacity
                key={r}
                style={styles.ratingBtn}
                onPress={() => onRatingSelect(r)}
              >
                <View style={styles.ratingText}>
                  {Array.from({ length: r }).map((_, idx) => (
                    <AntDesign
                      key={idx}
                      name="star"
                      size={18}
                      color={Colors.yellow}
                    />
                  ))}
                  <Text style={{ color: Colors.mediumGrey }}>& up</Text>
                </View>
                <View
                  style={[
                    styles.radio,
                    selectedRating === r
                      ? styles.activeRadio
                      : styles.inactiveRadio,
                  ]}
                >
                  {selectedRating === r ? <View style={styles.activeDot} /> : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 96 }} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={onApply} style={styles.footerBtn}>
            <Text style={styles.footerText}>Show results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
