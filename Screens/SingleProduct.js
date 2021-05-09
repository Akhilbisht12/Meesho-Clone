import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Share } from 'react-native'
import TitleHeader from '../Components/TitleHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const {height, width} = Dimensions.get('window')

export default function SingleProduct({route}) {
    const item = route.params.item;
    const image = route.params.image;
    console.log(item)
    const regex = /(<([^>]+)>)/ig;
    const result = item.description.replace(regex, '');
    const share = async()=> {
        try {
            const sharedes = await Share.share({
              message: result,
            });
        }catch(err){
              console.log('Error =>', err);
          }
      }

    const shareImg = async()=> {
        const url = await FileSystem.downloadAsync(image , FileSystem.documentDirectory + "tmp.png");
        var messageText = 'Text that you want to share goes here';
        const options = {
           mimeType: 'image/jpeg',
           dialogTitle: messageText,
        };
          try{
              const shareResponse = await Sharing.shareAsync(url.uri, options);
          }catch(err){
              console.log('Error =>', err);
          }
      }

    return (
        <View style={styles.main}>
            <TitleHeader title='Product Details'/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.productContainer}>
                    <Image style={styles.image} source={{uri : image}}/>
                    <View style={{width : width-20}}>
                        <Text style={{fontSize : 22, fontWeight : 'bold', marginHorizontal : 10}}>{item.name}</Text>
                        <Text style={{fontSize : 22, fontWeight : 'bold', marginHorizontal : 10}}>₹ {item.regular_price}</Text>
                    </View>
                    <View style={styles.productDetails}>
                        <Text style={styles.detailTitle}>Product Details</Text>
                        <Text>{result}</Text>
                        <TouchableOpacity style={styles.copyBtn} onPress={()=>share()}>
                            <Text style={{color : 'red', fontSize : 18}}>Copy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={()=>shareImg()} style={[styles.btn,{borderColor : 'green'}]}>
                    <Text style={[styles.btnText,{color : 'green'}]}>Share</Text>
                    <Icon color='green' style={{marginHorizontal : 5}} size={20} name='whatsapp'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,{borderColor : 'red', backgroundColor : 'red'}]}>
                    <Text style={[styles.btnText,{color :'white'}]}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1
    },
    productContainer : {
        display : 'flex',
        alignItems : 'center'
    },
    image : {
        height : height*0.8,
        width : width-20,
        resizeMode : 'contain'
    },
    productDetails : {
        width : width-20,
        padding : 10,
        backgroundColor : '#eaeaea',
        borderRadius : 10,
        marginVertical : 10
    },
    detailTitle : {
        fontSize : 25
    },
    copyBtn : {
        position : 'absolute',
        top : 5,
        right : 10,
        paddingHorizontal : 10,
        paddingVertical : 5
    },
    bottomNav : {
        width,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around',
        paddingVertical : 10,
        borderTopColor : 'lightgrey',
        borderTopWidth : 1
    },
    btn : {
        borderWidth : 1,
        paddingVertical : 8,
        paddingHorizontal : 45,
        borderRadius : 5,
        display : 'flex',
        flexDirection : 'row'
    },
    btnText : {
        fontSize : 18
    }
})