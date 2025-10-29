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
import {
  LICENCES,
  PLATFORM_FILTERS,
  PLATFORM_LABELS,
} from "../../utils/constants";

interface FilterModalProps {
  showReset: boolean;
  visible: boolean;
  selectedPlatforms: string[];
  selectedLicences: string[];
  ageRange: number[];
  experienceRange: number[];
  selectedRating: number | null;
  onDismiss: () => void;
  onReset: () => void;
  onRatingSelect: (r: number) => void;
  onApply: () => void;
  onAgeChange: (low: number, high: number) => void;
  onExperienceChange: (low: number, high: number) => void;
  onTogglePlatforms: (value: string) => void;
  onToggleLicences: (value: string) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  showReset,
  visible,
  selectedPlatforms,
  selectedLicences,
  ageRange,
  experienceRange,
  selectedRating,
  onDismiss,
  onReset,
  onRatingSelect,
  onApply,
  onAgeChange,
  onExperienceChange,
  onTogglePlatforms,
  onToggleLicences,
}) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={`${value} yrs`} />,
    []
  );

  if (!visible) return null;

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
            <Text style={styles.contentTitle}>Platforms</Text>
            <PopupMenu
              options={PLATFORM_LABELS}
              selectedValue={null}
              onSelect={onTogglePlatforms}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={{ color: Colors.mrDBlue }}>View all</Text>
            </PopupMenu>
          </View>

          <FlatList
            data={PLATFORM_FILTERS}
            keyExtractor={(item) => item.value}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipFlatlist}
            renderItem={({ item }) => {
              const isSelected = selectedPlatforms.includes(item.value);
              return (
                <TouchableOpacity
                  onPress={() => onTogglePlatforms(item.value)}
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
                    {item.slug}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.row}>
            <Text style={styles.contentTitle}>Licences</Text>
            <PopupMenu
              options={PLATFORM_LABELS}
              selectedValue={null}
              onSelect={onTogglePlatforms}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={{ color: Colors.mrDBlue }}>View all</Text>
            </PopupMenu>
          </View>

          <FlatList
            data={LICENCES}
            keyExtractor={(item) => item.slug}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipFlatlist}
            renderItem={({ item }) => {
              const isSelected = selectedLicences.includes(item.slug);

              return (
                <TouchableOpacity
                  onPress={() => onToggleLicences(item.slug)}
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
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Age Range */}
          <View style={{ marginVertical: 15, marginHorizontal: 16 }}>
            <Text style={styles.contentTitle}>Age Range</Text>
            <RangeSlider
              min={18}
              max={70}
              step={2}
              low={ageRange[0]}
              high={ageRange[1]}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              onValueChanged={onAgeChange}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{ageRange[0]} yrs</Text>
              <Text>{ageRange[1]} yrs</Text>
            </View>
          </View>

          {/* Experience Range */}
          <View style={{ marginVertical: 15, marginHorizontal: 16 }}>
            <Text style={styles.contentTitle}>Experience Range</Text>
            <RangeSlider
              min={0}
              max={52}
              step={2}
              low={experienceRange[0]}
              high={experienceRange[1]}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              onValueChanged={onExperienceChange}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{experienceRange[0]}yrs </Text>
              <Text>{experienceRange[1]}yrs </Text>
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
                    {selectedRating === r ? (
                      <View style={styles.activeDot} />
                    ) : null}
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
