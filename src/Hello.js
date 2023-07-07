import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from './AuthContext'

const Hello = () => {
  const {logout} = React.useContext(AuthContext)
  const {userInfo} = useContext(AuthContext)
  console.log(userInfo)
  return (
    <View>
      <Text>Hello{userInfo.name}</Text>
      <TouchableOpacity onPress={()=>{logout()}}>
    <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Hello

const styles = StyleSheet.create({})