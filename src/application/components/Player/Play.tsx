// Modules
import * as React from 'react';
import styled from 'styled-components';
// Resources
import { icons } from '../../imports';

class PlayButtonComponent extends React.PureComponent<{}, {}> {
  private render(): React.SFC {
    const { togglePlay, playing } = this.props;
    return (
      <MainWrap onClick={togglePlay} playing={playing}>
        <MainWrapIcon playing={playing} />
      </MainWrap>
    );
  }
}

export default PlayButtonComponent;

const MainWrap = styled.div`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  padding: ${({ playing }): string =>
    playing
      ? `
    7px 0 0 8px
  `
      : `
    8px 0 0 10px
  `}
  background-color: #3373eb;
  cursor: pointer;
  user-select: none;
`;

const MainWrapIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: #fff;

  mask: ${({ playing }): string =>
    playing
      ? `
    url('${icons.pause}') 0 0 / contain no-repeat
  `
      : `
    url('${icons.play}') 0 0 / contain no-repeat
  `};
`;
