import { useEffect, useState } from 'react'
import dolphin from './Assets/dolphin.png'
import turtle from './Assets/turtle.png'
import dog from './Assets/dog.png'
import cat from './Assets/cat.png'
import chicken from './Assets/rooster.png'
import duck from './Assets/duck.png'
import blank from './Assets/blank.png'
import ScoreBoard from './/scoreboard'

const width = 8
var isTimeEnd = false
var time = 300
const animalList = [
  dolphin,
  turtle,
  dog,
  cat,
  chicken,
  duck
]

const App = () => {
  const [currentAnimalArrangement, setCurrentAnimalArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)


  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedAnimal = currentAnimalArrangement[i]
      const isBlank = currentAnimalArrangement[i] === blank

      if (columnOfFour.every(square => currentAnimalArrangement[square] === decidedAnimal && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentAnimalArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 2]
      const decidedAnimal = currentAnimalArrangement[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentAnimalArrangement[i] === blank

      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentAnimalArrangement[square] === decidedAnimal && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentAnimalArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedAnimal = currentAnimalArrangement[i]
      const isBlank = currentAnimalArrangement[i] === blank

      if (columnOfThree.every(square => currentAnimalArrangement[square] === decidedAnimal && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentAnimalArrangement[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedAnimal = currentAnimalArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentAnimalArrangement[i] === blank
      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentAnimalArrangement[square] === decidedAnimal && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentAnimalArrangement[square] = blank)
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentAnimalArrangement[i] === blank) {
        let randomAnimal = Math.floor(Math.random() * animalList.length)
        currentAnimalArrangement[i] = animalList[randomAnimal]
      }

      if ((currentAnimalArrangement[i + width]) === blank) {
        currentAnimalArrangement[i + width] = currentAnimalArrangement[i]
        currentAnimalArrangement[i] = blank
      }
    }

  }

  const dragStart = (e) => {
    if(isTimeEnd === false){
    setSquareBeingDragged(e.target)
    }
  }
  const dragDrop = (e) => {
    if(isTimeEnd === false){
    setSquareBeingReplaced(e.target)
    }
  }
  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentAnimalArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentAnimalArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentAnimalArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentAnimalArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentAnimalArrangement([...currentAnimalArrangement])
    }
  }

  const resetCounter = () => {
    time = 300
    setScoreDisplay((score) => score * 0)

  }

  const endTimer = () => {
    
    if (time > 0) {
      time -= 1
    }
    else {
      isTimeEnd = true
    }
    document.getElementById("timer").innerHTML = "Pozostały czas: " + time;
  }

  


  const createBoard = () => {
    const randomAnimalArrangement = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = animalList[Math.floor(Math.random() * animalList.length)]
      randomAnimalArrangement.push(randomColor)
    }
    setCurrentAnimalArrangement(randomAnimalArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
   const endInterval = setInterval(() => {
      endTimer()
    }, 1000);
    return () => clearInterval(endInterval)
  }, [])


  useEffect(() => {
    if (isTimeEnd === false) {
      const timer = setInterval(() => {
        checkForColumnOfFour()
        checkForRowOfFour()
        checkForColumnOfThree()
        checkForRowOfThree()
        moveIntoSquareBelow()
        setCurrentAnimalArrangement([...currentAnimalArrangement])
      }, 100)
      return () => clearInterval(timer)
    }
  }, [checkForColumnOfThree, checkForColumnOfFour, checkForRowOfThree, checkForRowOfFour, moveIntoSquareBelow, currentAnimalArrangement])

  return (
    <>
      <div className="app">
        <div className="game">
          {currentAnimalArrangement.map((animalList, index) => (
            <img
              key={index}
              src={animalList}
              alt={animalList}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}


        </div>
        <div className="scoreboard">
        <ScoreBoard score={scoreDisplay}/>
        <h2 id='timer'>Pozostały czas:000</h2>
        <button onClick={resetCounter}>Restart czasu</button>
        </div>
      </div>
    </>
  );
}

export default App;
