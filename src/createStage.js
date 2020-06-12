export const createStage = (STAGE_HEIGHT, STAGE_WIDTH) => 
            Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'clear']))

export const checkCollision = (stage, player, {x: moveX, y: moveY}) => {
    const tetromino = player.tetromino
    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {
            if(tetromino[y][x] !== 0) {
                if (!stage[y + player.pos.y + moveY] ||
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear') {
                        return true
                }
            }
        }
    }
    return false
}

