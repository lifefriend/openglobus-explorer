import '@openglobus/og/css/og.css';
import { useEffect } from 'react';
import * as og from '@openglobus/og';
import '../css/App.css';
import { memory } from './utils';
// import Model from './model';
// import BaseMap from './baseMap';
// import Earth from './earth';

function App() {
  useEffect(() => {
    const instance = new og.Globe({
      target: 'cesiumContainer'
    })
    memory.instance = instance;
  }, []);

  return (
    <div>
      <div id="cesiumContainer" className="fullWindow"></div>
      <div className="container-fluid position-absolute p-1">
        {/* <Model />
        <BaseMap />
        <Earth /> */}
      </div>
    </div>
  );
}

export default App;
