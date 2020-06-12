import styled from 'styled-components';

export const StyledNextTetromino = styled.div`
    margin-right: 2rem;
    margin-top: 10rem;
    height: 25vh;
    width: 30vw;
    border: 3px solid #999;
    display: grid;
    grid-template-rows: repeat(calc(25vw /5));
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1px;
    background: #111;
`;