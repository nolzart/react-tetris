import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: #000;
    overflow: hidden;

    @media(max-width:40rem) {
        width: 110vw;
        height: 110vh;
        background: #000;
        overflow: hidden;
    }
`;

export const StyledTetris = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 4rem;
    margin: 0 auto;
    max-width: 80rem;

aside {
    width: 100%;
    max-width: 20rem;
    display: block;
    padding: 0 2rem;
    }

.controls p {
    color: #999;
    font-family: sans-serif;
    font-size: 2rem;
}

@media(max-width: 40rem) {
    aside {
        position: absolute;
        top: 40%;
        left: 70%;
        padding: 0 .5rem;
    }
    .controls p {
        font-size: 1rem
    }
}
`;