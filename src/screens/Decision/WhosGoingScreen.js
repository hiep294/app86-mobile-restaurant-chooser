import People from 'app/api/People'
import WhosGoingLogic from './_WhosGoingLogic'
//
import React, { useState, useContext } from 'react'
import { Context as DecisionContext } from 'app/context/DecisionContext'
import CustomButton from 'app/components/CustomButton'
import CustomTextInput from 'app/components/CustomTextInput'
import {
  Alert, AsyncStorage, BackHandler, FlatList, Picker,
  Platform, ScrollView,
  StyleSheet, Text, View
} from 'react-native'
import { NavigationEvents } from 'react-navigation';


import { SafeAreaView } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CheckBox } from 'native-base'

const WhosGoingScreen = ({ navigation }) => {
  const {
    state: { people, selected },
    fetchPeople,
    togglePerson, onNextScreen
  } = WhosGoingLogic()
  return <SafeAreaView>
    <NavigationEvents onWillFocus={fetchPeople} />
    <Text style={styles.headerLine}>Who's Going</Text>
    <FlatList
      data={people}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.person}
          onPress={() => togglePerson(item.key)}
        >
          <CheckBox checked={selected[item.key]} />
          <Text style={styles.personName}>
            {item.firstName} {item.lastName} ({item.relationship})
          </Text>
        </TouchableOpacity>
      )}
    />
    <CustomButton
      text="Next"
      onPress={onNextScreen}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  headerLine: {
    fontSize: 30,
    marginVertical: 20,
    alignSelf: 'center'
  },
  person: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  personName: {
    flex: 1,
    marginLeft: 20
  }
})

export default WhosGoingScreen