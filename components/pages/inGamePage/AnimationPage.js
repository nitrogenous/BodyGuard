import React, { Component } from 'react';
import { StyleSheet, Text, Animated, View, Image, TouchableOpacity } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Font } from 'expo';
import TimerMixin from 'react-timer-mixin';
import Header from './Header.js';


class AnimationPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      ready: false,
      score: 0,
      source: require('../../../assets/images/pulseLine.png'),
      fadeAnim: new Animated.Value(0.90),
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      // 'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      // 'Montserrat-BoldItalic': require('../../../assets/fonts/Montserrat-BoldItalic.ttf'),
    }).then(() => {
      this.setState({ready: true})
    });
    Animated.timing(this.state.fadeAnim,{
        toValue: 1,
        duration: 300,
      }
    ).start();  
   this.pulseAnimation();
  }

  pulseAnimation(){
   setTimeout(() => {this.changePage('questionPage'); },2000);
    setTimeout(() => {
      this.setState({source: require('../../../assets/images/pulseSecond.png')});
      setTimeout(() => {
        this.setState({source: require('../../../assets/images/pulseLine.png')});
        setTimeout(() => {
          this.setState({source: require('../../../assets/images/pulseFirst.png')});
          setTimeout(() => {
            this.setState({source: require('../../../assets/images/pulseLine.png')});              
          },250);
        },500);
      },250);
    },500);
  }

  componentWillUnmount(){
    clearTimeout();
  }

  // pulseAnimation(){
  //   this.setState({pulseImage: require('../../../assets/images/pulse2.png'), pulseAnimation: !this.state.pulseAnimation});
  // }

  changePage(page){
    this.props.page(page)
  }

  updatePreviousPage(previousPage){
    this.props.updatePreviousPage(previousPage)
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
      return(
        <Animated.View style={this.loadingAnimation()}>
          <Header score={this.props.score} page={this.changePage.bind(this)} updatePreviousPage={this.updatePreviousPage.bind(this)} previousPage='animationPage' />
          <Image style={{width: 175, height: 175,alignSelf: 'center',position: 'absolute'}} source={this.state.source} />
        </Animated.View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <Text> Animation Page Loading </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ca3951',
  },
});


export default AnimationPage;