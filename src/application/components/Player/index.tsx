// Modules
import * as React from 'react';
import styled from 'styled-components';
// Components
import TimeLineComponent from './TimeLine';
import TimeComponent from './Time';
import PlayButtonComponent from './Play';
// Context
import { ConsumerPage } from '../../containers/Page';

class PlayerComponent extends React.PureComponent<{}, {}> {
  private static defaultProps = {
    playing: false,
  };

  public state = {
    keyTime: 0,
  };

  public updateKeyTime = (): void => {
    const { keyTime } = this.state;
    this.setState({ keyTime: keyTime + 1 });
  };

  private render(): React.SFC {
    const { keyTime } = this.state;

    return (
      <ConsumerPage>
        {(context): void => {
          const {
            getDuration,
            getRestPlay,
            getCurrentTime,
            rewind,
            togglePlay,
            duration,
          } = context;
          const playing = context.playing || this.props.playing;

          if (duration) {
            return (
              <MainWrap>
                <MainWrapIn>
                  <PlayButtonWrap>
                    <PlayButtonComponent togglePlay={togglePlay} playing={playing} />
                  </PlayButtonWrap>
                  <TimeLineWrap>
                    <TimeLineComponent
                      duration={duration}
                      getRestPlay={getRestPlay}
                      playing={playing}
                      rewind={rewind}
                      togglePlay={togglePlay}
                      updateKeyTime={this.updateKeyTime}
                    />
                  </TimeLineWrap>
                  <TimeWrap>
                    <TimeComponent
                      update={keyTime}
                      duration={duration}
                      getCurrentTime={getCurrentTime}
                      getDuration={getDuration}
                      getRestPlay={getRestPlay}
                      playing={playing}
                    />
                  </TimeWrap>
                </MainWrapIn>
              </MainWrap>
            );
          }

          return null;
        }}
      </ConsumerPage>
    );
  }
}

export default PlayerComponent;

const MainWrap = styled.div`
  overflow: hidden;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  margin: 42px auto 0 auto;
  max-width: 737px;
`;

const MainWrapIn = styled.div`
  margin-left: -20px;
  padding: 20px;
  display: flex;
  align-items: center;

  & > * {
    margin-left: 20px;
  }
`;

const PlayButtonWrap = styled.div``;

const TimeLineWrap = styled.div`
  flex: 1;
`;

const TimeWrap = styled.div``;
