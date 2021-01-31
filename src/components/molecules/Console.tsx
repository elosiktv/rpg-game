import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setMap } from '../../features/map/mapSlice';
import { setNewPositionFromMap } from '../../features/player/playerSlice';
import { setMonsters } from '../../features/monster/monsterSlice';
import { resetViewport } from '../../features/canvas/canvasSlice';
import maps from '../../assets/maps/maps';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(52, 58, 64, 0.2);
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Wrapper = styled.div`
    width: 100%;
    height: 87%;
    display: flex;
    flex-direction: column-reverse;
    padding: 5px;
`

const Text = styled.p`
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    font-size: 16px;
    user-select: none;
`

const Form = styled.form`
    width: 100%;
    flex: 1;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    background-color: rgba(52, 58, 64, 0.3);
    border: none;
    outline: none;
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    font-size: 18px;
    padding: 0px 5px;
`

const Console = () => {
    const dispatch = useDispatch();
    const [consoleText, setConsoleText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setConsoleText(e.target.value);
    }

    const handleConsoleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (consoleText.charAt(0) === '/') {
            const commandArray = consoleText.split(/[ /]+/);

            switch(commandArray[1]) {
                case "setmap": {
                    if (commandArray[2] && maps[commandArray[2]]) {
                        dispatch(setMap(commandArray[2]));
                        dispatch(setNewPositionFromMap(commandArray[2]));
                        dispatch(setMonsters(commandArray[2]));
                        dispatch(resetViewport());
                    }
                    break;
                }
                default: return false;
            }
        }

        setConsoleText('');
    }

    return (
        <Container>
            <Wrapper>
                <Text>Zabiłeś baby zombie</Text>
                <Text>Zabiłeś baby zombie</Text>
                <Text>Zabiłeś baby zombie</Text>
                <Text>Zabiłeś baby zombie</Text>
                <Text>Zabiłeś baby zombie</Text>
                <Text>Zabiłeś baby zombie</Text>
            </Wrapper>
            <Form onSubmit={handleConsoleSubmit}> 
                <Input value={consoleText} onChange={handleInputChange}/>
            </Form>
        </Container>
    );
};

export default Console;