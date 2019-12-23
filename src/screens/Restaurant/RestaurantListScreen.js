import Restaurant from 'app/api/Restaurant'

import React, { useState } from 'react'
import CustomButton from 'app/components/CustomButton'
import {
  Alert,
  View, Text, FlatList, StyleSheet
} from 'react-native'
import { Root, Toast } from 'native-base'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import Spacer from 'app/components/Spacer'

// components
const RestaurantItem = ({ item, onDelete }) => {
  return <View style={styles.restaurantContainer}>
    <Text style={styles.restaurantName}>
      {item.name}
    </Text>
    <CustomButton
      text="Delete"
      onPress={() => {
        Alert.alert(
          "Please confirm",
          "Are you sure you want to delete this restaurant?",
          [
            { text: "Yes", onPress: () => onDelete(item.key) },
            { text: "No" },
            { text: "Cancel", style: "cancel" },
          ],
          { cancelable: true }
        )
      }}
    />
  </View>
}

const RestaurantListScreen = ({ navigation }) => {
  const [listData, setListData] = useState([])

  const loadRestaurants = async () => {
    try {
      const listData = await Restaurant.getItems()
      setListData(listData)
    } catch (error) {
      console.log(error.message)
    }

  }

  const onDelete = async (key) => {
    try {
      const newRestaurants = await Restaurant.deleteItem(key)
      Toast.show({
        text: 'Restaurant deleted',
        position: 'bottom',
        type: 'danger',
        duration: 2000
      })
      setListData(newRestaurants)
    } catch (error) {
      console.log(error.message)
    }
  }

  // render
  return <Root>
    <SafeAreaView>
      <NavigationEvents onWillFocus={loadRestaurants} />
      <Spacer />
      <View style={styles.listScreenContainer}>
        <CustomButton
          text="Add Restaurant"
          width="94%"
          onPress={() => navigation.navigate('RestaurantAddScreen')}
        />

        <FlatList
          style={styles.restaurantList}
          data={listData}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <RestaurantItem item={item} onDelete={onDelete} />}
        />
      </View>
    </SafeAreaView>
  </Root>
}

const styles = StyleSheet.create({

  restaurantContainer: {
    flexDirection: 'row',
    borderColor: '#e0e0e0',
    borderBottomWidth: 2,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  restaurantName: {
    flex: 1,
    marginLeft: 15
  }
})

export default RestaurantListScreen