var state={
	/*currentScreen: 0,
	screens: ['start', 'questions', 'end'],*/
	currentQuestion: 1,
	score: {correct: 0, incorrect: 0},
	questions: [
		{	
			question: 'Who is the main protagonist of Dragon Ball Z?',
			answer: 'Goku',
			choices: ['Krillan', 'Vegeta', 'Goku', 'Piccolo']
		},
		{
			question: 'Who is the self-titled "Prince of all Saiyans"?',
			answer: 'Vegeta',
			choices: ['Vegeta', 'Nappa', 'Goku', 'Raditz']
		},
		{
			question: 'What is the name of the dragon, on Earth, that can\n'+
					  'use the dragon balls to grant someone three wishes?',
			answer: 'Shenron',
			choices: ['Falcor', 'Shenron', 'Byakuran', 'Mandragora']
		},
		{
			question: 'Which of these characters is not a Dragon Ball Z Villian?',
			answer: 'Mr. Popo',
			choices: ['Cell', 'Majin-Buu', 'Mr. Popo', 'Frieza']
		},
		{
			question: 'Which of these planets are not used as a setting in Dragon Ball Z?',
			answer: 'Vegeta',
			choices: [ 'Namek', 'Vegeta', 'Earth', 'Mars']
		}
	]
}
var startTemplate =	'<section class="js-start-screen start-screen center">'+
						'<div class="start-button-cell">'+
							'<button class="js-start-button start-button" type="button">Start Quiz</button>'+
						'</div>'+	
					'</section>';

var questionTemplate='<section class="js-questions question-section">'+
						'<header class="question-header">'+
							'<div class="js-question-number question-number"></div>'+
							'<div class="js-quiz-score quiz-score"></div>'+
						'</header>'+
						'<p class="question">Who is the main protagonist of Dragon Ball Z?</p>'+
						'<form id="js-answer-form">'+
						'<p class="js-answer-result answer-result hidden"></p>'+
							'<div><input type="radio" name="quiz-answer" checked required/><label></label></div>'+
							'<div><input type="radio" name="quiz-answer" /><label></label></div>'+
							'<div><input type="radio" name="quiz-answer" /><label></label></div>'+
							'<div><input type="radio" name="quiz-answer" /><label></label></div>'+
							'<button class="submit-button" type="submit">Submit Answer</button>'+
						'</form>'+
						'<button class="js-next-button next-button hidden" type="button">Next Question -></button>'+
					'</section>';

var endTemplate='<section class="js-end-screen end-screen center">'+
						'<div class="end-button-cell">'+
							'<div class="end-display">'+
								'<header class="end-header">Quiz Complete!</header>'+
								'<p class="end-result"><span></span></p>'+
								'<p class="end-words"></p>'+
								'<button class="js-try-again try-again" type="button">Try Again?</button>'+
							'</div>'+
						'</div>'+	
					'</section>';

//State Mutator Functions
function retrieveQuestion(questions, index){
	return questions[index];
}
function getAnswer(questions, index){
	var answer=retrieveQuestion(questions, index).answer;
	var answerIndex=retrieveQuestion(questions, index).choices.indexOf(answer);
	return {answer: answer, answerIndex: answerIndex};
}
function updateScore(score, userAnswer, actualAnswer){
	var correct;
	if(userAnswer===actualAnswer){
		correct=true;
		state.score.correct++;
	}
	else{
		correct=false;
		state.score.incorrect++;
	}

	return correct;
}
function getPercentage(correct, total){
	var percent=(correct/total)*100;
	percent=Math.round(percent*100)/100;

	return percent;
}

function getFeedback(score, totalQuestions){
	
	var feedback;
	var finalScore=getPercentage(score.correct, totalQuestions);
	switch(true){
		case (finalScore === 0):
			feedback='Big goose egg for you huh? Better luck next time....';
			break;

		case (finalScore > 0 || finalScore < 21):
			feedback='I guess you may have seen an episode.... or maybe a meme.';
			break;

		case (finalScore >= 21 || finalScore < 41):
			feedback='I bet you watched DBZ back in the day, but its been a while.';
			break;

		case (finalScore >= 41 || finalScore < 61):
			feedback='Not too bad. You need to go back and watch all 291 episodes '+
			 'before you can claim to be an expert though.';
			 break;

		case (finalScore >= 61 || finalScore < 81):
			feedback='Good job. What? Did you expect more? Next time go for 80% or above then. >.>';
			break;

		case (finalScore >= 81 || finalScore < 100):
			feedback='Okay. Okay. You know your stuff. You are a true fan. I bet your finger must '+
			'have slipped when you chose incorrectly.';
			break;

		case (finalScore === 100):
			feedback='Your power level is over 9000!?!?! Either that is the case... or you looked up the '+
			  'answers on wikipedia! I\'m watching you...... O.O';
			  break;

		default:
			feedback='There was an ERROR...ERROR...error...errorzzzzzz';
			break;
	}

	return {finalScore: finalScore, feedback: feedback};
}

