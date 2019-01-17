import React, { Component } from 'react';
import { StyleSheet, Text, Animated, View, Image, TouchableOpacity } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Font } from 'expo';


class PausePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      ready: false,
      fadeAnim: new Animated.Value(0.90),
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      // 'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      // 'Montserrat-BoldItalic': require('../../../assets/fonts/Montserrat-BoldItalic.ttf'),
    }).then(() => {
      this.setState({ready: true});
    });
    Animated.timing(this.state.fadeAnim,{
      toValue: 1,
      duration: 300,
    }).start();  
  };

  componentWillUnmount(){
  }


  changePage(page){
    this.props.page(page)
  };

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
    const { score } = this.props;
    if(this.state.ready){      
      return (
        <Animated.View style={this.loadingAnimation()}>
          <View style={styles.container} >
            <Text style={styles.score} >
              Score: {score}
            </Text>
          </View>
          <View style={styles.buttonSection} >
          <TouchableOpacity onPress={() => this.changePage(this.props.previousPage)}>
            <Text  style={styles.button}  >
              Resume
            </Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.changePage('menuPage')}>
            <Text style={styles.button}>
              Main Menu
            </Text>
          </TouchableOpacity>
          </View>
        </Animated.View>
      );
    }
    else{
      return(
        <View style={styles.container}>
          <Text> Pause Page Loading </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ca3951',
  },
  score: {
    fontSize: 32,
    color: '#f0f0f0',
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  buttonSection: {
    flex: 0.35,
  },
  button:{
    width: 300,
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



export default PausePage;