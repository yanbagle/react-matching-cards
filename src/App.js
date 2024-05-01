import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const cardsArr = [1, 3, 1, 2, 2, 3, 4, 4];
  const [cards, setCards] = useState({});
  const [prevIndex, setPrevIndex] = useState(-1);

  const generateRandomNumbers = () => {};

  useEffect(() => {
    for (let i = 0; i < cardsArr.length; i++) {
      cards[i] = {
        matched: false,
        showNumber: false,
        num: cardsArr[i],
      };
    }
  }, {});

  const onClick = (index) => {
    if (cards[index].matched) {
      // if already matched
      return;
    }

    const cardsCopy = { ...cards };
    if (prevIndex > -1) {
      // if 2 numbers have been clicked
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

  return (
    <div className="App">
      {cardsArr.map((num, index) => (
        <Card key={index} onClick={onClick} index={index}>
          {cards[index] && (cards[index].showNumber || cards[index].matched)
            ? num
            : null}
        </Card>
      ))}
    </div>
  );
}

export default App;
