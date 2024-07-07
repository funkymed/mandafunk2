import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultLinkModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "./helpers/DemoCanvasWidget";
import { DemoButton, DemoWorkspaceWidget } from "./helpers/DemoWorkspaceWidget";
import * as React from "react";
import { TSCustomNodeModel } from "./custom-node-ts/TSCustomNodeModel";
import { TSCustomNodeFactory } from "./custom-node-ts/TSCustomNodeFactory";

class CanvasDragToggle extends React.Component<any, any> {
  render() {
    const { engine } = this.props;
    return (
      <DemoWorkspaceWidget
        buttons={[
          <DemoButton key={1} onClick={() => engine.zoomToFit()}>
            Zoom to fit
          </DemoButton>,
        ]}
      >
        <DemoCanvasWidget>
          <CanvasWidget engine={engine} className="diagram-container" />
        </DemoCanvasWidget>
      </DemoWorkspaceWidget>
    );
  }
}

const DiagrameTest = () => {
  var engine = createEngine({
    registerDefaultPanAndZoomCanvasAction: true,
    registerDefaultZoomCanvasAction: false,
  });

  engine.getNodeFactories().registerFactory(new TSCustomNodeFactory());

  const model = new DiagramModel();

  var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  var port0 = node1.addOutPort("In");
  var port1 = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  var port2 = node2.addInPort("In");
  var port3 = node2.addInPort("Out");
  node2.setPosition(400, 100);

  var link1 = port1.link(port2);

  const node3 = new TSCustomNodeModel({
    name: "Material",
    color: "rgb(0,128,255)",
  });
  node3.setPosition(200, 200);

  const node4 = new TSCustomNodeModel({
    name: "Cube",
    color: "rgb(255,128,0)",
  });
  node4.setPosition(500, 300);

  const node5 = new TSCustomNodeModel({
    name: "Scene"
  });

  const link2 = new DefaultLinkModel();
  link2.setSourcePort(node3.getPort("out"));
  link2.setTargetPort(node4.getPort("x"));

  // model.addAll(node1, node2, node3, node4, link1, link2);
  model.addAll(node3, node4, node5, link2);

  engine.setModel(model);

  return <CanvasDragToggle engine={engine} />;
};
export default DiagrameTest;
