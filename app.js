'strict'

// What does this app need to do
// I need a Constructor for the Objects (Pokemon) ------X
// I need to randomize the images that are displayed
// I need to display images from a folder
// I need to make sure each image gets seen at least once.
// I need it to register how many times each image is clicked.
// I need it to stop registering clicks and randomizing images after a certain number of votes


//--------------------Global Variables----------------//

Pokemon.pokemonArray = [];
var totalClicks = 0;
var display = document.getElementById('Pokemon-Gallery')

//-----------------Constructor------------------------// 
function Pokemon(name, url) {
  this.name = name;
  this.url = `Images/${url}`;
  this.timesShown = 0;
  this.clicks = 0;

  Pokemon.pokemonArray.push(this);
};

//-----------------Pokemon Randomizer-----------------//
function randomizePokemon() { //Fishers Yates Shuffle Algorithm (Not Mine!)
  let x = Pokemon.pokemonArray.length;
  let y = 0;
  let z; //z Swaps Index Values
  while(x--) {
    y = Math.floor(Math.random() * (x + 1));
    z = Pokemon.pokemonArray[x];
    Pokemon.pokemonArray[x] = Pokemon.pokemonArray[y];
    Pokemon.pokemonArray[y] = z;
  }
  let pokemon1 = Pokemon.pokemonArray[0];
  let pokemon2 = Pokemon.pokemonArray[1];
  let pokemon3 = Pokemon.pokemonArray[2];

  display.innerHTML = '';
  pokemon1.imageDisplay();
  pokemon2.imageDisplay();
  pokemon3.imageDisplay();
}

//-------------------Pokemon Image Display-------------//
Pokemon.prototype.imageDisplay = function() {
  let pokemonList = document.createElement('li');
  let pokemonImage = document.createElement('img');

  pokemonImage.src = this.url;
  pokemonImage.id = this.name;

  pokemonList.appendChild(pokemonImage);
  display.appendChild(pokemonList);

  this.timesShown++
};

//--------------------Event Listener-------------------//
display.addEventListener('click', handleClick);


//--------------------Event Handler--------------------//
function handleClick(event) {
  event.preventDefault();
  console.log(totalClicks++, event.target);

  for (let i = 0; i < Pokemon.pokemonArray.length; i++) {
    if (Pokemon.pokemonArray[i].url === event.target.getAttribute('src')) {
      Pokemon.pokemonArray[i].clicks++;
      console.log(Pokemon.pokemonArray[i]);
    }
  }
  randomizePokemon();

  if(totalClicks === 25){
    display.removeEventListener('click', handleClick);
    displayResults();
    displayChart();
  }
}


//---------------------Results----------------------//
function displayResults() {
  let resultsEl = document.getElementById("Results");

  for(let i = 0; i < Pokemon.pokemonArray.length; i++) {
    let resultsCreate = document.createElement('li');
    resultsCreate.innerHTML = Pokemon.pokemonArray[i].name + ' had ' + Pokemon.pokemonArray[i].clicks + ' votes and was shown ' + Pokemon.pokemonArray[i].timesShown + ' times. '
    resultsEl.appendChild(resultsCreate);
  }
}


//---------------------Pokemon---------------------//
new Pokemon('Blastoise', 'Blastoise.png');
new Pokemon('Blaziken', 'Blaziken.png');
new Pokemon('Braixen', 'Braixen.png');
new Pokemon('Charizard', 'Charizard.png');
new Pokemon('Chesnaught', 'Chesnaught.png');
new Pokemon('Emboar', 'Emboar.png');
new Pokemon('Empoleon', 'Empoleon.png');
new Pokemon('Feraligatr', 'Feraligatr.png');
new Pokemon('Greninja', 'Greninja.png');
new Pokemon('Infernape', 'Infernape.png');
new Pokemon('Meganium', 'Meganium.png');
new Pokemon('Samurott', 'Samurott.png');
new Pokemon('Sceptile', 'Sceptile.png');
new Pokemon('Serperior', 'Serperior.png');
new Pokemon('Swampert', 'Swampert.png');
new Pokemon('Torterra', 'Torterra.png');
new Pokemon('Typhlosion', 'Typhlosion.png');
new Pokemon('Venusaur', 'Venusaur.png');



//---------------------Chart--------------------------//
function displayChart() {
  let chartEl = document.getElementById("Results-Chart");
  chartEl.innerHTML = '';
  
// This variable pokemonNames loops through the object names property to be able to supply it as a dataset
  let pokemonNames = [];
  for (let i = 0; i < Pokemon.pokemonArray.length; i++) {
    pokemonNames.push(Pokemon.pokemonArray[i].name);
  }
// The variable pokemonClicks loops through the object clicks property to be able to supply it as a dataset
  let pokemonClicks = [];
  for (let i=0; i < Pokemon.pokemonArray.length; i++) {
    pokemonClicks.push(Pokemon.pokemonArray[i].clicks);
  }
// This variable pokemonAppearances loops through the object clicks property to be able to supply it as a dataset.
  let pokemonAppearances = [];
  for (let i = 0; i < Pokemon.pokemonArray.length; i++) {
    pokemonAppearances.push(Pokemon.pokemonArray[i].timesShown);
  }

  let ctx = chartEl.getContext('2d');
  for (let i = 0; i < Pokemon.pokemonArray.length; i++) {
  }


  let resultsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pokemonNames,
      datasets:[{
        label: 'Tallies', 
        data: pokemonClicks,
        backgroundColor: 'yellow',
      }, {
        label: 'Appearances',
        data: pokemonAppearances,
        backgroundColor: 'purple',
      }],
    },
    options: {
      scales:{ 
        y: {
          beginAtZero: true,
          
        }
      }
    }
  });
}

//---------------------Invoke Functions---------------//
console.log(Pokemon.pokemonArray);
randomizePokemon();
