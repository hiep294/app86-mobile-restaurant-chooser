import { addItem } from 'app/api/Restaurant'

import React, { useState } from 'react'
import CustomButton from 'app/components/CustomButton'
import CustomTextInput from 'app/components/CustomTextInput'
import CustomPicker from 'app/components/CustomPicker'
import { SafeAreaView } from 'react-navigation'
import {
  Platform,
  ScrollView,
  View, StyleSheet
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spacer from 'app/components/Spacer'

const RestaurantAddScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [webSite, setWebSite] = useState('')
  const [delivery, setDelivery] = useState('')

  const onSave = async () => {
    addItem({
      name,
      cuisine,
      price,
      rating,
      phone,
      address,
      webSite,
      delivery
    }, () => {
      navigation.navigate('RestaurantListScreen')
    })
  }

  return <SafeAreaView>
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <ScrollView>
        <View>
          <Spacer />
          { /* ########## Name ########## */}
          <CustomTextInput
            label="Name"
            onChangeText={setName}
            maxLength={20}
            value={name}
          />

          { /* ########## Cuisine ########## */}
          <CustomPicker
            label="Cuisine"
            value={cuisine}
            onValueChange={setCuisine}
            pickerItems={['', 'Algerian', 'American', 'BBQ', 'Belgian', 'Brazilian', 'British', 'Cajun', 'Canadian', 'Chinese', 'Cuban', 'Egyptian', 'Filipino', 'French', 'German', 'Greek', 'Haitian', 'Hawaiian', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Kenyan', 'Korean', 'Latvian', 'Libyan', 'Mediterranean', 'Mexican', 'Mormon', 'Nigerian', 'Other', 'Peruvian', 'Polish', 'Portuguese', 'Russian', 'Salvadorian', 'Sandwiche Shop', 'Scottish', 'Seafood', 'Spanish', 'Steak House', 'Sushi', 'Swedish', 'Tahitian', 'Thai', 'Tibetan', 'Turkish', 'Welsh']}
          />
          { /* ########## Price ########## */}
          <CustomPicker
            label="Price"
            value={price}
            onValueChange={setPrice}
            pickerItems={[
              '', '1', '2', '3', '4', '5'
            ]}
          />
          { /* ########## Rating ########## */}
          <CustomPicker
            label="Rating"
            value={rating}
            onValueChange={setRating}
            pickerItems={[
              '', '1', '2', '3', '4', '5',
            ]}
          />
          { /* ########## Phone ########## */}
          <CustomTextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            maxLength={20}
          />
          { /* ########## Address ########## */}
          <CustomTextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            maxLength={20}
          />
          { /* ########## WebSite ########## */}
          <CustomTextInput
            label="Web Site"
            value={webSite}
            onChangeText={setWebSite}
            maxLength={20}
          />
          { /* ########## Delivery ########## */}
          <CustomPicker
            label="Delivery"
            value={delivery}
            onValueChange={setDelivery}
            pickerItems={["", "Yes", "No"]}
          />
        </View>
        { /* ########## Buttons ########## */}
        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            width="44%"
            onPress={() => navigation.navigate("RestaurantListScreen")}
          />
          <CustomButton
            text="Save"
            width="44%"
            onPress={onSave}
          />
        </View>

      </ScrollView>

    </KeyboardAwareScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  addScreenButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

export default RestaurantAddScreen
