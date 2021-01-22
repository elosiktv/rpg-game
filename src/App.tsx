import React from 'react';
import styled from 'styled-components';

import Canvas from './components/organisms/Canvas';
import TilesBuffer from './components/organisms/ImagesBuffer';
import PlayerMovement from './components/organisms/PlayerMovement';
import MonsterPlayerDetection from './components/organisms/MonsterPlayerDetection';
import UserClickHandler from './components/organisms/UserClickHandler';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
`

function App() {
	return (
		<Container>
			<UserClickHandler />
			<MonsterPlayerDetection />
			<PlayerMovement />
			<TilesBuffer />
			<Canvas />
		</Container>
  	);
}

export default App;