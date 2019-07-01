// Modules
import * as React from 'react';
// Components
import PlayerComponent from '../components/Player';

class PlayerContainer extends React.PureComponent<{}, {}> {
  private render(): React.SFC {
    return <PlayerComponent />;
  }
}

export default PlayerContainer;
