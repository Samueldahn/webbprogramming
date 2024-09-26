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
          <p>We’re two friends, each with a passion for Industrial Engineering and Management, united by our academic journey but defined by our unique interests. While one of us thrives in the world of supply chains and sailing, the other is driven by innovation, basketball, and music. Together, we push each other to see the world—and our field—through different lenses.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Samuel Dahn</h3>
              <p className="card-text">Samuel is an avid sailor, drawn to the tranquility of open waters where he can navigate with precision and patience—skills that also define his approach to Supply Chain Management. Sailing has taught him the importance of adaptability and steady focus, values he carries into his studies. Whether he’s steering a boat through unpredictable waters or optimizing a complex supply chain, Samuel excels at finding balance and flow in systems that require attention to detail and a calm mindset. His love for precision extends to the kitchen, where baking bread has become another passion. Just like in sailing, baking demands meticulous planning, timing, and a deep understanding of how various components work together to achieve the perfect result. Each culinary adventure is not only an opportunity to unwind but also a way to reinforce the principles of logistics and resource management that are central to his academic focus. To Samuel, the kitchen and the classroom are both places of creation and problem-solving, where careful preparation leads to success. As he pursues his master’s degree, Samuel is dedicated to mastering the art of Supply Chain Management, a discipline that resonates with his natural tendencies towards organization and methodical thinking. His curiosity for how goods, information, and resources move through global networks is matched only by his appreciation for how boats move through the water—calmly, purposefully, and with an eye on the horizon.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Arvid Malm</h3>
              <p className="card-text">Arvid, on the other hand, finds his passion in creativity and strategy. A basketball player at heart, he is as comfortable analyzing a business model as he is strategizing on the court. The fast-paced, dynamic nature of basketball has taught him valuable lessons in teamwork, quick decision-making, and adaptability, all of which translate seamlessly into his academic focus on Business and Innovation. On the court, he learns to read the game, make calculated moves, and lead his team—skills that mirror the challenges of navigating the competitive world of innovation and entrepreneurship. But Arvid’s interests extend beyond sports. A talented songwriter, he blends creativity with structure, crafting melodies with the same precision he applies to his studies. Songwriting allows him to explore new ideas, experiment with concepts, and push boundaries, much like the innovation process he studies in his master's program. Whether he's working on a new song or a business project, Arvid is always looking for ways to challenge conventions and come up with fresh solutions. When Arvid isn’t playing basketball or writing music, he enjoys creating cocktails, blending flavors and techniques in a way that mirrors the creativity of his other passions. Each drink is an experiment, just like his approach to business, where innovation and craftsmanship go hand-in-hand. This balance between creativity and strategy is what defines Arvid, and it’s what fuels his journey through his master's studies in Industrial Engineering and Management. In the classroom, on the court, or in the studio, Arvid's mind is always working—building, refining, and perfecting ideas. His drive to innovate is evident in everything he does, from sports to music to academics, and it’s this unique blend of skills that makes him a future leader in the world of business innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

