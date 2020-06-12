import { useState } from 'react'

import { randomTetromino, TETROMINOS } from '../tetrominos'
import { checkCollision } from '../createStage'
export const usePlayer = () => {

    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
        next: {
            pos: {x: 0, y: 0},
            tetromino: TETROMINOS[0].shape,
            collided: false,
        }
    })

    const rotate = (matrix, dir) => {
        const transpose = matrix.map((_, index) => 
            matrix.map(col => col[index]))
        return dir >  0 ? transpose.map(row => row.reverse()) : transpose.reverse() 
    }
    const rotatePlayer = (stage, dir) => {
        const clonnedPlayer = JSON.parse(JSON.stringify(player))
        clonnedPlayer.tetromino = rotate(clonnedPlayer.tetromino, dir)
        
        let offset = 1
        const pos = clonnedPlayer.pos.x

        while (checkCollision(stage, clonnedPlayer, {x: 0, y: 0})) {
            clonnedPlayer.pos.x += offset
            offset = - (offset + (offset > 0 ? 1 : -1))

            if(offset > clonnedPlayer.tetromino[0].length) {
                rotate(clonnedPlayer.tetromino, -dir)
                clonnedPlayer.pos.x = pos
                return;
            }
        }
        setPlayer(clonnedPlayer)
    }
    const resetPlayer = () => {
        setPlayer(prev => ({
            pos: {x: 6, y: 0},
            tetromino: prev.next.tetromino.length > 1 ? prev.next.tetromino : randomTetromino().shape,
            collided: false,
            next: {
                pos: {x: 6, y: 0},
                tetromino: randomTetromino().shape,
                collided: false,
            }
        }))
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos:{y: prev.pos.y + y, x: prev.pos.x + x},
            collided
        }))
    }

    return [player, updatePlayerPos, rotatePlayer, resetPlayer]
}