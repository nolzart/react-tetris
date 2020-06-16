import styled from 'styled-components';

export const StyledStartButton = styled.div`
    box-sizing: border-box;
    margin: 0 0 2rem 0;
    padding: 2rem;
    min-height: 1rem;
    width: 100%;
    border-radius: 2rem;
    border: none;
    color: white;
    background: #333;
    font-family: 'Lato', sans-serif;
    font-size: 1.6rem;
    outline: none;
    cursor: pointer;

    @media(max-width: 40rem) {
        font-size: 1rem;
        padding: 1rem;
        width: 50%;
    }

`;