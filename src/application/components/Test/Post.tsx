// Modules
import * as React from 'react';
import styled from 'styled-components';
// Components

class PostComponent extends React.PureComponent<{}, {}> {
  private render(): React.SFC {
    const { activeWordId, row } = this.props;

    return (
      <MainWrap>
        {row.map(({ id, word }) => (
          <Wrap key={id}>
            <WordWrap isActiveId={activeWordId === id}>{word}</WordWrap>{' '}
          </Wrap>
        ))}
      </MainWrap>
    );
  }
}

export default PostComponent;

const MainWrap = styled.div`
  margin: 0 0 30px 0;
  cursor: default;
  user-select: none;
`;
const Wrap = styled.span``;

const WordWrap = styled.span`
  background-color: ${({ isActiveId }) => (isActiveId ? `#9cc2ff` : `none`)};
`;
