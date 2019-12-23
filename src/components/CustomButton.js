import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const CustomButton = ({
  text, onPress, buttonStyle, textStyle, width, disabled
}) => {

  const dynamicContainerStyle = {
    backgroundColor: disabled === true ? '#e0e0e0' : '#303656'
  }

  return <TouchableOpacity
    style={[
      styles.defaultContainer,
      buttonStyle,
      { width },
      dynamicContainerStyle
    ]}
    onPress={() => disabled ? null : onPress()}
  >
    <Text style={[
      styles.defaultText,
      textStyle
    ]}
    >{text}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  defaultContainer: {
    padding: 10,
    height: 60,
    borderRadius: 8,
    margin: 8,
  },
  defaultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: "center",
    paddingTop: 5
  }
})

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  width: PropTypes.string,
  disabled: PropTypes.bool,
}

export default CustomButton