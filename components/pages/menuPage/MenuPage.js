import React, { Component } from 'react';
import { StyleSheet, Text, Animated, View, ImageBackground, TouchableOpacity } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Accelerometer, Font } from 'expo';


class MenuPage extends Component {

constructor(props){
  super(props);
  this.state = { 
    ready: false,
    accelerometerData: {},
    fadeAnim: new Animated.Value(0.90),
  };
}

 async componentDidMount() {
  await Font.loadAsync({
    'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    // 'Montserrat-Bold': require(../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../../../assets/fonts/Montserrat-BoldItalic.ttf'),
    }).then(() => {
      this.setState({ready: true})
    })
    this._subscription = Accelerometer.addListener(accelerometerData => {
      Accelerometer.setUpdateInterval(20); 
      this.setState({ accelerometerData });
    });  
    Animated.timing(this.state.fadeAnim,{
        toValue: 1,
        duration: 300,
      }
    ).start();  
  }

  changePage(page){
    this.props.page(page)
  }

  updateScore(score){
    this.props.updateScore(score);
  }

  updateHealth(health){
    this.props.updateHealth(health);
  }

  componentWillUnmount(){
    Expo.Accelerometer.removeAllListeners();
  }

  loadingAnimation(){
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ca3951',
      opacity: this.state.fadeAnim,
    }
  }

  render() {
    if(this.state.ready){
      let { x, y, z } = this.state.accelerometerData;
      return (
        <Animated.View style={this.loadingAnimation()}>
          <ImageBackground style={{alignSelf: 'stretch', right: (round(x) + round(y)), top: round(z), position: 'absolute',width: vw(110),height: vh(110),opacity: 0.50}}source={require('../../../assets/backgroundLayers/multipleCell.png')} />
          <ImageBackground style={{alignSelf: 'stretch', left:( round(x) + round(y)), top: round(z), position: 'absolute',width: vw(110),height: vh(110),opacity: 0.15}}source={require('../../../assets/backgroundLayers/bigCell.png')} />
          <View id='logo' style={styles.logoSection}>
            <Text style={styles.body}> Body</Text>
            <Text style={styles.guard}> Guard</Text>
          </View>
          <View id='buttons' style={styles.buttonSection}>
            <Text style={styles.bestScore}>Best Score: {this.props.bestScore}</Text>
            <TouchableOpacity
              onPress={() => {
                this.updateScore(0);
                this.updateHealth(100);
                this.changePage('questionPage'); 
              }} 
            >
              <Text style={styles.button}> 
                Play 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button}>
                Tutorial
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button}> 
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
    else{
      return (
        <View style={styles.container}>
          <Text> Loading</Text>
        </View>
      );
    }
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return (n.toFixed(2)*15);
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ca3951',
  },
  logoSection:{
    marginTop: 50,
    marginBottom: -75,
    position: 'relative',
    justifyContent:'center',
  },
  body:{
    fontSize: 65,
    marginLeft: -25,
    color: '#f0f0f0',
    fontFamily: 'Montserrat',
  },
  guard:{
    fontSize: 70,
    marginLeft: 50,
    marginTop: -15,
    color: '#f0f0f0',
    fontFamily: 'Montserrat-BoldItalic',
  },
  buttonSection:{
    marginTop: 200,
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestScore:{
    fontSize: 18,
    color: '#f0f0f0',
    marginBottom: 18,
  },
  button:{
    width: 250,
    height: 50,
    fontSize: 30,
    lineHeight: 50,
    borderRadius: 5,
    color: '#ca3951',
    marginBottom: 7.5,
    overflow: 'hidden',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    backgroundColor: '#f0f0f0',
  }
});



export default MenuPage;