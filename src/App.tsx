import React from "react";
import TreeSelect from "./TreeSelect";
import "antd/dist/antd.css";
import "./styles.css";

const treeData = [
  {
    title: "全部",
    value: "0",
    key: "0",
    children: [
      {
        title: "父级节点1",
        value: "0-0",
        key: "0-0",
        children: [
          {
            title: "子节点1-1",
            value: "0-0-0",
            key: "0-0-0"
          }
        ]
      },
      {
        title: "父级节点2",
        value: "0-1",
        key: "0-1",
        children: [
          {
            title: "子节点2-1",
            value: "0-1-0",
            key: "0-1-0"
          },
          {
            title: "子节点2-2",
            value: "0-1-1",
            key: "0-1-1"
          },
          {
            title: "子节点2-3",
            value: "0-1-2",
            key: "0-1-2"
          }
        ]
      },
      {
        title: "父级节点3",
        value: "0-2",
        key: "0-2"
      }
    ]
  }
];

export default function App() {
  return (
    <div className="App">
      <TreeSelect treeData={treeData} />
    </div>
  );
}
