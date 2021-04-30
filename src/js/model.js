import { Modal, Button } from 'bootstrap-4-react';
import { useRef } from 'react';
import smalltalk from 'smalltalk';
import { memory } from './utils';

function Model() {
  const inputRef = useRef();

  const createModel = (url) => {
    const instance = memory.instance;
    const height = 5000;
    instance.viewer.entities.removeAll();
    instance.getEntityManager().add3DGlft(
      [
        {
          name: url,
          position: {
            x: 121.466139,
            y: 31.257341,
            z: height,
          },
          orientation: {
            heading: 0,
            pitch: 0,
            roll: 0,
          },
          uri: url,
        },
      ],
      { zoom: false }
    );
    instance.setCenter(
      {
        x: 121.466139,
        y: 31.257341,
        z: height * 5,
      },
      1
    );
  };

  const createTileset = (url) => {
    const instance = memory.instance;
    instance.getEntityManager().add3DTiles({ url }, { zoomTo: true });
  };

  const addModel = () => {
    let tilesetJsonFile = inputRef.current.value;
    tilesetJsonFile = tilesetJsonFile
      .replace(/\\/g, '/')
      // eslint-disable-next-line
      .replace(/[\'\"]/g, '')
      .trim();
    if (tilesetJsonFile === '') {
      smalltalk.alert('Error', 'url 不能为空!');
      return;
    }
    if (!/^http:\/\/|^file:\/\//.test(tilesetJsonFile)) {
      tilesetJsonFile = 'file:///' + tilesetJsonFile;
    }
    // if (tilesetJsonFile.endsWith(/\.gltf|\.glb/)) {
    if (/\.gltf$|\.glb$/.test(tilesetJsonFile)) {
      createModel(tilesetJsonFile);
    } else {
      if (!tilesetJsonFile.endsWith('.json')) {
        tilesetJsonFile += '/tileset.json';
      }
      createTileset(tilesetJsonFile);
    }
  };

  const clearAllModels = () => {
    const viewer = memory.instance.viewer;
    viewer.entities.removeAll();
    viewer.scene.primitives.removeAll();
  };

  return (
    <div className="d-inline-block">
      {/* Button trigger Modal */}
      <Button
        primary
        className="ml-2"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        增加新模型
      </Button>

      {/* Modal */}
      <Modal id="exampleModal" fade>
        <Modal.Dialog>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>输入提示</Modal.Title>
              <Modal.Close>
                <span aria-hidden="true">&times;</span>
              </Modal.Close>
            </Modal.Header>
            <Modal.Body>
              <div className="p-1">
                请输入3dtiles|gltf文件路径，例如: C:\gltf\tileset.json
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    url:
                  </span>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  placeholder="C:\gltf\tileset.json"
                  aria-describedby="basic-addon1"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button secondary data-dismiss="modal">
                取消
              </Button>
              <Button primary data-dismiss="modal" onClick={addModel}>
                确定
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>

      <Button primary className="ml-2" onClick={clearAllModels}>
        清空所有模型
      </Button>
    </div>
  );
}

export default Model;