function resetState(state){
	state.currentQuestion=1;
	state.score.correct=0;
	state.score.incorrect=0;
}

//Render Content
function renderStartScreen(){
	return startTemplate;
}

function renderQuestion(questionTemplate, questions, currentQuestion, score){
	var questionElement=$(questionTemplate);
	var question=retrieveQuestion(questions, currentQuestion-1);
	questionElement.find('.js-question-number').text("Question "+currentQuestion+" of "+questions.length);
	questionElement.find('.js-quiz-score').text("Current Score: "+score.correct+" Correct, "+
		score.incorrect+" Incorrect");
	questionElement.children('p').text(""+question.question);
	var formElement=questionElement.find('form');
	/*console.log(formElement);
	console.log(formElement.data());*/
	for(var i=0; i<question.choices.length; i++){
		formElement.children('div:eq('+i+')').children('label').text(""+question.choices[i]);
	}

	return questionElement;
}

function renderEndScreen(endTemplate, score, totalQuestions){
	var endScreenElement=$(endTemplate);
	var feedback=getFeedback(score, totalQuestions);
	endScreenElement.find('.end-result span').text('Final Score: '+feedback.finalScore);
	endScreenElement.find('.end-words').text(feedback.feedback);
	console.log(feedback.feedback);

	return endScreenElement;
}

//Event Handlers
function handleStart(startElement, displayElement, state){
	$(displayElement).on('click', '.js-start-button', function(event){
		$(this).parent().parent().remove();
		$(displayElement).append(renderQuestion(questionTemplate, state.questions, state.currentQuestion, state.score));
	});
	$(displayElement).append(renderStartScreen());
}

function handleSubmitQuestion(submitElement, displayElement, nextElement, state){
	$(displayElement).on('submit', submitElement, function(event){
		event.preventDefault();
		var checkedAnswer=$(this).find('input:radio[name="quiz-answer"]:checked');
		var userAnswer = checkedAnswer.next().text();
		var answerObject=getAnswer(state.questions, state.currentQuestion-1);
		var actualAnswer=answerObject.answer;
		console.log(userAnswer+' : '+actualAnswer);
		var correct=updateScore(state.score, userAnswer, actualAnswer);
		if(correct){
			$(this).children('.js-answer-result').text("That answer is CORRECT!").addClass('correct').removeClass('hidden');
		}
		else{
			$(this).children('.js-answer-result').text("That answer is INCORRECT!").addClass('incorrect').removeClass('hidden');
			checkedAnswer.parent().addClass('incorrect');
		}

		$(this).find('input').addClass('hidden');
		
		var labels=$(this).find('label');
		$(this).find('div').eq(answerObject.answerIndex).addClass('correct');
		$(this).find('label').addClass('label-center');

		$(this).children('.submit-button').addClass('hidden');
		$(nextElement).removeClass('hidden');
	});
}

function handleNextQuestion(nextElement, endElement, displayElement, state){
	$(displayElement).on('click', nextElement, function(event){
		$(this).parent().remove();
		console.log(state.currentQuestion);
		if(++state.currentQuestion <= state.questions.length)
			$(displayElement).append(renderQuestion(questionTemplate, state.questions, state.currentQuestion, state.score));
		else
			$(displayElement).append(renderEndScreen(endTemplate, state.score, state.questions.length));
	});
}

function handleEnd(displayElement){
	$(displayElement).on('click', '.js-try-again', function(event){
		resetState(state);
		$(this).parent().parent().parent().remove();
		$(displayElement).append(renderStartScreen());
	});
}

$(document).ready(function(){
	var displayElement='.js-display-screen';
	var startElement='.js-start-screen';
	var submitElement='#js-answer-form';
	var nextElement='.js-next-button';
	var questionsElement='.js-questions'
	var endElement='.js-end-screen';

	handleEnd(displayElement);
	handleNextQuestion(nextElement, endElement, displayElement, state);
	handleSubmitQuestion(submitElement, displayElement, nextElement, state);
	handleStart(startElement, displayElement, state);
});