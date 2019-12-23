import People from 'app/api/People';

import React, { useState } from 'react'
import CustomButton from 'app/components/CustomButton'
import CustomTextInput from 'app/components/CustomTextInput'
import CustomPicker from 'app/components/CustomPicker'
import {
  Alert, AsyncStorage, BackHandler, FlatList, Picker,
  Platform, ScrollView,
  StyleSheet, Text, View
} from 'react-native'
import { Root } from 'native-base'
import { SafeAreaView } from 'react-navigation'
import Spacer from 'app/components/Spacer'

const PeopleAddScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [relationship, setRelationship] = useState('')

  const onSave = async () => {
    const newPerson = { firstName, lastName, relationship }
    People.addItem(newPerson, () => navigation.navigate('PeopleListScreen'))
  }

  return <SafeAreaView>
    <ScrollView style={styles.addScreenContainer}>
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.addScreenFormContainer}>
          <Spacer />
          {/* ######### FIRST NAME  */}
          <CustomTextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            maxLength={20}
          />
          {/* ########## LAST NAME ######### */}
          <CustomTextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            maxLength={20}
          />
          {/* ###### RELATIONSHIP ####### */}
          <CustomPicker
            label="Relationship"
            value={relationship}
            onValueChange={setRelationship}
            pickerItems={[
              "", "Me", "Family", "Friend", "Coworker", "Other"
            ]}
          />
        </View>
        {/* ###### BUTTON ######## */}
        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            width="44%"
            onPress={() => navigation.navigate('PeopleListScreen')}
          />
          <CustomButton
            text="Save"
            width="44%"
            onPress={onSave}
          />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  addScreenContainer: {
    // marginTop: Constants.statusBarHeight
    // paddingTop: 20,

  },
  addScreenFormContainer: {},
  addScreenButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default PeopleAddScreen
