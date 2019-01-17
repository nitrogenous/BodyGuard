import React from 'react';
import { StyleSheet, Text, AsyncStorage} from 'react-native';
import MenuPage from './components/pages/menuPage/MenuPage.js';
import PausePage from './components/pages/pausePage/PausePage.js';
import QuestionPage from './components/pages/inGamePage/QuestionPage.js';
import AnimationPage from './components/pages/inGamePage/AnimationPage.js';
import GameOverPage from './components/pages/gameOverPage/GameOverPage.js';
import questions from './assets/questions/questions.json';

export default class App extends React.Component {

constructor(props){
	super(props);
	this.state = {
		score: 0,
		health: 100,
		bestScore: 0,
		currentPage: 'menuPage',
		previousPage: 'menuPage',
	
	};
};

componentDidMount() {
	AsyncStorage.getItem('bestScore').then((value) => {
		if(value !== null){
			this.setState({'bestScore': value});
		}
		else{
			this.saveData('bestScore',0);
			this.setState({'bestScore': 0});
		}
	}).done();
}

changePage(currentPage){
	setTimeout(() => {
		this.setState({
			currentPage: currentPage,
		})
	},25);
};

updatePreviousPage(previousPage){
	this.setState({
		previousPage: previousPage,
	});
}

saveData(key,value){
	AsyncStorage.setItem(key.toString(), value.toString());
	this.setState({key: value});
}

updateScore(score){
	let { bestScore } = this.state;
	if(score > bestScore){
		this.setState({bestScore: score,score: score});
		this.saveData('bestScore', score.toString());
	}
	else{
		this.setState({score: score});
	}
}

updateHealth(health){
	this.setState({health: health});
}

randomNumber(min,max){
	let rand = Math.round(min + Math.random() * (max - min));
	return rand;
}

getQuestion(){
	let random = this.randomNumber(1,6);
	let question = JSON.stringify(questions[random]);
	return question;
}

render() {
	const { currentPage } = this.state
		switch (currentPage) {
			case 'menuPage': return <MenuPage 
					health={this.state.health}
					bestScore={this.state.bestScore} 
					page={this.changePage.bind(this)} 
					updateScore={this.updateScore.bind(this)}
					updateHealth={this.updateHealth.bind(this)}
				/>
			case 'animationPage': return <AnimationPage 
					score={this.state.score}
					page={this.changePage.bind(this)} 
					updatePreviousPage={this.updatePreviousPage.bind(this)} 
				/>
			case 'questionPage': return <QuestionPage
					score={this.state.score} 
					health={this.state.health}
					question={this.getQuestion()} 
					page={this.changePage.bind(this)}
					updateScore={this.updateScore.bind(this)} 
					updateHealth={this.updateHealth.bind(this)}
					updatePreviousPage={this.updatePreviousPage.bind(this)} 
				/>
			case 'pausePage': return <PausePage  
					score={this.state.score}
					page={this.changePage.bind(this)} 
					previousPage={this.state.previousPage}
				/>
			case 'gameOverPage': return <GameOverPage
				score={this.state.score}
				bestScore={this.state.bestScore}
				page={this.changePage.bind(this)}
				updateScore={this.updateScore.bind(this)}
			/>
		}
		return <Text style={styles.container}>404 Page Not Found!</Text>
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