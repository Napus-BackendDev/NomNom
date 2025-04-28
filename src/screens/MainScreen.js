import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';

const MenuItem = ({ item, onAddToCart }) => (
  <TouchableOpacity 
    style={styles.menuItem}
    onPress={() => onAddToCart(item)}
  >
    <Image 
      source={item.image} 
      style={styles.menuImage}
      resizeMode="cover"
    />
    <Text style={styles.menuName}>{item.name}</Text>
    <Text style={styles.menuPrice}>฿ {item.price} บาท</Text>
  </TouchableOpacity>
);

const MainScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    Alert.alert(
      "เพิ่มลงตะกร้า",
      `เพิ่ม ${item.name} ลงตะกร้าเรียบร้อยแล้ว`,
      [
        {
          text: "ตกลง",
          style: "default"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MENU</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Main dish</Text>
        <View style={styles.menuGrid}>
          {menuData.mainDishes.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Dessert</Text>
        <View style={styles.menuGrid}>
          {menuData.desserts.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuIcon: {
    padding: 8,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
    color: '3C2C1C'
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  menuItem: {
    width: '50%',
    padding: 8,
  },
  menuImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuPrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default MainScreen; 