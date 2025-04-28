import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useReservation } from '../context/ReservationContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BookTable = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState(null);
  const [specialRequest, setSpecialRequest] = useState('');
  const { saveReservation } = useReservation();
  const navigation = useNavigation();

  const tables = [1, 2, 3, 4, 5, 6, 7, 8];
  const unavailableTables = [6];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleBook = () => {
    if (!selectedTable) {
      Alert.alert('กรุณาเลือกโต๊ะ');
      return;
    }
    saveReservation({
      date: formatDate(date),
      time: formatTime(time),
      guests,
      table: selectedTable,
      specialRequest,
    });
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book a Table</Text>
      </View>

      <View style={styles.content}>
        {/* Date and Time Selection */}
        <View style={styles.datetimeContainer}>
          <TouchableOpacity 
            style={styles.datetimeButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar" size={24} color="#3C2C1C" />
            <Text style={styles.datetimeText}>{formatDate(date)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.datetimeButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Icon name="clock-outline" size={24} color="#3C2C1C" />
            <Text style={styles.datetimeText}>{formatTime(time)}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            onChange={onTimeChange}
          />
        )}

        {/* Number of Guests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Guests</Text>
          <View style={styles.guestButtons}>
            {[2, 4, 6].map((number) => (
              <TouchableOpacity 
                key={number}
                style={[
                  styles.guestButton,
                  guests === number && styles.selectedGuestButton
                ]}
                onPress={() => setGuests(number)}
              >
                <Text style={[
                  styles.guestButtonText,
                  guests === number && styles.selectedGuestText
                ]}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Table Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose your Table</Text>
          <View style={styles.tableGrid}>
            {tables.map((table) => (
              <TouchableOpacity
                key={table}
                style={[
                  styles.tableButton,
                  selectedTable === table && styles.selectedTable,
                  unavailableTables.includes(table) && styles.unavailableTable
                ]}
                onPress={() => !unavailableTables.includes(table) && setSelectedTable(table)}
                disabled={unavailableTables.includes(table)}
              >
                <Icon 
                  name="table-furniture" 
                  size={24} 
                  color={selectedTable === table ? '#FFFFFF' : '#3C2C1C'} 
                />
                <Text style={[
                  styles.tableButtonText,
                  selectedTable === table && styles.selectedTableText,
                  unavailableTables.includes(table) && styles.unavailableTableText
                ]}>Table {table}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Request */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Request</Text>
          <TextInput
            style={styles.specialRequestInput}
            multiline
            numberOfLines={4}
            value={specialRequest}
            onChangeText={setSpecialRequest}
            placeholder="Enter your special request here..."
            placeholderTextColor="#999999"
          />
        </View>

        {/* Book Button */}
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={handleBook}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFF5EB',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C2C1C',
  },
  content: {
    padding: 16,
  },
  datetimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  datetimeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  datetimeText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#3C2C1C',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C2C1C',
    marginBottom: 16,
  },
  guestButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guestButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedGuestButton: {
    backgroundColor: '#3C2C1C',
  },
  guestButtonText: {
    fontSize: 18,
    color: '#3C2C1C',
  },
  selectedGuestText: {
    color: '#FFFFFF',
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tableButton: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedTable: {
    backgroundColor: '#3C2C1C',
  },
  unavailableTable: {
    backgroundColor: '#E0E0E0',
  },
  tableButtonText: {
    marginTop: 8,
    fontSize: 16,
    color: '#3C2C1C',
  },
  selectedTableText: {
    color: '#FFFFFF',
  },
  unavailableTableText: {
    color: '#999999',
  },
  specialRequestInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookButton: {
    backgroundColor: '#3C2C1C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookTable; 