import { useState } from 'react';

function ComposeSalad(props) {
  const inventory = Object.keys(props.inventory);

  const foundationList = inventory.filter(name => props.inventory[name].foundation).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const proteinList = inventory.filter(name => props.inventory[name].protein).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const extraList = inventory.filter(name => props.inventory[name].extra)

  const dressingList = inventory.filter(name => props.inventory[name].dressing).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  const [foundation, setFoundation] = useState("Sallad");
  const [protein, setProtein] = useState("Kycklingfilé");
  const [dressing, setDressing] = useState("Ceasardressing");
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

  function Select({ label, value, onChange, options }) {
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <select value={value} onChange={onChange} className="form-select">
          {options}
        </select>
      </div>
    );
  }
  
  return (
    <div className="continer col-12">
    <div className="row h-200 p-5 bg-light border rounded-3">
    <h2>Varukorgen</h2>
      <div>

      </div>
    </div>

      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form className="col-md-12">

          <Select label="Välj bas" value={foundation} onChange={handleFoundationChange} options={foundationList}/>
          
          <Select label="Välj protein" value={protein} onChange={handleProteinChange} options={proteinList}/>

          {/* <Select label="Välj dressing" value={dressing} onChange={handleDressingChange} options={dressingList}/> */}

          {/* <label htmlFor="protein" className="form-label">Välj protein</label>
          <select value={protein} onChange={handleProteinChange} className="form-select" id="protein">
            {proteinList}
          </select> */}

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

          <label htmlFor="dressing" className="form-label">Välj dressing</label>
          <select value={dressing} onChange={handleDressingChange} className="form-select" id="dressing">
            {dressingList}
          </select>

          <input className="mt-4 btn btn-primary" id="order" type="submit" value="Beställ"></input>

        </form>

      </div>
    </div>
  );
}
export default ComposeSalad;