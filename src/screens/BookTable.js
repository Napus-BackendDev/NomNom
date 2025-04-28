import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useReservation } from '../context/ReservationContext';
import { useNavigation } from '@react-navigation/native';

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
  const unavailableTables = [6]; // Example of an unavailable table

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
        {/* Date Selection */}
        <TouchableOpacity 
          style={styles.selectionRow}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={styles.iconLabel}>
            <Icon name="calendar" size={24} color="#3C2C1C" />
            <Text style={styles.label}>Select Date</Text>
          </View>
          <Text style={styles.valueText}>{formatDate(date)}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Time Selection */}
        <TouchableOpacity 
          style={styles.selectionRow}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={styles.iconLabel}>
            <Icon name="clock-outline" size={24} color="#3C2C1C" />
            <Text style={styles.label}>Select Time</Text>
          </View>
          <Text style={styles.valueText}>{formatTime(time)}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            onChange={onTimeChange}
          />
        )}

        {/* Number of Guests */}
        <View style={styles.selectionRow}>
          <View style={styles.iconLabel}>
            <Icon name="account-group" size={24} color="#3C2C1C" />
            <Text style={styles.label}>Number of Guests</Text>
          </View>
          <Text style={styles.valueText}>{guests}</Text>
        </View>

        <View style={styles.guestButtons}>
          <TouchableOpacity 
            style={[styles.guestButton, guests === 2 && styles.selectedGuest]}
            onPress={() => setGuests(2)}
          >
            <Text style={styles.guestButtonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.guestButton, guests === 4 && styles.selectedGuest]}
            onPress={() => setGuests(4)}
          >
            <Text style={styles.guestButtonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.guestButton, guests === 6 && styles.selectedGuest]}
            onPress={() => setGuests(6)}
          >
            <Text style={styles.guestButtonText}>6</Text>
          </TouchableOpacity>
        </View>

        {/* Table Selection */}
        <View style={styles.selectionRow}>
          <View style={styles.iconLabel}>
            <Icon name="table-furniture" size={24} color="#3C2C1C" />
            <Text style={styles.label}>Choose your Table</Text>
          </View>
        </View>

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
              <Text style={[
                styles.tableButtonText,
                selectedTable === table && styles.selectedTableText,
                unavailableTables.includes(table) && styles.unavailableTableText
              ]}>{table}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special Request */}
        <View style={styles.selectionRow}>
          <View style={styles.iconLabel}>
            <Icon name="pencil" size={24} color="#3C2C1C" />
            <Text style={styles.label}>Special Request</Text>
          </View>
        </View>
        <TextInput
          style={styles.specialRequestInput}
          multiline
          numberOfLines={4}
          value={specialRequest}
          onChangeText={setSpecialRequest}
          placeholder="Enter your special request here..."
        />

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF5EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C2C1C',
  },
  content: {
    padding: 16,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginLeft: 12,
    color: '#3C2C1C',
  },
  valueText: {
    fontSize: 16,
    color: '#3C2C1C',
    backgroundColor: '#FFF5EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  guestButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  guestButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: '#FFF5EB',
    borderRadius: 8,
  },
  selectedGuest: {
    backgroundColor: '#3C2C1C',
  },
  guestButtonText: {
    fontSize: 18,
    color: '#3C2C1C',
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  tableButton: {
    width: '23%',
    aspectRatio: 1.5,
    backgroundColor: '#E8F3E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedTable: {
    backgroundColor: '#3C2C1C',
  },
  unavailableTable: {
    backgroundColor: '#E0E0E0',
  },
  tableButtonText: {
    fontSize: 20,
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
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  bookButton: {
    backgroundColor: '#3C2C1C',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BookTable; 