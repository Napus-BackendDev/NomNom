import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 2 items per row with padding

const MenuItem = ({ item, onAddToCart }) => (
  <TouchableOpacity 
    style={styles.menuItem}
    onPress={() => onAddToCart(item)}
  >
    <View style={styles.imageContainer}>
      <Image 
        source={item.image} 
        style={styles.menuImage}
        resizeMode="cover"
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => onAddToCart(item)}
      >
        <Icon name="add-circle" size={32} color="#3C2C1C" />
      </TouchableOpacity>
    </View>
    <View style={styles.itemInfo}>
      <Text style={styles.menuName}>{item.name}</Text>
      <Text style={styles.menuPrice}>฿ {item.price}</Text>
    </View>
  </TouchableOpacity>
);

const MainScreen = () => {
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>mainDishes</Text>
          <View style={styles.menuGrid}>
            {menuData.mainDishes.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>desserts</Text>
          <View style={styles.menuGrid}>
            {menuData.desserts.map((item) => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C2C1C',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: itemWidth,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: itemWidth,
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 4,
  },
  itemInfo: {
    padding: 12,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3C2C1C',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 14,
    color: '#666666',
  },
});

export default MainScreen; 