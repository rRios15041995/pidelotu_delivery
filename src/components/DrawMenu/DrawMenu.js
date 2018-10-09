/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage, StyleSheet, ImageBackground,TouchableWithoutFeedback, View, Text, Image, YellowBox, ActnativeivityIndicator, Alert } from 'react-native';
import { Container, Header,Footer, Body, Left, Right, Content, Button } from 'native-base';
/*-----------------------------------------------------------------
* Component Style                                                 |
*-----------------------------------------------------------------*/
import Style from './DrawMenuStyle';


export default class DrawMenu extends Component{
  constructor(props){
    super(props);

   this.state = {
     user: this.props.navigation.getParam('user')
   }

   console.log(this.state.user);
   
    /*Method binding*/
    this.dismissSide = this.dismissSide.bind(this);
    this.logOut = this.logOut.bind(this);
    this.openOrders = this.openOrders.bind(this);
    this.openBalance = this.openBalance.bind(this);


  }//Constructor End

  /* Close side menu. */
  dismissSide(){
    this.props.navigation.closeDrawer();
  }

  logOut(){
    console.log("Here")
    AsyncStorage.getItem('user')
    .then(
      (query) => {
        let user = JSON.parse(query);
        let url = "http://pidelotu.azurewebsites.net/sign_out/" + user.app_code;
        
        fetch( url, {
          method : 'GET',
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        },
        )
        .then(response => response.json() )
        .then(response => {
          AsyncStorage.removeItem('user');
          this.props.navigation.navigate('LoginStack');
        });
      }
    )
  
   


  }
  openOrders(){
    this.props.navigation.navigate('Orders');
  }

  openBalance(){
    this.props.navigation.navigate('Stripe');
  }

  render(){
    return(
      <Container>
      <ImageBackground
        source={require('src/assets/images/sidebar-background.png')}
        style={{
          width: '100%',
          height: '100%'
        }}>
        <View style={{
          flexDirection: 'column'
        }}>
          <Header noShadow
            style={{
              backgroundColor: 'transparent'
            }}>
            <Right>
              <TouchableWithoutFeedback onPress={this.dismissSide}>
                <Icon name="arrow-left" type='ionicicons' color={'#fff'}  size={25} />
              </TouchableWithoutFeedback>
            </Right>
          </Header>
            <View style={Style.profile}>
              <Image source={{uri: 'https://pidelotu.mx/images/delivery_man/' + global.user.name + '-logo.png'}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  borderWidth: 1,
                  padding: 30,
                  borderColor: '#fff',
                }}
                />
              <Text
                style={{
                  marginTop: 10,
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'Lato-Regular'
                }}>
                {global.user.name}
              </Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontFamily: 'Lato-Regular',
                  alignSelf: 'flex-start',
                  width: 200,
                  marginTop: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff'
                }}>
              </Text>
            </View>
            <View style={{
                marginTop:40,
                flexDirection: 'column',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
              }} >
              <ListItem goTo={this.openOrders} iconName={"book"} iconType={"materialdesignicons"} linkName={"Historial de pedidos"}/>
              <ListItem goTo={this.openBalance}iconName={"dollar"} iconType={"fontawesome"} linkName={"Cuenta"}/>
              <ListItem  goTo={this.logOut}iconName={"times"} iconType={"fontawesome"} linkName={" Cerrar sesión"}/>

            </View>
        </View>
      </ImageBackground>
      </Container>
    )
  }
}


/*-----------------------------------------------------------------
* List Components                                                 |
*-----------------------------------------------------------------*/

export class ListItem extends Component{
  constructor(props){
    super(props);
  }//Constructor End

  render(){
    return(
      <TouchableWithoutFeedback onPress={this.props.goTo}>
        <View style={{
            marginTop:20,
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '90%',
            overflow: 'visible',
          }}>
          <Icon name={this.props.iconName} color={'#fff'}  size={17} />
          <Text style={{
            color: '#fff',
            marginLeft: 10,
            fontSize: 19,
            fontFamily: 'Lato-Regular',
            alignSelf: 'flex-start',
            overflow: 'visible',
          }}>
            {this.props.linkName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
