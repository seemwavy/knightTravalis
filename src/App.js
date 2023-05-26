import './App.css';
import ChessBoard from './ChessBoard';

function App() {
  return (
    <div className="App">
      <h1 className='header'>Knight Travails</h1>
      <div className="instructions"> 
        <p>
          Instructions: Chess knights move 3 spaces in an L shape. Practice moving the knight in the correct way
          to reach your target square. When you're ready click the Travails mode button to turn on Knight Travails. 
          In this mode choose any spot on the board to be the Knight's destination. The Knight will then move to that spot
          in the shortest number of moves possible. These moves will be logged at the bottom with the first move being the
          Knight's starting position and the last move being the Knight's destination.
        </p>
      </div>
      <ChessBoard />
    </div>
  );
}

export default App;
