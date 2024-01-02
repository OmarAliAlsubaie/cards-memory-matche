
document.addEventListener('DOMContentLoaded', function() {

    const gameBoard = document.querySelector(".game-board");
    const createButton = document.querySelector(".btn-create");
  
    const levelMenu = document.querySelector("#level_menu");
  
    let selectedOption = levelMenu.value;
  
    let allColors = [
      "images/bird.png",
      "images/butterfly.png",
      "images/cat.png",
      "images/giraffe.png",
      "images/lion.png",
      "images/dog.png",
    ];
  
   
    const customImageBtn = document.querySelector(".btn-custom");
    const imageUploadModal = document.querySelector("#imageModal");
    customImageBtn.onclick = () => {
      imageUploadModal.style.display = "block";
      uploadImage();
    }

    const uploadImageSection = document.querySelector(".custom-image__container");
    const inpFile = [...uploadImageSection.getElementsByTagName("input")];
  
    function uploadImage() {
  
      allColors = []; 
  
  
      inpFile.forEach((item, index) => {
        
        var previewImage = document.createElement("img");
        previewImage.classList.add("previewImag");
        previewImage.setAttribute("id", "image" + index);
        console.log("previewImage", previewImage)
        
        item.onchange = function() {
          const file = this.files[0];
          let parentNodetoAppend = this.parentElement;
  
          if (file) {
            const reader = new FileReader();
            reader.onload = function() {
              previewImage.src = this.result;
              parentNodetoAppend.appendChild(previewImage);  // show the image preview.
              previewImage.style.display = "block";
              allColors.push(this.result); //replace the new images with the default ones (animals).
  
            }
            reader.readAsDataURL(file);
          }
        }
      });
    }
  
  
    let colors = [];
  
    levelMenu.addEventListener("change", function() {
      selectedOption = this.value;
      colors = []; 
       switch (selectedOption) {
        case "easy": // choose 4 random colors
          chooseRandomColors(4);
          break;
        case "medium":
          chooseRandomColors(5);
          break;
        case "hard":
          chooseRandomColors(6);
          break;
        default:
          chooseRandomColors(4);
      }
  
  
    });
  
    function closeModal(modalId) {
      document.querySelector(modalId).style.display = 'none';
    }
    
    // Add event listeners for your modals
    document.querySelector('#warningModal .close').addEventListener('click', function() {
      closeModal('#warningModal');
    });
    
    document.querySelector('#imageModal .close').addEventListener('click', function() {
      closeModal('#imageModal');
    });
 
  
    function chooseRandomColors(numberOfCards) {
      
      let tempAllColors = []; 
      allColors.forEach(item => {
        tempAllColors.push(item)
      });
  
      shuffle(tempAllColors);
  
      for (let i = 0; i < numberOfCards; i++) {
        colors.push(tempAllColors[i]);
      }
    }
  
  
    createButton.addEventListener("click", createBoard);
  
  
  
    let pickedColors = [];
  
  
    let firstCard;
    let secondCard;
  
    let firstCardColor;
    let secondCardColor;
  
    let scoreCounter = 0;
  
    // Shuffle the cards so that the order of the color will be different.
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  
    function createBoard() {
      // First check whether an option is selected. Warn the user if not.
      scoreCounter = 0;
      updateScore(scoreCounter);
  
      if (selectedOption === "choose") {
        document.querySelector(".modal-content p").innerText = "Choose an Option!";
        modalWarning.style.display = "block";
        return false;
      }
  
      let pickedColors = [];
  
      for (let i = 0; i < colors.length; i++) {
     
        pickedColors.push(colors[i]);
        pickedColors.push(colors[i]); // duplicate the elements inside the array.
       
      }
  
  
      shuffle(pickedColors); 
  
      if (gameBoard.children.length === 0) {
        
        for (let i = 0; i < pickedColors.length; i++) {
         
          let cardContainer = document.createElement("div");
          let innerCard = document.createElement("div");
          let frontCard = document.createElement("div");
          let backCard = document.createElement("div");
  
          cardContainer.setAttribute("id", i);
          cardContainer.setAttribute("class", "flip-card");
          innerCard.setAttribute("class", "flip-card-inner");
  
  
          frontCard.setAttribute("class", "flip-card-front");
        
          frontCard.style.backgroundImage = 'url(' + pickedColors[i] + ')'; 
  
          backCard.setAttribute("class", "flip-card-back");
  
          gameBoard.appendChild(cardContainer);
          cardContainer.appendChild(innerCard);
  
          innerCard.appendChild(backCard); 
          innerCard.appendChild(frontCard);
          
  
          gameBoard.appendChild(cardContainer);
        }
  
        document.querySelectorAll(".flip-card").forEach(item => {
          item.addEventListener("click", handleClick); // add event listener for all the cards on the board.
        });
  
  
        function handleClick(event) {
            let clickCount = 0; // Counter to count card clicks

            function handleClick(event) {
                // Increment the click count
                clickCount++;
                console.log('Click Count:', clickCount); // Display the click count in the console
            
                // Optionally display the click count on the webpage
                document.querySelector('.click-count').innerText = 'Click Count: ' + clickCount;
            
                // Rest of the existing code...
            }
            
         if (this.classList.contains("matched")) {
            console.log("do nothing.");
          } else {
  
            const numberOfOnCards = CardsOn(); // returns the number of ON cards.
            console.log("numberOfOnCardsss: ", numberOfOnCards);
             if (numberOfOnCards === 0) {
              this.firstElementChild.classList.toggle("animate"); // if none or one card is already on, you can flip over another card.
              firstCardColor = this.firstElementChild.childNodes[1].style.backgroundImage; // keep the first card's color in a variable.
              firstCard = this;
  
            } else if (numberOfOnCards === 1) {
              console.log("here i am:", this.firstElementChild);
              this.firstElementChild.classList.toggle("animate"); // if none or one card is already on, you can flip over another card.
              secondCardColor = this.firstElementChild.childNodes[1].style.backgroundImage;
              secondCard = this;
              setTimeout(checkSameCards, 1000); 
            } else {
  
            }
  
          }
  
  
        }
  
      } else {
        gameBoard.innerHTML = "";
        createBoard();
      }
  
  
    }
  
  
  
    function CardsOn() {
     let counter = 0;
  
      const allCards = document.querySelectorAll(".flip-card");
      allCards.forEach(item => {
        if (item.firstElementChild.classList.contains("animate") && !item.classList.contains("matched")) {
          counter++;
          console.log(counter);
        }
  
      });
      return counter;
  
    }
  
  
  
    function checkSameCards() {
      if (firstCard !== secondCard && firstCardColor === secondCardColor) {
        
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        checkMatchedCards(); 
        scoreCounter ++;
        updateScore(scoreCounter);
      } else {
       
        firstCard.firstElementChild.classList.toggle("animate");
        secondCard.firstElementChild.classList.toggle("animate");
        console.log("I'm hereeee", secondCard.firstElementChild);
        hasMatchedCards = false;
      }
    }
  
  });
  
  function checkMatchedCards() {
  
    const allCards = [...document.querySelectorAll(".flip-card")];
    // element.firstElementChild
    const isAllOn = allCards.every(item => {
    return item.classList.contains("matched");
  
  
    });
  
    if (isAllOn) {
      modal.style.display = "block";
      clearInterval(timerInterval);
    }
  }
  
  function updateScore(value) {
    document.querySelector(".score-value").innerHTML = value;
  }
  
  
  const modal = document.querySelector(".modal");
  const modalWarning = document.getElementById("warningModal");
  const modalImage = document.getElementById("imageModal");
  const spanWarning = document.getElementsByClassName("close")[0];
  const spanImage = document.getElementsByClassName("close")[1];
  
 spanWarning.onclick = function() {
    modalWarning.style.display = "none";
  }
  spanImage.onclick = function() {
    modalImage.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modalWarning) {
      modalWarning.style.display = "none";
    } else if (event.target == modalImage) {
      modalImage.style.display = "none";
  
    }
  }
  
  function changeTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme');
    document.body.classList.add(theme);
  }
  
  
  let timerInterval; 
  let timerValue = 0;
  
  function createBoard() {
      
      clearInterval(timerInterval);
  
      timerValue = 0;
  
      timerInterval = setInterval(function() {
          timerValue++;
          console.log('Timer:', timerValue, 'seconds'); 
          document.querySelector('.timer').innerText = 'Timer: ' + timerValue + ' seconds';
      }, 1000);
  
     
  }

  function contactMe() {
    window.location.href = "https://forestgreen-lion-550976.builder-preview.com/";
}
  document.addEventListener('DOMContentLoaded', function () {

  const themeSelector = document.getElementById('theme-selector');
  const body = document.getElementById('mainBody');

  themeSelector.addEventListener('change', function () {
    const selectedTheme = this.value;

  body.className = '';
    body.classList.add(selectedTheme);

    if (selectedTheme !== 'custom-theme') {
      body.style.backgroundImage = '';
    } else {
     const randomIndex = Math.floor(Math.random() * allColors.length);
      body.style.backgroundImage = `url(${allColors[randomIndex]})`;
    }
  });

  
});
