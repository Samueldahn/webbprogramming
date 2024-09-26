import React from 'react';
import arvidosamuel from './assets/arvidosamuel.jpg'; // Make sure this path is correct

function Home() {
  return (
    <div className="home">
      <h1 className="page-title text-center mb-5">Welcome to Arvid & Samuel</h1>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src={arvidosamuel} alt="Arvid and Samuel" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6">
          <h2 className="mb-4">Making Life Easy, Together</h2>
          <p>We're two friends pursuing our masters in Industrial Engineering and Management, each with our unique passions and specializations.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Samuel Dahn</h3>
              <p className="card-text">An avid sailor and sailing instructor, Samuel enjoys the serenity of the open water as much as the precision of baking bread. His culinary adventures in the kitchen are matched only by his pursuit of knowledge in Supply Chain Management.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Arvid Malm</h3>
              <p className="card-text">A basketball player with a melody in his heart, Arvid combines his love for sports with his passion for songwriting. When he's not on the court or composing tunes, he's crafting cocktails or diving deep into the world of Business and Innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

