'use strict';


import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';

const names = Object.keys(inventory);


function makeOptions(inv, prop) {
  let invArray = Object.entries(inv); // Convert object to array

  return invArray
  .filter(([key, entry]) => entry[prop] === true) // Check if the property exists and is true
  .map(([key, entry]) => `<option value="${key}" key="${key}">${key}, ${entry.price} kr</option>`);
}


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


export default Salad;