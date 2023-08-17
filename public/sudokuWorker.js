self.addEventListener('message', (event) => {
    const { puzzle, code, annotations } = event.data;

    const lastLine = `
        return loop(pzzzzz, anooooooo);
    `
  
    // Create a function from the provided code using the Function constructor
    const solvingFunction = new Function('pzzzzz', 'anooooooo', code+lastLine);
  
    // Call the created function to solve the Sudoku puzzle
    const result = solvingFunction(puzzle, annotations);
  
    if (Array.isArray(result) && result.length === 2) {
      const [solvedPuzzle, puzzleAnnotations] = result;
      // Return the solution and annotations
      self.postMessage({ solution: solvedPuzzle, annotations: puzzleAnnotations });
    } else {
      // Handle error, function didn't return the expected array
      // You can post a message to indicate the issue, or take appropriate action
      self.postMessage({ error: 'Invalid result from solvingFunction' });
    }
  });