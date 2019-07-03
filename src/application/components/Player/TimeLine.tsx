// Modules
import * as React from 'react';
import styled from 'styled-components';

class TimeLineComponent extends React.PureComponent<{}, {}> {
  private constructor(props) {
    super(props);
    const { duration } = props;

    this.timeLineRef = React.createRef();
    this.updateStep = 100;
    const quantSteps = duration / (this.updateStep / 1000);
    this.percent = 100 / quantSteps;
    this.intervalId = null;
    this.timeId = null;

    this.state = {
      // Процент проигранного времени
      percentTimeLine: 0,
    };
  }

  private componentDidUpdate(prevProps): void {
    const { playing } = this.props;
    if (playing && !prevProps.playing) {
      this.startTimeLine();
    } else if (!playing && prevProps.playing) {
      this.stopUpdateTimeLine();
    }
  }

  public getPercentTimeLine = (): void => {
    const { percentTimeLine } = this.state;
    this.setState({ percentTimeLine: percentTimeLine + this.percent });
  };

  public startTimeLine = (): void => {
    const _this = this;
    const { getRestPlay } = this.props;

    getRestPlay(this.updateStep);
    this.timeId = setTimeout((): void => {
      _this.intervalId = setInterval(this.getPercentTimeLine, this.updateStep);
    });
  };

  public stopUpdateTimeLine = (): void => {
    Promise.all([clearInterval(this.intervalId), clearInterval(this.timeId)]);
  };

  public onClick = (e): void => {
    e.stopPropagation();
    const _this = this;
    const { playing, rewind, togglePlay, updateKeyTime } = this.props;
    const isPlaying = playing;

    if (playing) {
      togglePlay();
    }

    const clientOffset = e.nativeEvent.offsetX;
    const timeLineWidth = +this.timeLineRef.current.offsetWidth.toFixed();
    const percent = (clientOffset / timeLineWidth) * 100;
    rewind(percent);

    this.setState({ percentTimeLine: percent }, (): void => {
      updateKeyTime();
      if (isPlaying) {
        togglePlay();
      }
    });
  };

  private render(): React.SFC {
    const { percentTimeLine } = this.state;
    return (
      <MainWrap ref={this.timeLineRef} onClick={this.onClick}>
        <MainLine>
          <BehindLine style={{ width: `${percentTimeLine}%` }} />
          <Point />
        </MainLine>
      </MainWrap>
    );
  }
}

export default TimeLineComponent;

const MainWrap = styled.div`
  padding: 5px 0;
  cursor: pointer;
`;

const MainLine = styled.div`
  background-color: #e7e7e7;
  height: 2px;
  display: flex;
  cursor: pointer;
`;

const BehindLine = styled.div`
  width: 0;
  height: 2px;
  background-color: blue;
  cursor: pointer;
`;

const Point = styled.div`
  width: 10px;
  height: 10px;
  position: relative;
  top: -4px;
  background-color: blue;
  border-radius: 50%;
  cursor: pointer;
`;
