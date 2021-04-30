import { Button } from 'bootstrap-4-react';
import { memory } from './utils';

function Earth() {
  const toggle = () => {
    const viewer = memory.instance.viewer;
    const show = viewer.scene.globe.show;
    viewer.scene.globe.show = !show;
    viewer.scene.skyBox.show = !show;
    viewer.scene.skyAtmosphere.show = !show;
    viewer.scene.sun.show = !show;
  };

  return (
    <div className="d-inline-block">
      <Button primary className="ml-2" onClick={toggle}>
        地球显隐
      </Button>
    </div>
  );
}

export default Earth;
