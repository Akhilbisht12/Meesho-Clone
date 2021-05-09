import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import Ionicons from'react-native-vector-icons/Ionicons'
const {width, height} = Dimensions.get('window')
const Earnings = ({navigation}) => {
    return (
        <View style={styles.main}>
            <ImageBackground source={{uri : 'https://hdwallpaperim.com/wp-content/uploads/2017/08/24/100192-simple_background-748x421.jpg'}} style={styles.earn}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
                    <Ionicons color='white' name='chevron-back-outline' size={30}/>
                </TouchableOpacity>
                <View style={{marginHorizontal : 20}}>
                    <Text style={styles.earningText}>₹ 254</Text>
                    <Text style={styles.earnTitle}>Total Earnings</Text>
                </View>
            </ImageBackground>
            <ScrollView>
                <View style={styles.pending}>
                    <Text style={[styles.pendingTxt,{fontWeight : 'bold'}]}>Pending Payment : </Text>
                    <Text style={styles.pendingTxt}>₹ 500</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1
    },
    earn : {
        height : height*0.2,
        backgroundColor : '#c60607',
        justifyContent : 'space-evenly',
        padding : 10,
    },
    earningText : {
        fontSize : 60,
        color : 'white'
    },
    earnTitle : {
        color : 'white',
        fontSize : 20
    },
    pending : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding : 10,
        borderWidth : 1,
        borderRadius : 5,
        margin : 5,
        borderColor : 'grey'
    },
    pendingTxt : {
        fontSize : 20
    }
})

export default Earnings
