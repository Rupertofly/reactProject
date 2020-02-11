import React from 'react';
import './AppContainer.scss';

interface Props {
  bloop?: string;
}

const AppContainer: React.FC<Props> = () => {
  return <div>barry the orld <button onClick={() => console.log('mlem')
  }>I am bloop</button></div>;
};

export default AppContainer;
