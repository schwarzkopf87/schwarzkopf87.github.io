document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDispplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let speedTetromino = 500
    let score = 0
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]

    //The Tetrominos
    const lTermomino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominos = [lTermomino, zTetromino, tTetromino ,oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    //rmdomly sleect a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominos.length)
    let current = theTetrominos[random][currentRotation]

    //draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    //undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    //Make the tetromin move down every second
    //timerId = setInterval(moveDown, speedTetromino)

    //assign function to keyCodes
    function control(e){
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keydown', control)

    //move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            random = nextRandom
            // start a new tetromino falling
            nextRandom = Math.floor(Math.random() * theTetrominos.length)
            current = theTetrominos[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    //move the tetromino left, unless is at the edge or there is a blockade
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }
        
        draw()

    }

    //move the tetromino right, unless is at the edge or there is a blockade
    function moveRight() {
        undraw()
        const isARightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isARightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        
        draw()

    }

    //move the tetromino down
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    //rotation the tetromino
    function rotate(){
        undraw()
        currentRotation ++
        //if the current rotation gets to 4, make it go back to 0
        if(currentRotation === current.length){
            currentRotation = 0
        }
        current = theTetrominos[random][currentRotation]
        draw()
    }

    //show up-next tetrimino in a mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
    

    //The Tetromino without rotaions
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], // lTetromino
        [0,displayWidth, displayWidth+1, displayWidth*2+1], // zTetromino
        [1,displayWidth, displayWidth+1, displayWidth+2], // tTetromino
        [0,1,displayWidth, displayWidth+1], // oTetromino
        [1,displayWidth+1, displayWidth*2+1, displayWidth*3+1], // iTetromino
    ]

    //display the shape in the mini-grid-display
    function displayShape() {
        //remove any trace of a tetromino from the entire grid
        displaySquares.forEach(squares => {
            squares.classList.remove('tetromino')
            squares.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }

    //add functionility to the button
    startBtn.addEventListener('click', () =>{
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, speedTetromino)
            //nextRandom = Math.floor(Math.random()*theTetrominos.length)
            displayShape()
        }
    })

    //add score
    function addScore(){
        for (let i =0; i<199; i +=width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9,]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDispplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


    //Game Over
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDispplay.innerHTML = 'End'
            clearInterval(timerId)
        }
    }

})



//JavaScript Course from: https://www.youtube.com/watch?v=rAUn1Lom6dw&t=518s
