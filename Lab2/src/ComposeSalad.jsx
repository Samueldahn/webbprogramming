import { useId } from 'react';
import { useState } from 'react';
import Salad from './Salad.mjs';



function ComposeSalad(props) {
  const inventoryKeys = Object.keys(props.inventory);
  // const inventory = Object.entries(props.inventory);


  const foundationList = inventoryKeys.filter(name => props.inventory[name].foundation).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const proteinList = inventoryKeys.filter(name => props.inventory[name].protein).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const extraList = inventoryKeys.filter(name => props.inventory[name].extra)

  const dressingList = inventoryKeys.filter(name => props.inventory[name].dressing).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtras] = useState({});

  const handleFoundationChange = (event) => {
    setFoundation(event.target?.value); 
  };

  const handleProteinChange = (event) => {
    setProtein(event.target?.value); 
  };
  
  const handleExtraChange = (event) => {
    setExtras(prevExtras => ({
      ...prevExtras,
      [event.target.name]: event.target.checked // Update the state of the selected extra
    }));
  };

  const handleDressingChange = (event) => {
    setDressing(event.target?.value); 
  };

  function Select({ label, value, onChange, options }) { //denna ska läggas separat i en annan fil och passa allt som props
    const id = useId();
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">{label}</label>
        <select value={value} onChange={onChange} className="form-select" id={id}>
          <option value="">Gör ditt val</option>
          {options}
        </select>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let mySalad = new Salad()
      .add(foundation, props.inventory[foundation])
      .add(protein, props.inventory[protein])
      .add(dressing, props.inventory[dressing]);

    Object.keys(extras).forEach(name => mySalad.add(name, props.inventory[name]));
    
    props.onSubmit(mySalad);

    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtras({});
  };

  const ceasarSallad = (event) => {
    event.preventDefault();

    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtras({ Bacon: true, Krutonger: true, Parmesan: true, Gurka: true});
  }

  const resetChoices = (event) => {
    event.preventDefault();

    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtras({});
  }

  
  
  return (
    <div className="continer col-12 mb-5">
    
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form className="col-md-12" onSubmit={handleSubmit}>

          <Select required label="Välj bas" value={foundation} onChange={handleFoundationChange} options={foundationList}/>
          
          <Select required label="Välj protein" value={protein} onChange={handleProteinChange} options={proteinList}/>

          <div className="mb-3">
            <label className="form-label">Välj extra tillbehör</label>
            <div className="row">
              {extraList.map(extra => (
                <div key={extra} className="col-12 col-md-4 col-lg-3 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={extra}
                    name={extra}
                    checked={extras[extra] || false} // Check if the extra is selected
                    onChange={handleExtraChange} // Handle checkbox change
                  />
                  <label htmlFor={extra} className="form-check-label">
                    {extra}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Select required label="Välj dressing" value={dressing} onChange={handleDressingChange} options={dressingList}/>


          <input className="mt-4 btn btn-primary" id="order" type="submit" value="Lägg till sallad i varukorg"></input>
          <input className="mt-4 btn btn-secondary" id="ceasar" type="button" value="Ceasarsallad 50kr" onClick={ceasarSallad}></input>
          <input className="mt-4 btn btn-secondary" id="ceasar" type="button" value="Återställ" onClick={resetChoices}></input>



        </form>

      </div>
    </div>
  );
}
export default ComposeSalad;