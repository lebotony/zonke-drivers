import React, { useCallback } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

import RangeSlider from "rn-range-slider";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

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
    [],
  );

  if (!visible) return null;

  return (
    <Modal onDismiss={onDismiss}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filters</Text>
          {showReset && (
            <TouchableOpacity onPress={onReset} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Reset</Text>
              <MaterialIcons name="refresh" size={18} color={Colors.mrDBlue} />
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
              <Text style={styles.viewAll}>View all</Text>
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
                    {item.slug}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.sectionDivider} />

          <View style={styles.row}>
            <Text style={styles.contentTitle}>Licences</Text>
            <PopupMenu
              options={LICENCES.map((licence) => licence.slug)}
              selectedValue={null}
              onSelect={onToggleLicences}
              iconColor={Colors.mediumDarkGrey}
              before
            >
              <Text style={styles.viewAll}>View all</Text>
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
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.sectionDivider} />

          <View style={styles.sliderContainer}>
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
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>{ageRange[0]} yrs</Text>
              <Text style={styles.sliderLabelText}>{ageRange[1]} yrs</Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.sliderContainer}>
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
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>{experienceRange[0]} yrs</Text>
              <Text style={styles.sliderLabelText}>{experienceRange[1]} yrs</Text>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>Customer Rating</Text>
            <View style={styles.ratingOptions}>
              {[4, 3, 2].map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.ratingBtn,
                    selectedRating === r && styles.ratingBtnSelected,
                  ]}
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
                    <Text style={styles.ratingLabel}>& up</Text>
                  </View>
                  <View
                    style={[
                      styles.radio,
                      selectedRating === r && styles.activeRadio,
                    ]}
                  >
                    {selectedRating === r && (
                      <View style={styles.activeDot} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onApply} style={styles.footerBtn}>
              <Text style={styles.footerText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
