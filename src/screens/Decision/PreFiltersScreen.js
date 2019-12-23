import PreFiltersLogic, {
  SET_CUISINE, SET_DELIVERY, SET_PRICE, SET_RATING
} from './_PreFiltersLogic'

import React from 'react'
import CustomButton from 'app/components/CustomButton'
import CustomPicker from 'app/components/CustomPicker'
import {
  ScrollView,
  StyleSheet, Text,
} from 'react-native'

import { SafeAreaView } from 'react-navigation'

const PreFiltersScreen = () => {
  const {
    state: { cuisine, price, rating, delivery },
    dispatch,
    onNextScreen
  } = PreFiltersLogic()
  //
  return <SafeAreaView>
    <ScrollView>
      <Text style={styles.headline}>Pre-Filters</Text>
      <CustomPicker
        label="Cuisine"
        value={cuisine}
        onValueChange={(newCuisine) => dispatch({ type: SET_CUISINE, payload: newCuisine })}
        pickerItems={[
          '', 'Algerian', 'American', 'BBQ', 'Belgian', 'Brazilian', 'British', 'Cajun', 'Canadian', 'Chinese', 'Cuban', 'Egyptian', 'Filipino', 'French', 'German', 'Greek', 'Haitian', 'Hawaiian', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Kenyan', 'Korean', 'Latvian', 'Libyan', 'Mediterranean', 'Mexican', 'Mormon', 'Nigerian', 'Other', 'Peruvian', 'Polish', 'Portuguese', 'Russian', 'Salvadorian', 'Sandwiche Shop', 'Scottish', 'Seafood', 'Spanish', 'Steak House', 'Sushi', 'Swedish', 'Tahitian', 'Thai', 'Tibetan', 'Turkish', 'Welsh'
        ]}
      />
      <CustomPicker
        label="Price &lt;="
        value={price}
        onValueChange={newPrice => dispatch({ type: SET_PRICE, payload: newPrice })}
        pickerItems={[
          '', '1', '2', '3', '4', '5'
        ]}
      />
      <CustomPicker
        label="Rating &gt;="
        value={rating}
        onValueChange={newRating => dispatch({ type: SET_RATING, payload: newRating })}
        pickerItems={[
          '', '1', '2', '3', '4', '5'
        ]}
      />
      <CustomPicker
        label="Delivery?"
        value={delivery}
        onValueChange={newDelivery => dispatch({ type: SET_DELIVERY, payload: newDelivery })}
        pickerItems={[
          '', 'Yes', 'No'
        ]}
      />
      <CustomButton
        text="Next"
        onPress={onNextScreen}
      />
    </ScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 30,
    marginVertical: 20,
    alignSelf: 'center'
  }
})

export default PreFiltersScreen