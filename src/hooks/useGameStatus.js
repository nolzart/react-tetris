import { useState, useCallback, useEffect } from 'react'

export const useGameStatus = (rowsCleared) => {
    const [rows, setRows] = useState(0)
    const [level, setLevel] = useState(0)
    const [score, setScore] = useState(0)
    
    const linePoints = [40, 100, 300, 1200]
    
    const calcScore = useCallback(() => {
        if(rowsCleared > 0 ){
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1))
            setRows(prev => prev + rowsCleared)
        }
    }, [rowsCleared, linePoints, level])

    useEffect(() => {
        calcScore()
    }, [rowsCleared, calcScore, score])

    return [ rows, setRows, level, setLevel, score,setScore]
}