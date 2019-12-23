import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const CustomTextInput = ({
  value,
  label,
  onChangeText,

  labelStyle,
  maxLength,
  textInputStyle
}) => {
  return <View>
    <Text style={[styles.fieldLabel, labelStyle]}>
      {label}
    </Text>
    <TextInput
      value={value}
      maxLength={maxLength}
      onChangeText={onChangeText}
      style={[styles.textInput, textInputStyle]}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
}

const styles = StyleSheet.create({
  fieldLabel: { marginLeft: 15 },
  textInput: {
    borderColor: '#c0c0c0',
    borderWidth: 2,
    borderRadius: 8,
    height: 40,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 4,
    paddingLeft: 10,
  }
})

CustomTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  maxLength: PropTypes.number,
  textInputStyle: PropTypes.object,
  onChangeText: PropTypes.func.isRequired
}

export default CustomTextInput