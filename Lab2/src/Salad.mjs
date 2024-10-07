'use strict';


import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';

const names = Object.keys(inventory);


function makeOptions(inv, prop) {
  let invArray = Object.entries(inv); 
  return invArray
  .filter(([key, entry]) => entry[prop] === true) 
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
    let parsedData = JSON.parse(json);
    if (Array.isArray(parsedData)) {
      let arrayOfSalads = new Array();
      parsedData.forEach(item => {
        let tempIngredients = item.ingredients;
        let id = item.id;
        let uuid = item.uuid;
        arrayOfSalads.push(Salad.parseHelp(tempIngredients, id, uuid));
      });
      return arrayOfSalads;
    } else {
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
      let tempProps = {...properties};
      tempProps.size = size;
      super.add(name, tempProps);
    } else {
      let existing = {...this.ingredients[name]};
      existing.size = (existing.size || 1) + size;
      super.add(name, existing); 
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