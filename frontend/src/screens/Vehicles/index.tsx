import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import * as icons from "simple-icons";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";

import { VehicleCard } from "./scene/ui/card";
import { styles } from "./styles";
import { Colors } from "../../../constants/ui";
import { Circle } from "../../components/shapes/circle";
import { SearchComponent } from "../../components/searchBar";
import { PopupMenu } from "../../components/popup";
import { FilterModal } from "./scene/ui/filter";
import { TextLogo } from "@/src/components/misc/textLogo";
import { Text } from "react-native-paper";
import { fetchVehicles } from "./actions";
import { useInfiniteQuery } from "@tanstack/react-query";

const Brand = [
  { id: "bmw", label: "BMW", icon: "siBmw" },
  { id: "nissan", label: "Nissan", icon: "siNissan" },
  { id: "volkswagen", label: "VW", icon: "siVolkswagen" },
  { id: "audi", label: "Audi", icon: "siAudi" },
  { id: "toyota", label: "Toyota", icon: "siToyota" },
  { id: "mercedes", label: "Mercedes", icon: "siMercedes" },
  { id: "ford", label: "Ford", icon: "siFord" },
  { id: "honda", label: "Honda", icon: "siHonda" },
  { id: "hyundai", label: "Hyundai", icon: "siHyundai" },
  { id: "kia", label: "Kia", icon: "siKia" },
  { id: "mazda", label: "Mazda", icon: "siMazda" },
  { id: "subaru", label: "Subaru", icon: "siSubaru" },
  { id: "lexus", label: "Lexus", icon: "siLexus" },
  { id: "volvo", label: "Volvo", icon: "siVolvo" },
];

const Categories = [
  "All",
  "SUV",
  "Truck",
  "Van",
  "Motorcycle",
  "Hatchback",
  "Convertible",
  "Wagon",
  "Hybrid",
  "Luxury",
  "Off-Road"
];

const SAMPLE = [
  {
    id: "1",
    model: "Model S",
    title: "Mazda BT-50",
    price: "$327.00",
    location: "Cape Town",
    rating: 4.5 ,
  },
  {
    id: "2",
    model: "Model 3",
    title: "Nissan Navara",
    price: "$89.00",
    location: "Johannesburg",
    rating: 4.2,
  },
  {
    id: "3",
    model: "Model X",
    title: "BMW X5",
    price: "$210.00",
    location: "Durban",
    rating: 4.7,
  },
  {
    id: "4",
    model: "Model S",
    title: "Mazda BT-50",
    price: "$327.00",
    location: "Cape Town",
    rating: 4.5 ,
  },
  {
    id: "5",
    model: "Model 3",
    title: "Nissan Navara",
    price: "$89.00",
    location: "Johannesburg",
    rating: 4.2,
  },
  {
    id: "6",
    model: "Model X",
    title: "BMW X5",
    price: "$210.00",
    location: "Durban",
    rating: 4.7,
  },
];

