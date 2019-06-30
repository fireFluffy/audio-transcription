// Modules
import * as React from 'react';
import styled from 'styled-components';
// Utils
import getData from '../utils/getData';
// Resources
import music from '../../resources/audio/white_ship.wav';

class Player extends React.PureComponent<{}, {}> {
  public constructor(props) {
    super(props);

    this.state = {
      ready: false,
    };

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.buffer = null;
    this.audioCtx = new window.AudioContext();
  }

  public componentDidMount(): void {
    this.getMusic();
  }

  public getMusic = async (): string => {
    getData.getMusic(this.callbackAfterGetMusic);
  };

  public callbackAfterGetMusic = (res): void => {
    if (res) {
      this.audioCtx.decodeAudioData(res, this.playTrack);
    }
  };

  public playTrack = (buffer): void => {
    this.source = this.audioCtx.createBufferSource();
    this.source.buffer = buffer;
    this.source.connect(this.audioCtx.destination);
    this.setReady();
    console.log(this.source);
    setTimeout(() => console.log(this.source), 15000);
    this.source.start(0);
  };

  public setReady = (): void => {
    this.setState({ ready: true });
  };

  public render(): React.SFC {
    const { ready } = this.state;

    return (
      <MainWrap>
        <audio controls src={music}>
          {' '}
          <track default kind="captions" />
        </audio>
      </MainWrap>
    );
  }
}

export default Player;

const MainWrap = styled.div``;
