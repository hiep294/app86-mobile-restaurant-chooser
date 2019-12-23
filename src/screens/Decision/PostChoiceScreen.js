import React from 'react'
import CustomButton from 'app/components/CustomButton'
import {
  StyleSheet, Text, View
} from 'react-native'
import { Context as DecisionContext } from 'app/context/DecisionContext'

import { SafeAreaView } from 'react-navigation'

const PostChoiceScreen = ({ navigation }) => {
  const { state: { chosenRestaurant } } = React.useContext(DecisionContext)
  const Row = ({ label, value }) => (
    <View style={styles.detailsRow}>
      <Text style={styles.detailsLabel}>{label}</Text>
      <Text style={styles.detailsValue}>{value}</Text>
    </View>
  )
  return <SafeAreaView style={styles.container}>
    <Text style={styles.headline}>Enjoy your meal!</Text>
    <View style={styles.detailsContainer}>
      <Row label="Name:" value={chosenRestaurant.name} />
      <Row label="Cuisine:" value={chosenRestaurant.cuisine} />
      <Row label="Price:" value={"$".repeat(chosenRestaurant.price)} />
      <Row label="Rating:" value={"\u2605".repeat(chosenRestaurant.rating)} />
      <Row label="Phone:" value={chosenRestaurant.phone} />
      <Row label="Address:" value={chosenRestaurant.address} />
      <Row label="Website:" value={chosenRestaurant.webSite} />


    </View>
    <CustomButton
      buttonStyle={styles.footerButton}
      text="All Done"
      onPress={() => navigation.navigate('DecisionTimeScreen')}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  headline: {
    fontSize: 32,
    paddingBottom: 80,
    alignSelf: 'center'
  },
  detailsContainer: {
    borderWidth: 2,
    borderColor: '#000',
    padding: 10,
    marginHorizontal: 4,
  },
  detailsRow: {
    flexDirection: 'row',
  },
  detailsLabel: {
    flex: 4,
    fontWeight: 'bold',
  },
  detailsValue: {
    flex: 5
  },
  footerButton: {
    marginTop: 80
  }
})

export default PostChoiceScreen