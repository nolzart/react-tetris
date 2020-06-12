import React from 'react'

import { StyledDisplay } from './styles/StyledDisplay'

const Display = ({text, value}) => {
    return (
        <StyledDisplay>
            {text} {value}
        </StyledDisplay>
    )
}

export default Display
