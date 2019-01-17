import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Font } from 'expo';

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      ready: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      // 'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      // 'Montserrat-BoldItalic': require('../../../assets/fonts/Montserrat-BoldItalic.ttf'),
    }).then(() => {
      this.setState({ready: true})
    })
  };

  changePage(page){
    this.props.page(page)
  };

  updatePreviousPage(previousPage){
    this.props.updatePreviousPage(previousPage)
  }

  render() {
    if(this.state.ready){
      return (
        <View style={styles.header} >
          <View style={styles.headerRow}>
            <Text style={styles.score}>Score: {this.props.score}</Text>
            <TouchableOpacity style={styles.pauseButton} onPress={() => {this.changePage('pausePage'); this.updatePreviousPage(this.props.previousPage)}}>
              <Image style={{width: 30, height: 30}}source={require('../../../assets/images/pause.png')} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else{
      return(
        <Text> Header Loading </Text>
      )
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 30,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pauseButton:{
    flex: 1,
    width: 30,
    height: 30,
    marginRight: 5,
    // position: 'absolute',
    alignItems: 'flex-end',
  },
  score:{
    flex: 1,
    fontSize: 18,
    marginTop: 5,
    color: '#f0f0f0',
    position: 'absolute',
    fontFamily: 'Montserrat',
  },
});

export default Header;