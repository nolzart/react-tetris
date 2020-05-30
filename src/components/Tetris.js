import React, { useState } from 'react'

// Styled component
import {StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris'
import { createStage, checkCollision } from '../gameHelper';
//Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'

//Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(null)

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const [stage, setStage] = useStage(player, resetPlayer)

    const movePlayer = dir => {
        if(!checkCollision(player, stage,{x: dir, y: 0} )) updatePlayerPos({ x: dir, y: 0 })
        
    }
    
    const startGame = () => {
        setStage(createStage())
        resetPlayer()
        setDropTime(1000)
        setGameOver(false)
    }
    const drop = () => {
        if (!checkCollision(player, stage, {x: 0, y: 1}) ) {
            updatePlayerPos({x: 0, y: 1, collided: false }) 
        } else {
                if( player.pos.y < 1) {
                    console.log('game over')
                    setGameOver(true);
                    setDropTime(null)
                }
            updatePlayerPos({x: 0, y: 0, collided: true }) 
        }
    }

    // const dropPlayer = () => {
    //     setDropTime(null)
    //     drop()
    // }

    const moveUp = ({ keyCode }) => {
        if(!gameOver) {
            if( keyCode === 40 ){        
                setDropTime(1000)
                drop()
            }
        }
    }
    const move = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 37: 
                    movePlayer(-1)
                    break;
                case 39: 
                    movePlayer(1)
                    break;
                case 40: 
                    setDropTime(null)
                    drop()
                    break;
                case 38: {
                    playerRotate(stage, 1)
                    break;  
                }
                default:
                    return null;
            }
        }
    }

    useInterval(()=> {
        drop()
    }, dropTime)

    return (
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={ e => move(e) }
            onKeyUp={ e => moveUp(e) }
        >
            <StyledTetris>
                <Stage stage={ stage } />
                <aside>
                    { gameOver 
                        ? ( <Display gameOver={ gameOver } text='Game Over' /> )
                        : ( <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div> )
                    }
                    <StartButton callback={ startGame } />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris
