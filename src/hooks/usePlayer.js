import { useState, useCallback } from 'react';
import { STAGE_WIDTH, checkCollision } from '../gameHelper';
import { TETROMINOS, randomTetromino } from '../tetrominos';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        colided: false
    })

    const rotate = (matrix, dir) => {
        const mtrx = matrix.map((_, index) =>
            matrix.map(col => col[index]),
        );
        return dir > 0 ? mtrx.map(row => row.reverse()) : mtrx.reverse();
    }
    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)
        
        const pos = clonedPlayer.pos.x
        let offset = 1
        console.log(clonedPlayer)
        while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.pos.x += offset;
            offset = - (offset + (offset > 0 ? 1 : - 1))
            if(offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos
                console.log(clonedPlayer)
                return;
            }
        }
        setPlayer(clonedPlayer)
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])

    

    return [player, updatePlayerPos, resetPlayer, playerRotate]
}


