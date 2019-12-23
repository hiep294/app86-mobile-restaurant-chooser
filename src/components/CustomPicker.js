import React from 'react'
import PropTypes from 'prop-types'
import {
  View, Text, TextInput,
  Picker, Platform,
  StyleSheet,
  ActionSheetIOS
} from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import ModalSelector from 'react-native-modal-selector'

const CustomPicker = ({
  label,
  value,
  onValueChange,
  pickerItems,
}) => {

  let index = 0;

  const data = pickerItems.map(item => {
    return {
      key: index++,
      label: item
    }
  })

  data.unshift({ key: index++, section: true, label })

  return <>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={styles.pickerContainer}>
      <ModalSelector
        data={data}
        initValue={`Select`}
        onChange={(option) => onValueChange(option.label)}
        cancelText="Cancel"
        selectStyle={styles.modalSelector}
      />

    </View>
  </>
}

const styles = StyleSheet.create({
  fieldLabel: {
    marginLeft: 15
  },
  pickerContainer: {
    borderColor: '#c0c0c0',
    borderWidth: 2,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 4,
    borderRadius: 8,
    height: 45
  },
  modalSelector: {
    borderWidth: 0
  }
})

CustomPicker.propTypes = {
  label: PropTypes.string.isRequired,
  pickerItems: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
}

export default CustomPicker