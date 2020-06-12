import React from 'react'

import { StyledStartButton } from './styles/StyledStartButton'

const StartGame = ({callback}) => {
    return (
        <StyledStartButton onClick={callback}>
            Start Game
        </StyledStartButton>
    )
}

export default StartGame
