'use strict';

//Reflection question 1
console.log('\n--- reflection question 1 ---------------------------------------');
console.log('\nThis is because in js a undefined variable will count as null in any boolean situation');


import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}

//Reflection question 2
console.log('\n--- reflection question 1 ---------------------------------------');
console.log('\nThe two different xamples will give different outputs if the inventory have any inherited properties from the prototype. In that case for ... in will include all inherited properties while for each only will include own properties');


console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  let invArray = Object.entries(inv); // Convert object to array

  return invArray
  .filter(([key, entry]) => entry[prop] === true) // Check if the property exists and is true
  .map(([key, entry]) => `<option value="${key}" key="${key}">${key}, ${entry.price} kr</option>`);
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  constructor(salad) { 
    if(arguments.length>0){
      this.ingredients = {...salad.ingredients};
    }else{
      this.ingredients = {};
    }
  }
  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }
  remove(name) {
    delete this.ingredients[name];
    return this;
  }

  static parse(json) {
    // Parse the JSON string into an object
    let parsedData = JSON.parse(json);

    if (Array.isArray(parsedData)) {
      // If it's an array of salads, parse each one and combine them
      let arrayOfSalads = new Array();
      parsedData.forEach(item => {
        let tempIngredients = item.ingredients;
        arrayOfSalads.push(Salad.parseHelp(tempIngredients));
      });
      return arrayOfSalads;
    } else {
      // If it's a single salad object, parse it directly
      let tempIngredients = parsedData.ingredients;
      return Salad.parseHelp(tempIngredients);
    }
  }

  static parseHelp(tempIngredients) {
    let result = new Salad();
    Object.entries(tempIngredients).forEach(([key, value]) => result.add(key, value));
    return result;
  }
}

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients).reduce((sum, entry) => sum + entry.price,0);
};

Salad.prototype.count = function(prop) {
  return Object.values(this.ingredients).reduce((sum, entry) => entry[prop] ? sum + 1 : sum,0);
};

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
//En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
//En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
//En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------');
console.log('\nSalad');
console.log('Type: ' + typeof Salad);
console.log('Value: ' + Salad);

console.log('\nSalad.prototype');
console.log('Type: ' + typeof Salad.prototype);
console.log('Value: ' + Salad.prototype);

console.log('\nSalad.prototype.prototype');
console.log('Type: ' + typeof Salad.prototype.prototype);
console.log('Value: ' + Salad.prototype.prototype);

console.log('\nmyCaesarSalad');
console.log('Type: ' + typeof myCaesarSalad);
console.log('Value: ' + myCaesarSalad);

console.log('\nmyCaesarSalad.prototype');
console.log('Type: ' + typeof myCaesarSalad.prototype);
console.log('Value: ' + myCaesarSalad.prototype);

console.log('\ncheck 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\nHow are classes and inherited properties represented in JavaScript?');
console.log('Through the prototype chain.');
console.log('\nWhat is the difference between an object’s prototype chain and having a prototype property?');
console.log('Each constructor has a prototype property if not at the end of the prototype chain. This property connects the prototype chain.');
console.log('\nWhich objects have a prototype property?');
console.log('Constructor functions and classes.');
console.log('\nHow do you get the next object in the prototype chain?');
console.log('.prototype');


console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
/*
let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
*/
console.log('\n--- Assignment 6 ---------------------------------------')
/*
console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
*/


//console.log('\n--- reflection question 4 ---------------------------------------');

//console.log('\n--- reflection question 5 ---------------------------------------');

//console.log('\n--- reflection question 6 ---------------------------------------');
