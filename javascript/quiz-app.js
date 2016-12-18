var state={
	currentScreen: 0,
	screens: [{name: 'start', element: '.js-start-screen'}, 
				{name: 'questions', element: '.js-questions'}, 
				{name: 'end', element: '.js-end-screen'}],
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

var questionTemplate='<section class="js-question question-section">'+
						'<header class="question-header">Question 1 of 5</header>'+
						'<p>Who is the main protagonist of Dragon Ball Z?</p>'+
						'<form id="js-answer-form">'+
						'<p class="js-answer-result hidden"></p>'+
							'<input type="radio" name="quiz-answer" checked required/><label></label>'+
							'<input type="radio" name="quiz-answer" /><label></label>'+
							'<input type="radio" name="quiz-answer" /><label></label>'+
							'<input type="radio" name="quiz-answer" /><label></label>'+

							'<button type="submit">Submit</button>'+
						'</form>'
					'</section>';

var endTemplate='<section class="js-end-screen end-screen center">'+
						'<div class="end-button-cell">'+
							'<div class="end-display">'+
								'<header class="end-header">Quiz Complete!</header>'+
								'<p class="end-result"><span>Final Score:</span></p>'+
								'<p class="end-words"></p>'+
							'</div>'+
						'</div>'+	
					'</section>';

//State Mutator Functions
function retrieveQuestion(questions, index){
	return questions[index];
}
function getAnswer(questions, index){
	return retrieveQuestion(questions, index).answer;
}
function updateScore(score, answer){
	if(answer==='correct')
		score.correct+=1;
	else
		score.incorrect-=1;
}

//Render Content
function renderScreen(previousScreen, newScreen){
	if(previousScreen!==null)
		$(previousScreen).remove();
	alert(newScreen);
	switch(newScreen){
		case 'start':
			newScreen=renderStartScreen(startTemplate);
			break;

		case 'questions':
			newScreen=renderQuestion(questionTemplate, state.questions, state.currentQuestion);
			break;

		case 'end':
			newScreen=renderEndScreen(endTemplate);
			break;

		default:
			newScreen=renderStartScreen(startTemplate);
			break;
	}
	alert(newScreen);
	return newScreen;
}

function renderQuestion(questionTemplate, questions, currentQuestion){
	var questionElement=$(questionTemplate);
	var question=retrieveQuestion(questions, currentQuestion-1);
	questionElement.find('header').text("Question "+currentQuestion+" of "+questions.length);
	questionElement.find('p').text(""+question.question);
	var formElement=questionElement.find('form');
	/*console.log(formElement);
	console.log(formElement.data());*/
	for(var i=0; i<question.choices.length; i++){
		formElement.children('label:eq('+i+')').text(""+question.choices[i]);
	}

	return questionElement;
}

function renderStartScreen(startTemplate){
	return startTemplate;
}

function renderEndScreen(){

}

//Event Handlers
function handleScreenChange(displayElement, state){
	var screens=state.screens;
	var screen=state.currentScreen;
	var renderedScreen="";
	var runOnce=false;
	while(state.currentScreen<screens.length){
		if(screen===0 && !runOnce){
			renderedScreen=renderScreen(null, screens[screen].name);
			//alert(renderedScreen);
			//alert(displayElement);
			$(displayElement).append(renderedScreen);
			sleep(500);
			//alert('Why!!!!!!!!!!!');
			runOnce=true;
		}
		else if(screen!==state.currentScreen){
			renderedScreen=renderScreen(displayElement, screens[screen].name, screens[state.currentScreen].name);
			screen=state.currentScreen;
			alert('hi diddle diddle');
			$(displayElement).append(renderedScreen);
			//while(screen!==state.currentScreen){}
		}
		//alert('hi diddle diddle 2');
	}
}

function handleStart(startElement, displayElement, state){
	$(displayElement).on('click', startElement+' button', function(event){
		/*$(this).parent().parent().remove();
		$(questionElement).append(renderQuestion(questionTemplate, state.questions, state.currentQuestion));*/
		state.currentScreen+=1;
		alert(state.currentScreen);
	});
}

function handleSubmitQuestion(submitElement, nextElement){
	$(submitElement).submit(function(event){
		console.log('Grr');
		event.preventDefault();
		console.log('Grr');
		/*var userAnswer = $(this).children('input:radio[name="quiz-answer"]:checked').val();
		var actualAnswer=getAnswer(state.questions, currentQuestion-1);
		if(userAnswer===actualAnswer)
			$(this).children('.js-answer-result').text("That answer is CORRECT!").addClass('correct').removeClass('hidden');
		else
			$(this).children('.js-answer-result').text("That answer is INCORRECT!").addClass('incorrect').removeClass('hidden');*/
		//$('.js-questions').removeClass('hidden');
		return false;
	});
}

/*function handleNextQuestion(){
	$('.start-button-cell').on('click', 'button', function(event){
		$(this).parent().parent().remove();
		$('.js-questions').removeClass('hidden');
	});
}*/

$(document).ready(function(){
	var displayElement='.js-display-screen';
	var startElement='.js-start-screen';
	var submitElement='#js-answer-form';
	var nextElement='.js-next-button';
	var questionsElement='.js-questions'
	var endElement='.js-end-screen';

	handleStart(startElement, displayElement, state);
	//handleSubmitQuestion(submitElement, nextElement);
	//handleNextQuestion(nextElement, questionElement);
	handleScreenChange(displayElement, state);
});