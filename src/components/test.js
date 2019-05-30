'use strict';

let testArry = [
  {
    playerName: 'Mike Trout',
    user: 'tchun'
  },
  {
    playerName: 'Albert Pujols',
    user: 'tchun'
  },
  {
    playerName: 'Stephen Curry',
    user: 'tchun'
  }
];

testArry.sort((a,b) => a.playerName > b.playerName);
console.log(testArry);