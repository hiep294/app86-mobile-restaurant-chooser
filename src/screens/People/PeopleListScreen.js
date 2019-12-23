import People from 'app/api/People'

import React from 'react'
import CustomButton from "app/components/CustomButton";
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import { Root, Toast } from 'native-base'
import Spacer from 'app/components/Spacer'

const PeopleListItem = ({ item, onDelete }) => {

  return <View style={styles.personContainer}>
    <Text style={styles.personName}>
      {item.firstName} {item.lastName} ({item.relationship})
    </Text>
    <CustomButton
      text="Delete"
      onPress={() => {
        Alert.alert("Please confirm",
          "Are you sure you want to delete this person?",
          [
            { text: 'Yes', onPress: () => onDelete(item.key) },
            { text: 'No' },
            { text: 'Cancel', style: 'cancel' }
          ]
        )
      }}
    />
  </View>
}


const PeopleListScreen = ({ navigation }) => {
  const [listData, setListData] = React.useState([])

  const onDelete = async (key) => {
    const newPeopleList = await People.deleteItem(key)
    setListData(newPeopleList)
    Toast.show({
      text: "Person deleted",
      position: 'bottom',
      type: 'danger',
      duration: 2000
    })
  }

  const loadPeople = async () => {
    const people = await People.getItems()
    setListData(people)
  }

  return <Root>
    <SafeAreaView>
      <NavigationEvents onWillFocus={loadPeople} />
      <View style={styles.listScreenContainer}>
        <Spacer />
        <CustomButton
          text="Add Person"
          onPress={() => navigation.navigate('PeopleAddScreen')}
        />
        <FlatList
          data={listData}
          renderItem={({ item }) => <PeopleListItem item={item} onDelete={onDelete} />}
        />
      </View>
    </SafeAreaView>
  </Root>
}

const styles = StyleSheet.create({
  listScreenContainer: {},
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    borderColor: '#e0e0e0',
    borderBottomWidth: 2
  },
  personName: {
    flex: 1,
    marginLeft: 15
  }
})

export default PeopleListScreen