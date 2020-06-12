import React, {useState, useEffect} from 'react'

//Styles
import { StyledNextTetromino } from './styles/StyledNextTetromino'

//Components
import { createStage }  from '../createStage'
import Cell from './Cell'
import Loader from './Loader'

const NextTetromino = ({player, loader}) => {
    const [stage, setStage] = useState(createStage(5, 5))
    useEffect(() => {
        setStage(createStage(5, 5))
        const updateStage = prevStage => {
            const newStage = prevStage.map((row, y) => 
                    row.map((cell, x) => cell[1] === 'clear' ? [0, 'clear'] : cell
                ))
            
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) =>  { 
                        if(value !== 0) {
                            newStage[y + 1][x + 1] = [value, `${player.collided ? 'merged' : 'clear'}`]
                        }
                    }
                )})

            return newStage
        }
        setStage(prev => updateStage(prev))
    }, [player])
    return (
        <StyledNextTetromino>
            {
                loader ? <Loader/> 
                : (stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>)))
            }
        </StyledNextTetromino>
    )
}

export default NextTetromino