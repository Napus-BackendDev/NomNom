import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import BookTable from './src/screens/BookTable';
import MainScreen from './src/screens/MainScreen';
import CartScreen from './src/screens/CartScreen';
import { CartProvider } from './src/context/CartContext';
import { ReservationProvider } from './src/context/ReservationContext';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <CartProvider>
      <ReservationProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Menu') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Table') {
                  iconName = focused ? 'restaurant' : 'restaurant-outline';
                } else if (route.name === 'Cart') {
                  iconName = focused ? 'cart' : 'cart-outline';
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#FF6B6B',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Menu" component={MainScreen} />
            <Tab.Screen name="Table" component={BookTable} />
            <Tab.Screen name="Cart" component={CartScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ReservationProvider>
    </CartProvider>
  );
};

export default App;
