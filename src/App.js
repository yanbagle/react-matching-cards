import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [cardsArr, setCardsArr] = useState([]);
  const [cards, setCards] = useState({});
  const [prevIndex, setPrevIndex] = useState(-1);
  const numberOfCards = 8;

  const generateRandomNumbers = () => {
    if (cardsArr.length) {
      return;
    }

    let numberOfRandoms = numberOfCards / 2;
    const randArr = [];
    while (numberOfRandoms > 0) {
      const randNum = Math.floor(Math.random() * 10);
      // if random number doesn't exist in array
      // ensures we get a set of unique numbers
      if (randArr.indexOf(randNum) === -1) {
        randArr.push(randNum);
        randArr.push(randNum);
        numberOfRandoms--;
      }
    }

    // shuffle the array
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = randArr.length;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [randArr[currentIndex], randArr[randomIndex]] = [
        randArr[randomIndex],
        randArr[currentIndex],
      ];
    }
    setCardsArr(randArr);

    const cardsCopy = {};
    for (let i = 0; i < randArr.length; i++) {
      cardsCopy[i] = {
        matched: false,
        showNumber: false,
        num: randArr[i],
      };
    }

    setCards(cardsCopy);
  };

  const onClick = (index) => {
    if (cards[index].matched) {
      // if already matched
      return;
    }

    const cardsCopy = { ...cards };
    if (prevIndex > -1) {
      // if 2 cards have been clicked
      if (cards[prevIndex].num === cards[index].num) {
        // if match
        cards[prevIndex].matched = true;
        cards[index].matched = true;
      } else {
        // not a match
        cardsCopy[index].showNumber = true; // show the number for now
        setTimeout(() => {
          // hide the numbers after 1 sec delay
          const cardsCopy2 = { ...cards };
          cards[prevIndex].showNumber = false;
          cards[index].showNumber = false;
          setCards(cardsCopy2);
        }, 1000);
      }
      setPrevIndex(-1); // reset prev index
    } else {
      // only 1 number has been clicked, so just show it
      cardsCopy[index].showNumber = true;
      setPrevIndex(index);
    }
    setCards(cardsCopy);
  };

  generateRandomNumbers();

  return (
    <div className="App">
      {cardsArr.length &&
        cardsArr.map((num, index) => (
          <Card key={index} onClick={onClick.bind(null, index)}>
            {cards[index] && (cards[index].showNumber || cards[index].matched)
              ? num
              : null}
          </Card>
        ))}
    </div>
  );
}

export default App;
