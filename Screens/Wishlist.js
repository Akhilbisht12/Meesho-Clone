import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import TitleHeader from '../Components/TitleHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { addToCart } from '../Redux/Cart/Cart-Action';
import { removeFromWishlist } from '../Redux/Wishlist/Wishlist-action';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const { width, height} = Dimensions.get('window')
const share = async()=> {
    const url = await FileSystem.downloadAsync(image , FileSystem.documentDirectory + "tmp.png");
    console.log(url.uri)
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
const Wishlist = ({wishlist, addToCart, removeFromWishlist}) => {

    const WishlistComp = ({item}) => {
        return(
            <View style={styles.wishlistComp}>
                <View>
                    <Image style={styles.wishImg} source={{uri : item.image}}/>
                </View>
                <View>
                    <Text style={styles.bdTxt}>{item.name}</Text>
                    <Text style={styles.bdPrice}>{item.price} FREE Delivery</Text>
                    <View style={styles.bottomView}>
                        <TouchableOpacity style={[styles.shareBtn,{backgroundColor : 'green'}]} onPress={()=>share()}>
                            <Text style={{fontSize : 20, color : 'white'}}>Share</Text>
                            <Ionicons color='white' style={{marginHorizontal : 5}} size={25} name='logo-whatsapp'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shareBtn,{backgroundColor : '#c60607'}]} onPress={()=>addToCart(item)}>
                            <Text style={{fontSize : 20, color : 'white'}}>Add To Cart</Text>
                            <Ionicons size={25} color='white' name='cart-outline'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>removeFromWishlist(item.id)}>
                            <Ionicons style={styles.icon} size={30} name='close-circle-outline'/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <TitleHeader title='Wishlist' parent='Home'/>
            <ScrollView>
                {wishlist.map((item)=>{
                    return(
                        <WishlistComp key={item.id} item={item}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
    },
    wishlistComp : {
        marginVertical : 10
    },
    wishImg : {
        width :width,
        height : height*0.3
    },
    bdTxt : {
        fontWeight : 'bold',
        fontSize : 20
    },
    bdPrice : {
        fontSize : 20
    },
    bottomView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    shareBtn : {
        flexDirection : 'row',
        alignItems : 'center',
        borderRadius : 5,
        paddingHorizontal : 10,
        paddingVertical : 5,
        width : width*0.4,
        justifyContent : 'center'
    },
    icon : {
        backgroundColor : 'red',
        borderRadius : 5,
        color : 'white',
        padding : 3
    }

})

const mapStateToProps = (state) => {
    return {
        wishlist : state.wishlist.wishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart : (item)=>dispatch(addToCart(item)),
        removeFromWishlist : (id)=>dispatch(removeFromWishlist(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)
