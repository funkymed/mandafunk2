import {
  BaseModelOptions,
  DefaultPortModel,
  NodeModel,
} from "@projectstorm/react-diagrams";

export interface TSCustomNodeModelOptions extends BaseModelOptions {
  color?: string;
  name?: string;
}

export class TSCustomNodeModel extends NodeModel {
  color: string;
  name: string;

  constructor(options: TSCustomNodeModelOptions = {}) {
    super({
      ...options,
      type: "ts-custom-node",
    });
    this.color = options.color || "red";
    this.name = options.name || "noname";

    // setup an in and out port
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "x",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "y",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "z",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: "out",
      })
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      name: this.name,
      color: this.color,
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.name = event.data.name;
    this.color = event.data.color;
  }
}
