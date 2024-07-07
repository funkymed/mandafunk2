import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { TSCustomNodeModel } from "./TSCustomNodeModel";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
  Checkbox,
  IconButton,
  Button,
  Slider,
} from "@mui/material";
import { Circle, CircleOutlined, HighlightOff } from "@mui/icons-material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export interface TSCustomNodeWidgetProps {
  node: TSCustomNodeModel;
  engine: DiagramEngine;
}

export interface TSCustomNodeWidgetState {
  age: string;
}

export class TSCustomNodeWidget extends React.Component<
  TSCustomNodeWidgetProps,
  TSCustomNodeWidgetState
> {
  constructor(props: TSCustomNodeWidgetProps) {
    super(props);
    this.state = {
      age: "",
    };
  }

  handleChange(event: SelectChangeEvent) {
    this.setState({ age: event.target.value as string });
  }

  render() {
    return (
      <Grid
        style={{
          width: 320,
          backgroundColor: this.props.node.color,
          borderRadius: 10,
          border: "4px #FFFFFF55 solid",
        }}
        container
        spacing={0}
        columns={12}
        sx={{
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}
      >
        <Grid xs={2}>
          <Checkbox
            style={{ left: -7, top: -7 }}
            {...label}
            icon={<CircleOutlined />}
            defaultChecked={true}
            checkedIcon={<Circle style={{ color: "orange" }} />}
            size={"small"}
          />
          <div>
            <PortWidget
              engine={this.props.engine}
              port={this.props.node.getPorts()["x"]}
            >
              <span className="port-label">
                {" "}
                <div className="circle-port-in" /> x
              </span>
            </PortWidget>

            <PortWidget
              engine={this.props.engine}
              port={this.props.node.getPorts()["y"]}
            >
              <span className="port-label">
                <div className="circle-port-in" /> y
              </span>
            </PortWidget>

            <PortWidget
              engine={this.props.engine}
              port={this.props.node.getPorts()["z"]}
            >
              <span className="port-label">
                <div className="circle-port-in" /> z
              </span>
            </PortWidget>
          </div>
        </Grid>
        <Grid xs={8} style={{ textAlign: "center" }}>
          {this.props.node.name}

          <div>
            <Slider defaultValue={30} />
            <Divider />
            <Select
              value={this.state.age}
              label="Age"
              onChange={this.handleChange.bind(this)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid xs={2}>
          <IconButton size="small" style={{ right: 3, top: -5 }}>
            <HighlightOff style={{ color: "#FFFFFF55" }} />
          </IconButton>
          <PortWidget
            engine={this.props.engine}
            port={this.props.node.getPorts()["out"]}
          >
            <span
              className="label"
              style={{ display: "ruby-text", textAlign: "right" }}
            >
              output
              <br />
              <div className="circle-port-out" />
            </span>
          </PortWidget>

          <PortWidget
            engine={this.props.engine}
            port={this.props.node.getPorts()["out"]}
          >
            <span
              className="label"
              style={{ display: "ruby-text", textAlign: "right" }}
            >
              output
              <br />
              <div className="circle-port-out" />
            </span>
          </PortWidget>

          <PortWidget
            engine={this.props.engine}
            port={this.props.node.getPorts()["out"]}
          >
            <span
              className="label"
              style={{ display: "ruby-text", textAlign: "right" }}
            >
              output
              <br />
              <div className="circle-port-out" />
            </span>
          </PortWidget>
        </Grid>
      </Grid>
    );
  }
}
