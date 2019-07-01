// Modules
import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
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
      // Статус загрузки трэка
      ready: false,
      // Статус воспроизведения
      playing: false,
      // Other
      value: 50,
    };

    this.player = new ControlPlayer();
    Promise.all([this.player.getMusic(this.setTrackInfo)]).catch((err): void => console.log(err));
  }

  public setTrackInfo = ({ duration }): void => {
    this.setState({ duration });
  };

  public setPlaying = (playing): void => {
    this.setState({ playing });
  };

  public changeValue = (e): void => {
    this.setState({ value: e.target.value });
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
    const { duration, playing, value } = this.state;
    const pageApi = {
      duration,
      getRestPlay: this.player.getRestPlay,
      getDuration: this.getDuration,
      togglePlay: this.togglePlay,
      playing,
    };

    return (
      <MainWrap>
        <input type="number" min={0} max={200} onChange={this.changeValue} value={value} />
        <Provider value={pageApi}>
          <PlayerContainer />
        </Provider>
      </MainWrap>
    );
  }
}

export default PageContainer;
export { Consumer as ConsumerPage };

const MainWrap = styled.div``;
