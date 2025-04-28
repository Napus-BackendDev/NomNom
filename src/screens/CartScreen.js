import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { useReservation } from '../context/ReservationContext';

const CartScreen = () => {
  const { cartItems, clearCart } = useCart();
  const { reservation } = useReservation();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleConfirm = () => {
    Alert.alert(
      "ยืนยันการสั่งอาหาร",
      "คุณต้องการยืนยันการสั่งอาหารหรือไม่?",
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        {
          text: "ยืนยัน",
          onPress: () => {
            Alert.alert(
              "สำเร็จ",
              "สั่งอาหารสำเร็จแล้ว",
              [
                {
                  text: "ตกลง",
                  onPress: () => clearCart()
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      "ยกเลิกการสั่งอาหาร",
      "คุณต้องการยกเลิกการสั่งอาหารหรือไม่?",
      [
        {
          text: "ไม่",
          style: "cancel"
        },
        {
          text: "ใช่",
          onPress: () => clearCart()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
      </View>
      
      <ScrollView style={styles.itemsContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>฿ {item.price} บาท</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Overall ฿ {total} บาท</Text>
        {reservation && (
          <View style={styles.reservationInfo}>
            <Text style={styles.reservationText}>
              Table: {reservation.table} | {reservation.time} | {reservation.guests} Guests
            </Text>
            <Text style={styles.reservationText}>
              Date: {reservation.date}
            </Text>
            {reservation.specialRequest ? (
              <Text style={styles.reservationText}>
                Special: {reservation.specialRequest}
              </Text>
            ) : null}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C2C1C',
  },
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: 16,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  confirmButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  reservationInfo: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  reservationText: {
    fontSize: 15,
    color: '#3C2C1C',
  },
});

export default CartScreen; 