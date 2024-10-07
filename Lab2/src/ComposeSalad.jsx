import { useId } from 'react';
import { useState } from 'react';
import Salad from './Salad.mjs';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

function ComposeSalad(props) {
  const {addSalad } = useOutletContext();
  const navigate = useNavigate();
  const inventory = useLoaderData();
  const inventoryKeys = Object.keys(inventory);

  const foundationList = inventoryKeys.filter(name => inventory[name].foundation).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const proteinList = inventoryKeys.filter(name => inventory[name].protein).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const extraList = inventoryKeys.filter(name => inventory[name].extra)

  const dressingList = inventoryKeys.filter(name => inventory[name].dressing).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  const [extras, setExtras] = useState({});
  const [touched, setTouched] = useState(false);
  const [extraCount, setExtraCount] = useState(0);

  const handleFoundationChange = (event) => {
    setFoundation(event.target?.value); 
  };

  const handleProteinChange = (event) => {
    setProtein(event.target?.value); 
  };
  
  const handleExtraChange = (event) => {
    setExtras(prevExtras => ({
      ...prevExtras,
      [event.target.name]: event.target.checked
    }));

    setExtraCount(prevCount => event.target.checked ? prevCount + 1 : prevCount - 1);
  };

  const handleDressingChange = (event) => {
    setDressing(event.target?.value); 
  };

  
  function Select({ label, value, onChange, options }) {
    const id = useId();
    return (
      <div className="mb-3">
      <div className={touched ? "was-validated" : ""}>
        <label htmlFor={id} className="form-label">{label}</label>
        <select required value={value} onChange={onChange} className="form-select" id={id}>
          <option value="">Gör ditt val</option>
          {options}
        </select>
        <div className="invalid-feedback">Välj en av ingredienserna</div>
        <div className="valid-feedback">Korrekt</div>
      </div>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);

    if (extraCount < 3 || extraCount > 9) {
      return; 
    }

    console.log("efter");

    if(event.target.checkValidity()){
       let mySalad = new Salad()
       .add(foundation, inventory[foundation])
       .add(protein, inventory[protein])
       .add(dressing, inventory[dressing]);
 
     Object.keys(extras).forEach(name => mySalad.add(name, inventory[name]));
     
     addSalad(mySalad);

     setFoundation("");
     setProtein("");
     setDressing("");
     setExtras({});
     setExtraCount(0);
     setTouched("");

     navigate("/view-order/confirm/" + mySalad.uuid);
    }

  };

  const ceasarSallad = (event) => {
    event.preventDefault();

    setFoundation("Sallad");
    setProtein("Kycklingfilé");
    setDressing("Ceasardressing");
    setExtraCount(4);
    setExtras({ Bacon: true, Krutonger: true, Parmesan: true, Gurka: true});
  }

  const resetChoices = (event) => {
    event.preventDefault();

    setFoundation("");
    setProtein("");
    setDressing("");
    setExtraCount(0);
    setExtras({});
  }
  
  return (
    <div className="continer col-12 mb-5">
    
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form noValidate onSubmit={handleSubmit}>

          <Select label="Välj bas" value={foundation} onChange={handleFoundationChange} options={foundationList}/>

          <Select label="Välj protein" value={protein} onChange={handleProteinChange} options={proteinList}/>

          <div className="mb-3">
            <label className="form-label">Välj extra tillbehör</label>
            <div className={`row ${touched && (extraCount >= 3 && extraCount <= 9) ? "was-validated is-valid" : "is-invalid"}`}>
              {extraList.map(extra => (
                <div key={extra} className="col-12 col-md-4 col-lg-3 mb-2">
                  <input
                    type="checkbox"
                    className={`form-check-input ${touched && (extraCount < 3 || extraCount > 9) ? "is-invalid" : ""} ${touched && (extraCount >= 3 && extraCount <= 9) ? "is-valid" : ""}`}
                    id={extra}
                    name={extra}
                    checked={extras[extra] || false} 
                    onChange={handleExtraChange}
                  />
                  <label htmlFor={extra} className="form-check-label">
                    {extra}
                  </label>
                </div>
              ))}
            </div>

            <div className="valid-feedback">{touched && (extraCount >= 3 && extraCount <= 9) ? "Korrekt" : ""}</div>
            <div className="invalid-feedback">{(touched && !(extraCount >= 3 && extraCount <= 9)) ? "Välj minst 3 och max 9 tillbehör" : ""}</div>

          </div>

          <Select label="Välj dressing" value={dressing} onChange={handleDressingChange} options={dressingList}/>

          <input className="mt-4 btn btn-primary" id="order" type="submit" value="Lägg till sallad i varukorg"></input>
          <input className="mt-4 btn btn-secondary" id="ceasar" type="button" value="Ceasarsallad 50kr" onClick={ceasarSallad}></input>
          <input className="mt-4 btn btn-secondary" id="ceasar" type="button" value="Återställ" onClick={resetChoices}></input>

        </form>

      </div>
    </div>
  );
}
export default ComposeSalad;