export const VehiclesScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 235]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  
  const initialVisibleCategories = Categories.slice(0, 5);
  const initialVisibleBrands = Brand.map(b => b.id).slice(0, 5);

  const [visibleCategories, setVisibleCategories] = useState<string[]>(initialVisibleCategories);
  const [visibleBrands, setVisibleBrands] = useState<string[]>(initialVisibleBrands);


   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["vehicles"],
      queryFn: fetchVehicles,
      getNextPageParam: (lastPage) => {
        const page = lastPage?.paginate?.page;
        const max_page = lastPage?.paginate?.max_page
        return page < max_page ? page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const vehicles = data?.pages.flatMap((page) => page?.data) ?? [];

  console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', vehicles)

 const toggleBrand = (id: string) => {
  setSelectedBrands((s) =>
    s.includes(id)
      ? s.filter((x) => x !== id)
      : [...s, id]
  );

  setVisibleBrands((prev) => {
    const isInitial = initialVisibleBrands.includes(id);
    const isAlreadyVisible = prev.includes(id);

    if (isAlreadyVisible) {
      return prev;
    }

    if (!isInitial) {
      return [id, ...prev];
    }

    return [...prev, id];
  });
};

 const toggleCategory = (id: string) => {
  setSelectedCategories((s) =>
    s.includes(id)
      ? s.filter((x) => x !== id)
      : [...s, id]
  );

  setVisibleCategories((prev) => {
    const isInitial = initialVisibleCategories.includes(id);
    const isAlreadyVisible = prev.includes(id);

    if (isAlreadyVisible) {
      return prev;
    }

    if (!isInitial) {
      return [id, ...prev];
    }

    return [...prev, id];
  });
};




  const getVisibleBrandData = () =>
    visibleBrands
      .map((id) => {
        const b = Brand.find((br) => br.id === id);
        return b
          ? { ...b, isSelected: selectedBrands.includes(id) }
          : undefined;
      })
      .filter(Boolean) as any[];

  const handleFilterReset = () => {
    setSelectedBrands([]); 
    setSelectedCategories([]);
    setSelectedRating(null);
    setPriceRange([0,235]);
    setVisibleCategories(Categories.slice(0, 5));
    setVisibleBrands(Brand.map(b => b.id).slice(0, 5));
    setSelectedFuelTypes([]);
  }

  const handleValueChange = useCallback((low: number, high: number) => {
    setPriceRange([low, high]);
  }, []);

  const onFilterDismiss = () => {

    setShowFilterModal(false)
    handleFilterReset()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRow}>
        <TextLogo size="small" />
        <SearchComponent customStyle={{flex: 1, marginHorizontal: 6}} />
        <View>
          <TouchableOpacity>
            <Circle size={35} borderColor={Colors.lightGrey}>
              <EvilIcons name="bell" size={20} color="black" />
            </Circle>
          </TouchableOpacity>
        </View>
        <View />
      </View>


      <View style={styles.sectionHeader}>
        <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilterModal(true)}>
          <Text style={{  fontWeight: '600', fontSize: 15 }}>Filter</Text>
          <MaterialIcons name="filter-list" size={20} color={Colors.mediumDarkGrey} />
        </TouchableOpacity>
       {selectedBrands.length > 0 && (
    <TouchableOpacity
      style={styles.resetBtn}
      onPress={() => {setSelectedBrands([]),setVisibleBrands(Brand.map(b => b.id).slice(0, 5));}}
      activeOpacity={0.8}
    >
      <Text style={{ color: Colors.mrDBlue, fontWeight: '600' }}>Reset</Text>
      <MaterialIcons name="refresh" size={18} color={Colors.mrDBlue} />
      
    </TouchableOpacity>
  )}

       
      </View>
        <PopupMenu
          options={Brand.map((c) => c.label)}
          selectedValue={null}
          onSelect={(label) => {
            const found = Brand.find((c) => c.label === label);
            if (found) toggleBrand(found.id);
          }}
          iconColor={Colors.mediumDarkGrey}
        >
          <Text style={styles.seeAll}>View all</Text>
        </PopupMenu>
      </View>

      <FlatList
        data={getVisibleBrandData()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.brandsFlatlist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.brands}
        renderItem={({ item }) => {
          const iconData = (icons as any)[item.icon];
          const isSelected = selectedBrands.includes(item.id); 

          return (
            <TouchableOpacity
              style={[
                styles.chip,
                isSelected && {
                  backgroundColor: Colors.mrDBlue,
                  borderColor: Colors.mrDBlue,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => toggleBrand(item.id)}
            >
              <View style={styles.brandLogo}>
                {iconData ? (
                  <Svg
                    width={32}
                    height={32}
                    viewBox="0 0 24 24"
                    fill={`#${iconData.hex}`}
                  >
                    <Path d={iconData.path} />
                  </Svg>
                ) : (
                  <MaterialIcons name="directions-car" size={28} color="black" />
                )}
              </View>

              <Text
                style={[
                  styles.chipText,
                  isSelected && { color: Colors.white },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <FilterModal
        visible={showFilterModal}
        onDismiss={onFilterDismiss}
        onReset={handleFilterReset}
        categories={Categories}
        brands={Brand}
        visibleCategories={visibleCategories}
        visibleBrands={visibleBrands}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        selectedFuelTypes={selectedFuelTypes}
        selectedRating={selectedRating}
        priceRange={priceRange}
        minPrice={0}
        maxPrice={235}
        onToggleCategory={toggleCategory}
        onToggleBrand={toggleBrand}
        onFuelToggle={(f) =>
          setSelectedFuelTypes((s) =>
            s.includes(f) ? s.filter((x) => x !== f) : [...s, f]
          )
        }
        onPriceChange={handleValueChange}
        onRatingSelect={setSelectedRating}
        onApply={() => setShowFilterModal(false)}
      />

      <FlatList
        data={SAMPLE}
         onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <VehicleCard item={item} />}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 14,

        }}
        showsVerticalScrollIndicator={false}
      />
      
    </SafeAreaView>
  );
};

export default VehiclesScreen;