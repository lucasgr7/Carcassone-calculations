// enum parts
const 
  RIVER= 0,
  ROAD= 1,
  CITY= 2,
  FIELD= 3;
  
const START = {
  label: 'START',
  sides: [RIVER, FIELD, FIELD, FIELD]
};
const END = {
  label: 'END',
  sides: [RIVER, FIELD, FIELD, FIELD]
};

// orientation TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3
const pieces = {
  A: {
    label: 'A',
    sides: [CITY, RIVER, ROAD, RIVER],
  },
  // B: {
  //   label: 'B',
  //   sides: [ROAD, CITY, ROAD, FIELD],
  // },
  C: {
    label: 'C',
    sides: [CITY, CITY, RIVER, RIVER],
  },
  D: {
    label: 'D',
    sides: [RIVER, CITY, RIVER, CITY],
  },
  E: {
    label: 'E',
    sides: [RIVER, FIELD, RIVER, FIELD],
  },
  F: {
    label: 'F',
    sides: [ROAD, RIVER, RIVER, ROAD],
  },
  G: {
    label: 'G',
    sides: [RIVER, FIELD, RIVER, FIELD],
  },
  H: {
    label: 'H',
    sides: [RIVER, FIELD, FIELD, RIVER],
  },
  I: {
    label: 'I',
    sides: [FIELD, RIVER, RIVER, FIELD],
  },
  J: {
    label: 'J',
    sides: [FIELD, RIVER, ROAD, RIVER],
  },
  K:{
    label: 'K',
    sides: [ROAD, RIVER, ROAD, RIVER],
  }
};

function placeLastPiece(lastArrangement: any, combinations: any, results: any[]){
  let lastPiece = checkAllPossibleArrangements(lastArrangement, END);
  combinations.push(lastPiece[0]);
  results.push([...combinations]);
  combinations = [START];
  return;
}

function checkAllPossibleArrangements(lastArrangement: any, newPiece: any){
  let arrangements = [] as any[];
  let lastOccupiedPosition = lastArrangement.position[1];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(lastArrangement.piece.sides[i] === newPiece.sides[j] && newPiece.sides[j] === RIVER && i !== lastOccupiedPosition){
        arrangements.push({piece: {...newPiece}, position: [i, j]});
      }
    }
  }
  return arrangements;
}

function checkPiecePlacement(newpiece: any, combinations: any, nextPieces: any, results: any[]): void{
  let last = combinations[combinations.length - 1];
  let arrangements = checkAllPossibleArrangements(last, newpiece);
  for(let i = 0; i < arrangements.length; i++){
    let arrangement = arrangements[i];
    let copy = [...combinations];
    copy.push(arrangement);
    if(nextPieces.length === 0){
      // place the final piece
      placeLastPiece(arrangement,copy, results);
    }
    else{
      for(let j = 0; j < nextPieces.length; j++){
        let nextPiece = nextPieces[j];
        let piecesCopy = nextPieces.filter((p: any) => p.label !== nextPiece.label);
        checkPiecePlacement(nextPiece, copy, piecesCopy, results);
      }
    }
  }


}


function main(){
  let results = [] as any[];
  let combinations = [{piece: START, position: [null, null]}];
  let {A, C, E, F, G, H, J, K} = pieces;
  const availablePieces = [A, C, E, F, G, H, J, K];
  for(let i = 0; i < availablePieces.length; i++){
    let placementPiece = availablePieces[i];
    // add a piece to the configuration and remoe it from the pieces
    let nextPieces = availablePieces.filter(p => p.label !== placementPiece.label);
    checkPiecePlacement(placementPiece, combinations, nextPieces, results);
  }
  return results;
}

let result = main();
console.log(result);
console.log('possible reuslts:' , result.length);
// remove the comment bellow if you wish to see all the configurations
// DISCLAIMER: it can be slow
// for(let i = 0; i < result.length; i++){
//   const labels = result[i].map((x: any) => x.piece?.label)
//   const positions = result[i].map((p: any) => p.position);
//   console.table({labels, positions});
//   console.log(i);
// }