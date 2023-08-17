import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sudoku from './sudoku/Sudoku';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Sudoku />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
