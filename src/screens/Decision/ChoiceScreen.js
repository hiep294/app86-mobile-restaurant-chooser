import ChoiceLogic from './_ChoiceLogic'

import React from 'react'
import CustomButton from 'app/components/CustomButton'
import CustomTextInput from 'app/components/CustomTextInput'
import {
  Alert, AsyncStorage, BackHandler, FlatList, Picker,
  Platform, ScrollView, Modal, TouchableOpacity,
  StyleSheet, Text, View
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { NavigationEvents } from 'react-navigation'

const ChoiceScreen = ({ navigation }) => {
  const {
    state: {
      participantsListRefresh,
      selectedVisible,
      vetoVisible,
      vetoDisabled,
      vetoText,
    },
    chosenRestaurant,
    participants,
    dispatch,
    randomRestaurant,
    onAccept,
    onVetoModal,
    onSelectedModal,
    onVeto
  } = ChoiceLogic()

  const participantsDemo = [
    {
      "firstName": "Me", "key": "13", "lastName": "Tran", "relationship": "Family", "vetoed": "no",
    },
    {
      "firstName": "Me", "key": "12", "lastName": "Tran", "relationship": "Family", "vetoed": "no",
    },
    {
      "firstName": "Me", "key": "11", "lastName": "Tran", "relationship": "Family", "vetoed": "no",
    },
    {
      "firstName": "Me", "key": "10", "lastName": "Tran", "relationship": "Family", "vetoed": "no",
    },
  ]

  return <SafeAreaView style={styles.container}>
    { /* ########## Selected Modal ########## */}
    <Modal
      presentationStyle={"formSheet"}
      visible={selectedVisible}
      animationType={"slide"}
      onRequestClose={() => { }}
    >
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedName}>{chosenRestaurant.name}</Text>
        <Text style={styles.selectedDetailsLine}>
          This is a {"\u2605".repeat(chosenRestaurant.rating)} star
        </Text>
        <Text style={styles.selectedDetailsLine}>
          {chosenRestaurant.cuisine} restaurant
        </Text>
        <Text style={styles.selectedDetailsLine}>
          with a price rating of {"$".repeat(chosenRestaurant.price)}
        </Text>
        <Text style={styles.selectedDetailsLine}>
          that DOES{chosenRestaurant.delivery === 'YES' ? "" : " NOT"} deliver
        </Text>
        <CustomButton
          text="Accept"
          width="94%"
          onPress={onAccept}
        />
        <CustomButton
          text={vetoText}
          width="94%"
          disabled={vetoDisabled}
          onPress={onVetoModal}
        />
      </View>
    </Modal>

    { /* ########## Veto Modal ########## */}
    <Modal
      presentationStyle="formSheet"
      visible={vetoVisible}
      animationType="slide"
      onRequestClose={() => { }}
    >
      <View style={styles.vetoContainer}>
        <Text style={styles.vetoHeadline}>Who's vetoing</Text>
        <View style={styles.vetoScrollViewContainer}>
          <FlatList
            data={participants}
            renderItem={({ item }) => {
              return item.vetoed === 'no' ?
                (
                  <TouchableOpacity
                    onPress={() => onVeto(item.key)}
                  >
                    <Text style={styles.vetoParticipantName}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )
            }}
          />
        </View>
        <CustomButton
          text="Never Mind"
          width="94%"
          onPress={onSelectedModal}
        />
      </View>
    </Modal>

    { /* ########## Main choice screen. ########## */}
    <Text style={styles.choiceScreenHeadline}>Choice Screen</Text>
    <FlatList
      style={styles.choiceScreenListContainer}
      data={participants}
      extraData={participantsListRefresh}
      renderItem={({ item }) =>
        <View style={styles.choiceScreenListItem}>
          <Text style={styles.choiceScreenListItemName}>
            {item.firstName} {item.lastName} ({item.relationship})
          </Text>
          <Text>Vetoed: {item.vetoed}</Text>
        </View>
      }
    />
    <CustomButton
      text="Randomly Choose"
      width="94%"
      onPress={randomRestaurant}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedName: {
    borderWidth: 1,
    borderColor: 'red',
    fontSize: 32,
    textAlign: 'center'
  },
  selectedDetailsLine: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'red',
  },

  vetoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  vetoHeadline: {
    fontSize: 32,
    textAlign: 'center',
  },
  vetoScrollViewContainer: {
    height: '40%',
  },
  vetoParticipantName: {
    paddingVertical: 20,
    fontSize: 24,
    marginHorizontal: 10
  },

  choiceScreenHeadline: {
    fontSize: 30,
    marginVertical: 20,
  },
  choiceScreenListContainer: {
    width: '94%'
  },
  choiceScreenListItem: {
    flexDirection: 'row',
    marginVertical: 4,
    borderColor: '#e0e0e0',
    borderBottomWidth: 2,
    alignItems: 'center'
  },
  choiceScreenListItemName: {
    flex: 1
  }
})

export default ChoiceScreen
