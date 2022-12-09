// 3rd party components
import { useEffect, useState } from 'react';
// custom style sheets
import './checkers-board.css';


const CheckersBoard = (props) => {
  console.log(props);

  const [board, setBoard] = useState([
    [null, 24, null, 23, null, 22, null, 21],
    [20, null, 19, null, 18, null, 17, null],
    [null, 16, null, 15, null, 14, null, 13],
    [0, null, 0, null, 0, null, 0, null],
    [null, 0, null, 0, null, 0, null, 0],
    [12, null, 11, null, 10, null, 9, null],
    [null, 8, null, 7, null, 6, null, 5],
    [4, null, 3, null, 2, null, 1, null]
  ]);

  let whitePawns = 12;
  let blackPawns = 12;


  useEffect(() => {
    // if (props.side !== undefined) {
      let newBoard = board.reverse();
      newBoard.forEach(row => row.reverse());
      setBoard(newBoard);
    // }
  }, [props.side]);



  return (
    <table className="checkers-board">
      <tbody>
      {
        board && board.map((row, index) => {
          return (
            <tr key={index}>
              {
                row.map((field, index) => {
                  if (field === null) {
                    return (<td key={index} className="field inactive"></td>);
                  } else if (field === 0) {
                    return (<td key={index} className="field"></td>);
                  } else if (field > 0 && field < 13) {
                    return (<td key={index}><button className="pawn white" id={field}></button></td>);
                  } else if (field < 25 && field > 12) {
                    return (<td key={index}><button className="pawn black" id={field}></button></td>);
                  }
                })
              }
            </tr>);
        })
      }
      </tbody>
    </table>

    // <td><button className="pawn black" id={0}><img src="/img/games/checkers/crown.png"></img></button></td>
  );
};

export default CheckersBoard;