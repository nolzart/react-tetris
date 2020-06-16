import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(30rem / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    width: 100%;
    max-width: 30rem;
    min-width: 22rem;
    background: #111;
    border: 2px solid #999;
    position:relative;

    @media(max-width: 40rem) {
        margin-left: -3rem;
        margin-top: -3rem;
        max-width: 22rem;
        min-width: 20rem;
    }

`;