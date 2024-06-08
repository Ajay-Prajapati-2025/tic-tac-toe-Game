// access the btns
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; // player - O, player - X
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


// Reset functionality
const resetGame = () =>{
    turnO =  true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};


// Clicked functionality on the any box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // player - O
      box.innerText = "O";
      turnO = false;
    } else {
      //Player - X
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner  = checkWinner();
    if(count === 9 && !isWinner){
        gameDraw();
    }
  });
});

// Draw the game --> no player is win
const gameDraw = () => {
    msg.innerText = `There is no Winner, Game was Drawed`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };


// Disable the boxes after the game is win
const disableBoxes= () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

// Enables the all boxes while game is RESET / NEW game
const enableBoxes= () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

// Display the winner
const showWinner = (winner) =>{
    msg.innerText = `Congratulation , Winner is Player-${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//  Functionality to check the winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val == pos2Val && pos2Val == pos3Val){
            showWinner(pos1Val);
        }
    }

  }
};

// Event on click the RESET / NEW game button are clicked
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

