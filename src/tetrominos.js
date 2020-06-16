export const TETROMINOS = {
    0: {shape: [[0]], color: '17, 17 ,17'},
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '51, 255, 209'
    },
    J: {
        shape: [
            [0,  'J', 0],
            [0,  'J', 0],
            ['J','J', 0]
        ],
        color: '64, 100, 255'
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        color: '255, 129, 51'
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O'],
        ],
        color: '255, 232, 51'
    },
    S: {
        shape: [
            [ 0, 'S','S'],
            ['S','S', 0],
            [ 0,  0,  0]
        ],
        color: '106, 255, 51'
    },
    T: {
        shape: [
            [ 0,  0,  0],
            ['T','T','T'],
            [ 0, 'T', 0]
        ],
        color: '160, 62, 255'
    },
    Z: {
        shape: [
            ['Z','Z', 0],
            [ 0, 'Z','Z'],
            [ 0,  0,  0]
        ],
        color: '255, 51, 83'
    },
}

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ'
    const randomTetrominos = tetrominos[Math.floor(Math.random() * tetrominos.length)]
    return TETROMINOS[randomTetrominos]
}