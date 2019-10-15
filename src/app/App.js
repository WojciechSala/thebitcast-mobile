import React, { Component } from 'react';
import * as Font from 'expo-font';
import styled from 'styled-components';
import MasterStyle from '../assets/styles/MasterStyle';
import Navigator from './Navigator';
import Amplify from 'aws-amplify';
// import awsmobile from './aws-exports';
import Splash from './Splash';

const GlobalStyle = styled.View`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto-thin': require('../assets/fonts/Roboto-Thin.ttf'),
      'Roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
      'Roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
      'Roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
      'Roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
      'Roboto-black': require('../assets/fonts/Roboto-Black.ttf'),

      Turret: require('../assets/fonts/TurretRoad-Regular.ttf')
    });

    // Amplify.configure(awsmobile);
    // this.setState({ fontLoaded: true });
  }
  render() {
    if (!this.state.fontLoaded) {
      return <Splash />;
    }
    return (
      <MasterStyle>
        <GlobalStyle>
          <Navigator />
        </GlobalStyle>
      </MasterStyle>
    );
  }
}
