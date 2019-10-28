import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'react-native-slider';
import Pplayer from 'react-native-sound-player';

export default class PodcastPlayer extends Component {
  state = {
    playerExpanded: false,
    podcastCurrentTime: 0,
    podcastMaxTime: 0,
    podcastPlaying: false,
  };

  showTimeMul = () => {};
  forward10Sec = () => {};
  back10Sec = () => {};
  changePodcastCurrentTime = time => {};

  togglePause = () => {
    try {
      if (this.state.podcastPlaying) Pplayer.pause();
      else Pplayer.resume();
      this.setState({podcastPlaying: !this.state.podcastPlaying});
      console.log('podcastPlaying', this.state.podcastPlaying);
    } catch (e) {
      console.log('Couldnt pause the podcast', e);
    }
  };

  togglePlayerExpansion = async () => {
    console.log('playerExpanded:', this.state.playerExpanded);
    this.setState({playerExpanded: !this.state.playerExpanded});

    try {
      const podcastInfo = await Pplayer.getInfo();
      await this.setState({
        podcastCurrentTime: (podcastInfo.currentTime / 60).toFixed(2),
      });
      console.log('aaaaaaaa', (podcastInfo.currentTime / 60).toFixed(2));
    } catch (e) {
      console.log('error expanding the player:', e);
    }
  };

  async componentDidMount() {
    try {
      if (!this.state.podcastPlaying) {
        Pplayer.playUrl(
          'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        );
        this.setState({podcastPlaying: true});
      }
      // get podcast time and cut to 100th of a second
      const podcastInfo = await Pplayer.getInfo();
      this.setState({podcastMaxTime: (podcastInfo.duration / 60).toFixed(2)});
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  }

  render() {
    const playerItems = [
      {key: 'time-mul', icon: 'timer', method: this.showTimeMul},
      {key: 'back-10s', icon: 'replay-10', method: this.back10Sec},
      {
        key: 'play-pause',
        icon: this.state.podcastPlaying ? 'pause' : 'play-arrow',
        method: this.togglePause,
      },
      {
        key: 'forward-10s',
        icon: 'forward-10',
        method: this.forward10Sec,
      },
      {
        key: 'expand',
        icon: this.state.playerExpanded
          ? 'keyboard-arrow-down'
          : 'keyboard-arrow-up',
        method: this.togglePlayerExpansion,
      },
    ];

    return (
      <Container style={{height: this.state.playerExpanded ? 100 : 48}}>
        {this.state.playerExpanded ? (
          <SliderContainer>
            <SliderTime>{this.state.podcastCurrentTime}</SliderTime>
            <Slider
              value={this.state.podcastCurrentTime}
              maximumValue={this.state.podcastMaxTime}
              thumbTintColor="#F44336"
              minimumTrackTintColor="#F44336"
              maximumTrackTintColor="#ECECEC"
              style={{
                width: Dimensions.get('window').width * 0.7,
              }}
              trackStyle={{height: 2}}
              thumbStyle={{width: 14, height: 14}}
              onValueChange={val =>
                this.setState({podcastCurrentTime: Math.floor(val)})
              }
              onSlidingComplete={val => changePodcastCurrentTime(val)}
            />
            <SliderTime>{this.state.podcastMaxTime}</SliderTime>
          </SliderContainer>
        ) : (
          <Slider
            value={this.state.podcastCurrentTime}
            maximumValue={this.state.podcastMaxTime}
            thumbTintColor="rgba(0,0,0,0)"
            minimumTrackTintColor="#F44336"
            maximumTrackTintColor="rgba(0,0,0,0)"
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              width: Dimensions.get('window').width,
              position: 'absolute',
              bottom: 27,
            }}
            trackStyle={{height: 2}}
            thumbStyle={{width: 14, height: 14}}
          />
        )}

        <PlayerIcons>
          {playerItems.map(item => (
            <PlayerBtn key={'btn__' + item.key} onPress={() => item.method()}>
              <Icon
                name={item.icon}
                color={'#252525'}
                size={item.key === 'play-pause' ? 36 : 26}
                key={'icon__' + item.key}
              />
            </PlayerBtn>
          ))}
        </PlayerIcons>
      </Container>
    );
  }
}

const Container = styled.View`
  position: absolute;
  bottom: -1;
  z-index: 2;
  width: 100%;
  background-color: ${({theme}) => theme.color.white};
  elevation: 5;
`;
const PlayerIcons = styled.View`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  margin-top: auto;
`;
const PlayerBtn = styled.TouchableOpacity`
  height: 100%;
  min-width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SliderContainer = styled.View`
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const SliderTime = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-regular';
  color: ${({theme}) => theme.color.black};
`;
