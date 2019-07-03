// Modules
import * as React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

class TimeComponent extends React.PureComponent<{}, {}> {
  public constructor(props) {
    super(props);

    this.timeStep = 1000;
    this.timeId = null;
    this.intervalId = null;
    this.state = {
      currentTime: this.getNewTime(),
    };
  }

  private componentDidUpdate(prevProps): void {
    const { playing, update } = this.props;

    if (!_.isNil(update) && update !== prevProps.update) {
      this.updateNewTime();
    }

    if (playing && !prevProps.playing) {
      this.startUpdateCurrentTime();
    } else if (!playing && prevProps.playing) {
      this.stopUpdateCurrentTime();
    }
  }

  public updateNewTime = (): void => {
    this.setState({ currentTime: this.getNewTime() });
  };

  public getNewTime = (): void => {
    const { getCurrentTime } = this.props;
    const time = getCurrentTime();
    const minutes = time > 60 ? +(time / 60).toFixed() : 0;
    const seconds = +(time - minutes * 60).toFixed();

    return { minutes, seconds };
  };

  public updateCurrentTime = (): void => {
    const { currentTime } = this.state;
    const newCurrentTime = { ...currentTime };

    newCurrentTime.seconds += this.timeStep / 1000;

    if (newCurrentTime.seconds >= 60) {
      newCurrentTime.seconds = 0;
      newCurrentTime.minutes += 1;
    }

    this.setState({
      currentTime: newCurrentTime,
    });
  };

  public startUpdateCurrentTime = (): void => {
    const _this = this;
    const { getRestPlay } = this.props;
    const restPlay = getRestPlay();

    this.timeId = setTimeout((): void => {
      _this.updateCurrentTime();
      _this.intervalId = setInterval(_this.updateCurrentTime, _this.timeStep);
    }, restPlay);
  };

  public stopUpdateCurrentTime = (): void => {
    Promise.all([clearInterval(this.timeId), clearInterval(this.intervalId)]);
  };

  private render(): React.SFC {
    const { currentTime } = this.state;
    const { getDuration } = this.props;
    const seconds = _.padStart(currentTime.seconds.toString(), 2, '0');

    return (
      <MainWrap>
        <CurrentTimeWrap>{`${currentTime.minutes}:${seconds}`}</CurrentTimeWrap>
        <Line>/</Line>
        <AllTimeWrap>{getDuration()}</AllTimeWrap>
      </MainWrap>
    );
  }
}

export default TimeComponent;

const MainWrap = styled.div`
  display: flex;
  margin-left: -2px;
  color: #8494a6;

  & > * {
    margin-left: 2px;
  }

  user-select: none;
  cursor: default;
`;

const CurrentTimeWrap = styled.div``;

const Line = styled.div``;

const AllTimeWrap = styled.div``;
