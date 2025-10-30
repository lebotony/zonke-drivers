import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { SearchComponent } from '@/src/components/searchBar';
import { styles } from '../styles/applicants';
import { Colors } from '@/constants/ui';
import { Modal } from '@/src/components/modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DriverCard } from '@/src/screens/Drivers/Scene/ui/driverCard';
import { PopupMenu } from '@/src/components/popup';
import { VehicleSelector } from './vehicleSelector';

// Sample data for vehicles
  const vehiclesData = [
    {
      id: '1',
      model: 'Toyota Camry 2020',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      type: 'Sedan',
      color: 'White',
      applicants: 12,
    },
    {
      id: '2',
      model: 'Mercedes E-Class 2021',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      type: 'Luxury Sedan',
      color: 'Black',
      applicants: 8,
    },
    {
      id: '3',
      model: 'Toyota Harrier 2019',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      type: 'SUV',
      color: 'Gray',
      applicants: 5,
    },
  ];

export const ApplicantsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Driver | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(vehiclesData[0]);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);

  
  // Sample data for applicants grouped by vehicle
  const applicantsData = {
    '1': [
      {
        id: '1',
        name: 'Michael Johnson',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.7,
        address: 'Nketa 6, Bulawayo',
        age: 34,
        reviews: 128,
        experience: '3 years',
        licenseClass: 'B, C1',
        status: 'pending',
        appliedDate: '2 hours ago',
        vehicle: 'Toyota Camry 2020',
        coverLetter: 'I have extensive experience driving similar vehicles and am familiar with Nairobi routes. I am available immediately and have all required documents.',
        phone: '+254 712 345 678',
        email: 'michael.j@example.com',
      },
      {
        id: '2',
        name: 'David Kimani',
        age: 41,
        address: 'New Magwegwe, Bulawayo',
        photo: 'https://randomuser.me/api/portraits/men/44.jpg',
        rating: 4.9,
        reviews: 89,
        experience: '5 years',
        licenseClass: 'B, C, D',
        status: 'accepted',
        appliedDate: '1 day ago',
        vehicle: 'Toyota Camry 2020',
        coverLetter: 'Professional driver with 5 years experience in taxi services. Excellent knowledge of Nairobi and surrounding areas.',
        phone: '+254 723 456 789',
        email: 'david.k@example.com',
      },
    ],
    '2': [
      {
        id: '3',
        name: 'James Omondi',
        address: 'Mpopoma, Bulawayo',
        photo: 'https://randomuser.me/api/portraits/men/67.jpg',
        rating: 4.3,
        age: 29,
        reviews: 64,
        experience: '2 years',
        licenseClass: 'B',
        status: 'rejected',
        appliedDate: '3 days ago',
        vehicle: 'Mercedes E-Class',
        coverLetter: 'Young, energetic driver with clean record. Looking for opportunities to grow in the transportation industry.',
        phone: '+254 734 567 890',
        email: 'james.o@example.com',
      },
      {
        id: '4',
        name: 'Robert Mutiso',
        age: 48,
        address: 'Cowdray Park, Bulawayo',
        photo: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 4.8,
        reviews: 156,
        experience: '4 years',
        licenseClass: 'B, C1',
        status: 'pending',
        appliedDate: 'Just now',
        vehicle: 'Mercedes E-Class',
        coverLetter: 'Experienced in luxury vehicle services and funeral transportation. Professional and reliable.',
        phone: '+254 745 678 901',
        email: 'robert.m@example.com',
      },
    ],
    '3': [
      {
        id: '5',
        name: 'Samuel Gitonga',
        age: 30,
        address: 'Pumula South, Bulawayo',
        photo: 'https://randomuser.me/api/portraits/men/55.jpg',
        rating: 4.6,
        reviews: 92,
        experience: '3 years',
        licenseClass: 'B, C1',
        status: 'pending',
        appliedDate: '5 hours ago',
        vehicle: 'Toyota Harrier',
        coverLetter: 'SUV specialist with excellent off-road driving experience. Perfect for family and adventure trips.',
        phone: '+254 756 789 012',
        email: 'samuel.g@example.com',
      },
    ],
  };

  // Set default selected vehicle on component mount
//   useEffect(() => {
//     if (vehiclesData.length > 0 && !selectedVehicle) {
//       setSelectedVehicle(vehiclesData[0]);
//     }
//   }, []);

  const currentApplicants = selectedVehicle ? applicantsData[selectedVehicle.id] || [] : [];
  
  const filteredApplicants = currentApplicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         applicant.vehicle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || applicant.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });


  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>

        <Text style={styles.headerTitle}>Applicants</Text>
        
        {/* Vehicle Selector */}
        <VehicleSelector
            vehicles={vehiclesData}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            />
        
        {/* Search Bar */}
            <SearchComponent placeholder='Search applicants...'/>
      </View>

      {/* Applicants List */}
      {}
      <View style={styles.listContainer}>
        
        
        {filteredApplicants.length > 0 ? (
            <>
                <Text style={styles.resultsCount}>
            {filteredApplicants.length} applicant{filteredApplicants.length !== 1 ? 's' : ''} found
            {selectedVehicle && ` for ${selectedVehicle.model}`}
                </Text>  
            <FlatList
                data={filteredApplicants}
                renderItem={({item}) => <DriverCard driver={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
            </>
         
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#ddd" />
            <Text style={styles.emptyStateTitle}>No applicants found</Text>
            <Text style={styles.emptyStateText}>
              {selectedVehicle ? 
                `No applicants found yet for ${selectedVehicle.model}` : 
                'Select a vehicle to view applicants'
              }
            </Text>
          </View>
        )}
      </View>

    </SafeAreaView>
  );
};

