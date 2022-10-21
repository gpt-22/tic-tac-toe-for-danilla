let step = 1
let winner = ''

const getImageHTML = (imageName) => {
  const name = imageName.split('.')[0]
  console.log(name)

  return `
    <img
      src="./assets/${imageName}"
      alt="${imageName}"
      class="image ${name}"
    >`
}


const gameFieldElement = document.querySelector('.game-field-flex')
const cells = document.querySelectorAll('.game-field-flex > .cell')


const onGameFieldClick = (event) => {
  if (!event.target.className.includes('cell')) {
    return
  }

  const imageName = step % 2 !== 0 ? 'cross.png' : 'circle.png'
  event.target.innerHTML = getImageHTML(imageName)

  const isWin = checkIfWinnerExists()
  if (isWin) {
    onGameOver()
  }

  console.log(isWin)

  step += 1
}
gameFieldElement.addEventListener('click', onGameFieldClick)

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkIfWinnerExists() {
  return winCombinations.some((combination) => {
    const foundCell1 = cells[combination[0]].children[0]
    const foundCell2 = cells[combination[1]].children[0]
    const foundCell3 = cells[combination[2]].children[0]

    if (!foundCell1 || !foundCell2 || !foundCell3) {
      return false
    }

    const isWin = foundCell1.className === foundCell2.className && foundCell2.className === foundCell3.className
    if (isWin) {
      winner = foundCell1.className.includes('cross')
    }

    return isWin
  })
}

function onGameOver() {
  gameFieldElement.removeEventListener('click', onGameFieldClick)
  document.body.insertAdjacentHTML('beforebegin', '<p>${winner}</p>')
}
