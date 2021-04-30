import '../css/baseMap.css';
import { Modal, Button, Container } from 'bootstrap-4-react';
import { useRef, useState } from 'react';
import smalltalk from 'smalltalk';
import { memory } from './utils';

function BaseMap() {
  const inputRef = useRef();
  const [tabActiveIndex, setTabActiveIndex] = useState(0);

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
        data-target="#exampleModal2"
      >
        增加新模型
      </Button>

      {/* Modal */}
      <Modal id="exampleModal2" fade>
        <Modal.Dialog>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>输入提示</Modal.Title>
              <Modal.Close>
                <span aria-hidden="true">&times;</span>
              </Modal.Close>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <div className="m-sys-inner">
                  <div className="m-sys-header">
                    <ul className="m-sys-tab-wrap">
                      <li
                        className={
                          'm-sys-tab ' + (tabActiveIndex === 0 ? 'active' : '')
                        }
                        onClick={() => {
                          setTabActiveIndex(0);
                        }}
                      >
                        <span className="m-sys-tab-text">用户管理</span>
                      </li>
                      <li
                        className={
                          'm-sys-tab ' + (tabActiveIndex === 1 ? 'active' : '')
                        }
                        onClick={() => {
                          setTabActiveIndex(1);
                        }}
                      >
                        <span className="m-sys-tab-text">基础配置</span>
                      </li>
                      <li
                        className={
                          'm-sys-tab ' + (tabActiveIndex === 2 ? 'active' : '')
                        }
                        onClick={() => {
                          setTabActiveIndex(2);
                        }}
                      >
                        <span className="m-sys-tab-text">通知配置</span>
                      </li>
                    </ul>
                  </div>
                  <div className="m-sys-content">
                    <div
                      className={
                        'm-sys-view ' + (tabActiveIndex === 0 ? 'active' : '')
                      }
                    >
                      0
                    </div>
                    <div
                      className={
                        'm-sys-view ' + (tabActiveIndex === 1 ? 'active' : '')
                      }
                    >
                      1
                    </div>
                    <div
                      className={
                        'm-sys-view ' + (tabActiveIndex === 2 ? 'active' : '')
                      }
                    >
                      2
                    </div>
                  </div>
                </div>
              </Container>
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

export default BaseMap;
