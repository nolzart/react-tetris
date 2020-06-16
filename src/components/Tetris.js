import React, { useState } from 'react'

//Styles
import {StyledTetris, StyledTetrisWrapper} from './styles/StyledTetris'

//Components
import { createStage, checkCollision}  from '../createStage'
import Stage from './Stage'
import StartGame from './StartGame'
import Display from './Display'
import NextTetromino from './NextTetromino'

//hooks
import { useStage } from '../hooks/useStage'
import { usePlayer } from '../hooks/usePlayer'
import { useInterval } from '../hooks/useInterval'
import { useGameStatus } from '../hooks/useGameStatus'

const Tetris = () => {
    const STAGE_HEIGHT = 20
    const STAGE_WIDTH = 12
    const [loader, setLoader] = useState(true)
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, rotatePlayer, resetPlayer] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, gameOver)

    const [rows, setRows, level, setLevel, score, setScore] = useGameStatus(rowsCleared)
    
    const startGame = () => {
        setLoader(false);
        setStage(createStage(STAGE_HEIGHT, STAGE_WIDTH))
        resetPlayer()
        setDropTime(1000)
        setGameOver(false)
        setRows(0)
        setLevel(0)
        setScore(0)
    }

    const movePlayer = (x , y, collided) => {
        if(!checkCollision(stage, player, {x, y})){
            updatePlayerPos({x, y, collided})
        }
    }

    const drop = () => {

        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            setDropTime(null)
        }

        if (!checkCollision(stage, player, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            if(player.pos.y < 1){
                setGameOver(true)
                setDropTime(1000 / (level + 1) + 200)
            }
            updatePlayerPos({x: 0, y: 0, collided: true})
        }
    }

    const move = ({keyCode}) => {
        if (!gameOver) {
            if(keyCode === 13) {
                startGame()
            } else if (keyCode === 68 || keyCode === 39) {
                movePlayer(1, 0, player.collided)
            } else if ( keyCode === 65 || keyCode === 37) {
                movePlayer(-1, 0, player.collided)
            } else if (keyCode === 83 || keyCode === 40 ) {
                setDropTime(null)
                drop()
            } else if (keyCode === 38 || keyCode === 87) {
                rotatePlayer(stage, 1)
            }
        }
    }

    const keyUp = ({keyCode}) => {
        if(!gameOver) { 
            if (keyCode === 40 ||  keyCode === 83) {
                setDropTime(1000 / (level + 1) + 200)
                drop()
            }
        }
    }
    
    useInterval(() => {
        drop()
    }, dropTime)
    

    return (
        
        <StyledTetrisWrapper 
            tabIndex='0' 
            role='button' 
            onKeyDown={(e) => move(e)} 
            onKeyUp={(e) => keyUp(e)} 
        >
            <StyledTetris>
                <NextTetromino player={player.next} loader={loader}/>
                <Stage stage={stage} height={STAGE_HEIGHT} width={STAGE_WIDTH} loader={loader}/>
                <aside>
                    <StartGame callback={startGame} />
                    { gameOver ? (<Display text="Game Over" value={ null } color={gameOver} />) 
                    :(
                        <div>
                            <Display text="Level" value={ level } />
                            <Display text="Rows" value={ rows } />
                            <Display text="Score" value={ score } />
                        </div>
                    )}
                    <div className="controls">
                        <p>left &larr;</p>
                        <p>right &rarr;</p>
                        <p>bottom &darr;</p>
                        <p>rotate &uarr;</p>
                    </div>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris
