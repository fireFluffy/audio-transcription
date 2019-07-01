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
      currentTime: { minutes: 0, seconds: 0 },
    };
  }

  private componentDidUpdate(prevProps): void {
    const { playing } = this.props;

    if (playing && !prevProps.playing) {
      this.startUpdateCurrentTime();
    } else if (!playing && prevProps.playing) {
      this.stopUpdateCurrentTime();
    }
  }

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
  margin-left: -5px;

  & > * {
    margin-left: 5px;
  }

  user-select: none;
  cursor: default;
`;

const CurrentTimeWrap = styled.div``;

const Line = styled.div``;

const AllTimeWrap = styled.div``;
