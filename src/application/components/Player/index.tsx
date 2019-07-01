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

  private render(): React.SFC {
    return (
      <ConsumerPage>
        {(context): void => {
          const { getDuration, getRestPlay, togglePlay, duration } = context;
          const playing = context.playing || this.props.playing;

          return (
            <MainWrap>
              <MainWrapIn>
                <PlayButtonWrap>
                  <PlayButtonComponent togglePlay={togglePlay} playing={playing} />
                </PlayButtonWrap>
                <TimeLineWrap>
                  <TimeLineComponent duration={duration} playing={playing} />
                </TimeLineWrap>
                <TimeWrap>
                  <TimeComponent
                    duration={duration}
                    getDuration={getDuration}
                    getRestPlay={getRestPlay}
                    playing={playing}
                  />
                </TimeWrap>
              </MainWrapIn>
            </MainWrap>
          );
        }}
      </ConsumerPage>
    );
  }
}

export default PlayerComponent;

const MainWrap = styled.div`
  overflow: hidden;
  border: solid 1px #e7e7e7;
  margin: 20px 0;
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
