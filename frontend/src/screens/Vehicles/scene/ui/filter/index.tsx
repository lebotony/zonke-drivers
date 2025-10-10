import React, { useCallback } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import RangeSlider from "rn-range-slider";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";
import { Thumb } from "@/src/components/slider/thumb";
import { Rail } from "@/src/components/slider/rail";
import { RailSelected } from "@/src/components/slider/railSelected";
import { Label } from "@/src/components/slider/label";
import { Modal } from "@/src/components/modal";
import { Colors } from "@/src/../constants/ui";
import { PopupMenu } from "@/src/components/popup";
import { Text } from "react-native-paper";

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
  minPrice: number,
  maxPrice: number,
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
  minPrice,
  maxPrice,
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

  const selected =
    (selectedBrands.length > 0 ||
      selectedCategories.length > 0 ||
      selectedFuelTypes.length > 0) ||
    (selectedRating! > 1) ||
    (priceRange[0] !== minPrice || priceRange[1] !== maxPrice);

  const screenHeight = Dimensions.get('window').height;

  return (
    <Modal onDismiss={onDismiss}>
      <View style={{maxHeight: screenHeight * 0.8}}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter</Text>
          { selected && <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
            <Text style={{ color: Colors.mrDBlue }}>Reset</Text>
          </TouchableOpacity>}
        </View>

        <ScrollView style={styles.contentSection} showsVerticalScrollIndicator={false}>
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
          <View style={{ marginVertical: 18, marginHorizontal: 16 }}>
            <Text style={styles.contentTitle}>Price Range</Text>
            <RangeSlider
              min={minPrice}
              max={maxPrice}
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
              <Text>${priceRange[0]}</Text>
              <Text>${priceRange[1]}</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>Customer Review</Text>
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
