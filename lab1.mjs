'use strict';

//Reflection question 1
console.log('\n--- reflection question 1 ---------------------------------------');
console.log('Why don’t we need to store properties with the value false in the JavaScript objects?');
console.log('\nThis is because in js a undefined variable will count as false in any boolean situation');


import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
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
console.log('\n--- reflection question 2 ---------------------------------------');
console.log('When will the two examples above give different outputs, and why is inherited functions, such as forEach(), not printed?');
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
  static instanceCounter = 1;

  constructor(salad) { 
    if(salad){
      this.ingredients = {...salad.ingredients};
    }else{
      this.ingredients = {};
    }
    this.id = 'salad_' + Salad.instanceCounter++;
    this.uuid = uuidv4();

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
        let id = item.id;
        let uuid = item.uuid;
        arrayOfSalads.push(Salad.parseHelp(tempIngredients, id, uuid));
      });
      return arrayOfSalads;
    } else {
      // If it's a single salad object, parse it directly
      let tempIngredients = parsedData.ingredients;
      let id = parsedData.id;
      let uuid = parsedData.uuid;
      return Salad.parseHelp(tempIngredients, id, uuid);
    }
  }

  static parseHelp(tempIngredients, id, uuid) {
    let result = new Salad();
    Salad.instanceCounter--;
    result.id = id;
    result.uuid = uuid;
    result.ingredients = tempIngredients;
    return result;
  }
}

class GourmetSalad extends Salad{
  constructor(salad) {
    super(salad);
  }

  add(name, properties, size = 1) {
    if (!this.ingredients[name]) {
      // If the ingredient is not present, add it with the initial size
      let tempProps = {...properties};
      tempProps.size = size;
      super.add(name, tempProps);
    } else {
      // If the ingredient is already present, update its size and properties
      let existing = {...this.ingredients[name]};
      existing.size = (existing.size || 1) + size;
      super.add(name, existing);  // Update properties
    }
    return this;
  }
}

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients).reduce((sum, entry) => sum + entry.price,0);
};

GourmetSalad.prototype.getPrice = function() {
  return Object.values(this.ingredients).reduce((sum, entry) => sum + (entry.price * (entry.size || 1)),0);
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

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);



console.log('\n--- reflection question 4 ---------------------------------------');
console.log('In which object are static properties stored?');
console.log('In the class itself. In this case Salad.xx');

console.log('\n--- reflection question 5 ---------------------------------------');
console.log('Can you make the id property read only?');
console.log('Yes, by defining the property of id "writable" to false. Not recommended during lectures.');


console.log('\n--- reflection question 6 ---------------------------------------');
console.log('Can properties be private?');
console.log('Yes by using # in the beginning of name of property name');

console.log('\n--- Assignment 7 ---------------------------------------')
console.log('The below printout is a check that creating salad through parse keeps the id and uuid the same.')


let myCaesarSalad2 = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
let stringSalad = JSON.stringify(myCaesarSalad2);
console.log(stringSalad + '\n');
let myCaesarSalad2Copy = Salad.parse(stringSalad);
console.log(JSON.stringify(myCaesarSalad2Copy) + '\n');

let myCaesarSalad3 = new Salad();
console.log(JSON.stringify(myCaesarSalad3));