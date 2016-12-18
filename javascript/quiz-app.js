var state={
	currentScreen: 0,
	screens: ['start', 'questions', 'end'],
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

//Event Handlers
function handleStart(startElement, questionElement){
	$(startElement).on('click', 'button', function(event){
		$(this).parent().parent().remove();
		$(questionElement).append(renderQuestion(questionTemplate, state.questions, state.currentQuestion));
	});
}

function handleSubmitQuestion(submitElement, nextElement){
	$(submitElement).submit(function(event){
		console.log('WTF!');
		event.preventDefault();
		console.log('WTF!');
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
	var questionElement='.js-reveal-questions';
	var startElement='.js-start-screen';
	var submitElement='#js-answer-form';
	var nextElement='.js-next-button';

	handleStart(startElement, questionElement);
	handleSubmitQuestion(submitElement, nextElement);
	//handleNextQuestion(nextElement, questionElement);
});