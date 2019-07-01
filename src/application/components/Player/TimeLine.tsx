// Modules
import * as React from 'react';
import styled from 'styled-components';

class TimeLineComponent extends React.PureComponent<{}, {}> {
  private constructor(props) {
    super(props);

    this.updateStep = 500;
    this.intervalId = null;
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
    const { duration } = this.props;
    const { percentTimeLine } = this.state;
    const quantSteps = duration / (this.updateStep / 1000);
    const percent = 100 / quantSteps;

    this.setState({ percentTimeLine: percentTimeLine + percent });
  };

  public startTimeLine = (): void => {
    this.intervalId = setInterval(this.getPercentTimeLine, this.updateStep);
  };

  public stopUpdateTimeLine = (): void => {
    clearInterval(this.intervalId);
  };

  private render(): React.SFC {
    const { percentTimeLine } = this.state;
    console.log(percentTimeLine);
    return (
      <MainLine>
        <BehindLine style={{ width: `${percentTimeLine}%` }} />
        <Point />
      </MainLine>
    );
  }
}

export default TimeLineComponent;

const MainLine = styled.div`
  background-color: #e7e7e7;
  height: 2px;
  display: flex;
  cursor: pointer;
`;

const BehindLine = styled.div`
  width: ${({ percentTimeLine }): string | number => (percentTimeLine ? `${percentTimeLine}%` : 0)};
  height: 2px;
  background-color: blue;
  cursor: pointer;
`;

const Point = styled.div`
  width: 10px;
  height: 10px;
  position: relative;
  top: -4px;
  left: -5px;
  background-color: blue;
  border-radius: 50%;
  cursor: pointer;
`;
