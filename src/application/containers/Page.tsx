// Modules
import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
// Containers
import TextPageContainer from './TextPage';
// Components
import PlayerContainer from './Player';
// Utils
import ControlPlayer from '../utils/controlPlayer';

const PageContext = React.createContext();
const { Provider, Consumer } = PageContext;

class PageContainer extends React.PureComponent<{}, {}> {
  public constructor(props) {
    super(props);

    this.state = {
      // Продолжительность трэка
      duration: null,
      // Статус воспроизведения
      playing: false,
    };

    this.player = new ControlPlayer();
    this.player.getMusic(this.setTrackInfo);
  }

  public setTrackInfo = ({ duration }): void => {
    this.setState({ duration });
  };

  public setPlaying = (playing): void => {
    this.setState({ playing });
  };

  public togglePlay = (): void => {
    const { value } = this.state;
    this.player.toggle(value, this.setPlaying);
  };

  public getDuration = (): string => {
    const { duration } = this.state;

    if (duration) {
      const minutes = duration > 60 ? (duration / 60).toFixed() : 0;
      const seconds = _.padStart((duration - minutes * 60).toFixed().toString(), 2, '0');

      return `${minutes}:${seconds}`;
    }

    return '0:00';
  };

  public render(): React.SFC {
    const { duration, playing } = this.state;
    const pageApi = {
      duration,
      getRestPlay: this.player.getRestPlay,
      getDuration: this.getDuration,
      getCurrentTime: this.player.getCurrentTime,
      getForTextTime: this.player.getForTextTime,
      rewind: this.player.rewind,
      togglePlay: this.togglePlay,
      playing,
    };

    return (
      <MainWrap>
        <Provider value={pageApi}>
          <TextPageContainer />
          <PlayerContainer />
        </Provider>
      </MainWrap>
    );
  }
}

export default PageContainer;
export { Consumer as ConsumerPage };

const MainWrap = styled.div``;
