import React, { Component } from 'react';
import { StyleSheet, Text,Animated, View, Image, TouchableOpacity } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Accelerometer, Font } from 'expo';
import TimerMixin from 'react-timer-mixin';
import Header from './Header.js';

class QuestionPage extends Component {

	constructor(props){
	  super(props);
	  this.state = {
	  	ready: false,
	  	question: '',
	  	answer: '',
	  	damage: 0,
	  	options: {
	  		a: '',
	  		b: '',
	  		c: '',
	  	},
	  	buttons:{
	  		a: '#f0f0f0',
	  		b: '#f0f0f0',
	  		c: '#f0f0f0',
	  	},
	    fadeAnim: new Animated.Value(0.90),
	  }
	}

	async componentDidMount() {
		if(!this.checkHealth(this.props.health)){
			this.changePage('gameOverPage');
		}
		await Font.loadAsync({
	    	'Montserrat': require('../../../assets/fonts/Montserrat-Regular.ttf'),
	    	// 'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
	    	// 'Montserrat-BoldItalic': require('../../../assets/fonts/Montserrat-BoldItalic.ttf'),
		}).then(() => {
	    	this.setState({ready: true})
	    	this.parseQuestion(this.props.question);
	  	});
  	Animated.timing(this.state.fadeAnim,{
        toValue: 1,
        duration: 300,
      }
		).start();  
	}

	componentWillUnmount(){
		clearTimeout();
	}

	parseQuestion(question){
		let parsedQuestion = JSON.parse(question);
		this.setState({
			question: parsedQuestion['question'],
			answer: parsedQuestion['answer'],
			damage: Number(parsedQuestion['damage']),
			options: {
				a: parsedQuestion['options']['a'],
				b: parsedQuestion['options']['b'],
				c: parsedQuestion['options']['c'],
			}
		});
	}

	answerProcess(usersAnswer){
		let { answer, damage } = this.state;
		let { score,health } = this.props;
		if(this.checkAnswer(answer,usersAnswer)){
			score += 5;
			this.updateScore(score);
			this.setState({buttons: {[usersAnswer]: '#adf1bb'}})
			setTimeout(() => {this.changePage('animationPage')},250);
		}
		else{
			if(this.checkHealth(health-damage)){
				health -= damage;
				this.props.updateHealth(health);
				this.setState({buttons: {[usersAnswer]: '#b6c3f2'}})
				setTimeout(() => {this.changePage('animationPage')},250);
			}
			else{
				this.changePage('gameOverPage');
				this.updateHealth(100);
			}
		}
	}

	checkHealth(health){
		if((health > 0) && (health <= 100)){
			return true;
		}
		else{
			return false;
		}
	}

	checkAnswer(answer,usersAnswer){
		if(answer === usersAnswer){
			return true;
		}
		else{
			return false;
		}
	}

	updateHealth(health){
		this.props.updateHealth(health);
	}

	updateScore(score){
		this.props.updateScore(score);
	}

	changePage(page){
	  this.props.page(page);
	}

	updatePreviousPage(previousPage){
	  this.props.updatePreviousPage(previousPage);
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

	buttonAnimation(buttonName){
		return {
			width: 300,
			height: 50,
			maxHeight: 100,
			maxWidth: 300,
			fontSize: 20,
			lineHeight: 50,
			borderRadius: 5,
			color: '#ca3951',
			marginBottom: 7.5,
			overflow: 'hidden',
			textAlign: 'center',
			fontFamily: 'Montserrat',
			backgroundColor: this.state.buttons[buttonName],
		}
	}

	render() {
		if(this.state.ready){
			const { question, options } = this.state
			return (
				<Animated.View style={this.loadingAnimation()}>
					<Header score={this.props.score}  page={this.changePage.bind(this)}  updatePreviousPage={this.updatePreviousPage.bind(this)} previousPage='questionPage' />
					<View style={styles.questionView} >
						<View style={styles.questionBar} ></View>
						<Text style={styles.questionText} > 
							{question}
						</Text>
						<View style={styles.questionBar} ></View>
					</View>
					<View style={styles.buttons} >
						<TouchableOpacity onPress={() => {this.answerProcess('a');}}>
							<Text  style={this.buttonAnimation('a')}>
								{options['a']}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {this.answerProcess('b')}}>
							<Text  style={this.buttonAnimation('b')}>
								{options['b']}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {this.answerProcess('c')}}>
							<Text  style={this.buttonAnimation('c')}>
								{options['c']}
							</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			);
		}
		else{
			return(
				<View style={styles.container} >
					<Text> Question Page Loading </Text>
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
 	questionView: {
 		flex: 2,
 		alignItems: 'center',
  		// position: 'relative',
  	},
  	questionBar:{

  		width: 325,
  		height: 1.5,
  		backgroundColor: '#f0f0f0',
  	},
	questionText:{
		maxWidth: 300,
		maxHeight: 250,
	    fontSize: 15.5,
	    color: '#f0f0f0',
	    textAlign: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		fontFamily: 'Montserrat', 
	},
	buttons: {
  		flex: 2,
		// position: 'absolute',
	},
	button:{
		width: 300,
		height: 50,
		maxHeight: 100,
		maxWidth: 300,
		fontSize: 20,
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




export default QuestionPage;