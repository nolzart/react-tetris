import React from 'react'

import { StyledStage } from './styles/StyledStage'
import Cell from './Cell'
import Loader from './Loader'
const Stage = ({ stage, height, width, loader }) => {
    return (
        <StyledStage height={height} width={width}>
            
            {loader ? <Loader/> 
            : (stage.map((row, y) =>
                row.map((cell, x) => <Cell key={x} type={cell[0]} />))
              )
            }
        </StyledStage>
    )
}



export default Stage
