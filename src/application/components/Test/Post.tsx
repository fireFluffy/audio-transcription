// Modules
import * as React from 'react';
import styled from 'styled-components';
// Resources
import { icons } from '../../imports';

class PostComponent extends React.PureComponent<{}, {}> {
  private render(): React.SFC {
    const { activeWordId, timeStart, row } = this.props;
    const date = timeStart.toString().split('.');
    const seconds = date[1].padStart(2, '0');

    return (
      <MainWrap>
        <PostWrap>
          <ProfileWrap>
            <ProfileCirce>
              <ProfileIcon />
            </ProfileCirce>
          </ProfileWrap>
          <MessageWrap>
            <TimeStartWrap>{`${date[0]}:${seconds}`}</TimeStartWrap>
            {row.map(({ id, word }): void => (
              <Wrap key={id}>
                <WordWrap isActiveId={activeWordId === id}>{word}</WordWrap>{' '}
              </Wrap>
            ))}
          </MessageWrap>
        </PostWrap>
      </MainWrap>
    );
  }
}

export default PostComponent;

const MainWrap = styled.div`
  margin: 0 0 30px 0;
  color: #05294b;
  cursor: default;
  user-select: none;
`;

const TimeStartWrap = styled.div`
  color: #8494a6;
`;

const Wrap = styled.span``;

const WordWrap = styled.span`
  background-color: ${({ isActiveId }) => (isActiveId ? `#9cc2ff` : `none`)};
`;

const PostWrap = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: -17px;

  & > * {
    margin-left: 17px;
  }
`;

const ProfileWrap = styled.div``;

const ProfileCirce = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #dae7ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileIcon = styled.div`
  background-color: #8696a8;
  width: 16px;
  height: 19px;
  mask: url('${icons.profile}') 0 0 / contain no-repeat;
`;

const MessageWrap = styled.div`
  flex: 1;
`;
