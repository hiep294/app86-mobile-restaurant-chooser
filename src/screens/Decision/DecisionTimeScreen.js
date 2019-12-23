import DecisionTimeLogic from './_DecisionTimeLogic'

import React from 'react'
import {
  TouchableOpacity,
  Text, View,
  StyleSheet,
  Dimensions
} from 'react-native'
import Image from 'react-native-scalable-image'

const DecisionTimeScreen = () => {
  const { onNextScreen } = DecisionTimeLogic()

  return <View style={styles.decisionTimeScreenContainer}>
    <TouchableOpacity
      style={styles.decisionTimeScreenTouchable}
      onPress={onNextScreen}
    >
      <Image
        width={Dimensions.get('window').width * 0.9}
        source={require('app/images/its-decision-time.png')}
      />
      <Text style={styles.decisionTimeScreenText}>
        (tap the food to get going)
      </Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  decisionTimeScreenContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decisionTimeScreenTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  decisionTimeScreenText: {
    // paddingTop: 20
  }
})

export default DecisionTimeScreen