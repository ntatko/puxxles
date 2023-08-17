import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Editor from './components/Editor';
import Puzzle from './components/Puzzle';
import { generateSudokuPuzzle, trimPuzzle } from './utils';

const initialCode = `
const loop = (currentPuzzle, currentAnnotations) => {
    // Your code goes here

    // return an array of this step's solution and annotations
    return [
        currentPuzzle,
        currentAnnotations
    ]
}
`

const deepEqual = (val1, val2) => {
    if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) {
            return false;
        }
        for (let i = 0; i < val1.length; i++) {
            if (!deepEqual(val1[i], val2[i])) {
                return false;
            }
        }
        return true;
    } else {
        return val1 === val2;
    }
};

const og = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const sol = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const Sudoku = () => {

    const [originalPuzzle, setOriginalPuzzle] = useState(og)
    const [solution, setSolution] = useState(sol)
    const [code, setCode] = useState(localStorage.getItem('code') || initialCode);
    const [annotations, setAnnotations] = useState(new Array(9).fill(new Array(9).fill([])))
    const [enteredPuzzle, setEnteredPuzzle] = useState(originalPuzzle)
    const [worker, setWorker] = useState(null);
    const [running, setRunning] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);
    const [difficulty, setDifficulty] = useState(30)
    const [params, setParams] = useSearchParams()

    useEffect(() => {
        if (params.get('id')) {
            fetch(`https://api.github.com/gists/${params.get('id')}`).then(res => res.json()).then(res => {
                setCode(res.files[Object.keys(res.files)[0]].content)
            })
        }
    }, [params])

    const onReset = () => {
        const puzzle = generateSudokuPuzzle()
        const trimmed = trimPuzzle(puzzle, difficulty)

        stopCode();
        setOriginalPuzzle(trimmed)
        setSolution(puzzle)
        setEnteredPuzzle(trimmed)
        setAnnotations(new Array(9).fill(new Array(9).fill([])))
    }

    useEffect(() => {
        // Create a new web worker
        const newWorker = new Worker('/sudokuWorker.js'); // Adjust the path as needed
        setWorker(newWorker);

        // Cleanup function
        return () => {
            // Terminate the worker when the component unmounts
            newWorker.terminate();
        };
    }, []);

    useEffect(() => {
        if (worker) {
            // Set up an event listener to receive results from the worker
            worker.onmessage = (event) => {
                const { solution: s, annotations: a, error } = event.data;

                if (s && a) {
                    if (deepEqual(s, enteredPuzzle)) {
                        stopCode();
                    }

                    setEnteredPuzzle(s);
                    setAnnotations(a);

                    if (deepEqual(s, solution)) {
                        stopCode();
                        setShowWinMessage(true);
                    }
                } else {
                    console.error('Worker Error:', error);
                }
            };
        }
    }, [worker]);

    const onChange = (newValue, e) => {
        stopCode();
        setCode(newValue);
        localStorage.setItem('code', newValue);
    };

    const resetPuzzle = () => {
        stopCode();
        setEnteredPuzzle(originalPuzzle);
        setAnnotations(new Array(9).fill(new Array(9).fill([])))
    }

    const resetCode = () => {
        stopCode();
        resetPuzzle();
        setCode(initialCode);
        localStorage.setItem('code', initialCode);
    }

    const startRunningCode = () => {
        setRunning(true);
    }

    useEffect(() => {
        if (running) {
            setTimeout(() => {
                worker.postMessage({
                    puzzle: enteredPuzzle,
                    code: code,
                    annotations: annotations,
                });
            }, 500);
        }
    }, [running, enteredPuzzle, code, annotations, worker]);

    const stopCode = () => {
        setRunning(false);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div>
                    <Puzzle
                        originalPuzzle={originalPuzzle}
                        solution={solution}
                        enteredPuzzle={enteredPuzzle}
                        annotations={annotations}
                    />
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            {running ? (
                                <button onClick={stopCode}>Stop</button>
                            ) : (
                                <button onClick={startRunningCode}>Run</button>
                            )}
                            <button onClick={resetPuzzle}>Reset Puzzle</button>
                            <button onClick={resetCode}>Reset Code</button>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <select value={difficulty} onChange={(e) => {
                                e.stopPropagation()
                                setDifficulty(e.target.value)
                            }}>
                                <option value={30}>Easy</option>
                                <option value={40}>Medium</option>
                                <option value={50}>Hard</option>
                                <option value={60}>Grizzly</option>
                            </select>
                            <button onClick={onReset}>New Puzzle</button>
                        </div>
                    </div>
                </div>
                <div style={{ width: 'calc(100vw - 378px)', height: '100vh' }}>
                    <Editor code={code} onChange={onChange} />
                </div>
            </div>
            {showWinMessage && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '2rem',
                        color: 'white',
                    }}
                    onClick={() => setShowWinMessage(false)}
                >
                    <div>
                        You Win!
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <select value={difficulty} onChange={(e) => {
                            e.stopPropagation()
                            setDifficulty(e.target.value)
                        }}>
                            <option onClick={e => e.stopPropagation()} value={30}>Easy</option>
                            <option onClick={e => e.stopPropagation()} value={40}>Medium</option>
                            <option onClick={e => e.stopPropagation()} value={50}>Hard</option>
                            <option onClick={e => e.stopPropagation()} value={60}>Grizzly</option>
                        </select>
                        <button onClick={(e) => {
                            e.stopPropagation()
                            onReset()
                            setShowWinMessage(false)
                        }}>New Puzzle</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sudoku;
