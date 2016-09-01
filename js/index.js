var $ = require('jquery');

$(document).ready(function() {
  const pantry = new Pantry();
  pantry.addIngredients('strong', [
    'glug of rum',
    'slug of whisky',
    'splash of gin',
  ]);
  pantry.addIngredients('salty', [
    'olive on a stick',
    'salt-dusted rim',
    'rasher of bacon',
  ]);
  pantry.addIngredients('bitter', [
    'shake of bitters',
    'splash of tonic',
    'twist of lemon peel',
  ]);
  pantry.addIngredients('sweet', [
    'sugar cube',
    'spoonful of honey',
    'splash of cola',
  ]);
  pantry.addIngredients('fruity', [
    'slice of orange',
    'dash of cassis',
    'cherry on top',
  ]);

  const bartender = new BarTender(pantry);
  bartender.addQuestion('strong','Do ye like yer drinks strong?');
  bartender.addQuestion('salty','Do ye like it with a salty tang?');
  bartender.addQuestion('bitter','Are ye a lubber who likes it bitter?');
  bartender.addQuestion('sweet','Would ye like a bit of sweetness with yer poison?');
  bartender.addQuestion('fruity','Are ye one for a fruity finish?');

  bartender.renderQuestions();

  $('#make-drink').click(function(){
    bartender.makeDrink();
  });
  

});

class BarTender {
  constructor(pantry) {
  this.questions = new Map();
  this.pantry = pantry;
  this.questionsContainer = $('ul');
  this.prefCategories = [];
  }

  addQuestion(category, question) {
    this.questions.set(category, question);
  }

  getQuestion(category) {
    this.questions.get(category);
  }
  makeDrink(){
    let drinkIngredients = [];
    this.prefCategories.forEach(category => {
      drinkIngredients.push(this.pantry.getRandom(category));
    });
    $('#drink').text('Enjoy your drink :'+drinkIngredients.join());
  }

  renderQuestions() {
    this.questionsContainer.empty();
    this.questions.forEach((question,category) => {
      const li = $('<li>'+question+'</li>'+
        '<input type="radio" id="'+category+'no" name="'+category+'" value="no" checked>No</input>'+
        '<input type="radio" id="'+category+'yes" name="'+category+'" value="yes"/>Yes</input>');
        this.questionsContainer.append(li);
        $("input[name="+category+"]").click(event => {
          const userAnswer = event.target.value;
          if(userAnswer === 'yes'){         
            this.prefCategories.push(event.target.name);
          }
        });
    });     
  }
}

class Pantry {
  constructor() {
    this.ingredients = new Map();
  }

  addIngredients(category, list) {
    this.ingredients.set(category, new Ingredients(list));
  }

  getIngredients(category) {
    return this.ingredients.get(category);
  }

  getRandom(category) {
    return this.ingredients.get(category).getRandom();
  }

  getIngredientCategories() {
    return this.ingredients.keys();
  }
}

class Ingredients {
  constructor(list) {
    this.list = list;
  }

  getRandom() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  }
}

