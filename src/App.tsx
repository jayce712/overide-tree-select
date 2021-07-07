import React from "react";
import TreeSelect from "./TreeSelect";
import TreeSelect2 from "./TreeSelect2";
import "antd/dist/antd.css";
import "./styles.css";

const treeData = [
  {
    title: "集团",
    value: "0",
    key: "0",
    children: [
      {
        title: "事业部1",
        value: "0-0",
        key: "0-0",
        children: [
          {
            title: "厂房1-1",
            value: "0-0-0",
            key: "0-0-0"
          }
        ]
      },
      {
        title: "事业部2",
        value: "0-1",
        key: "0-1",
        children: [
          {
            title: "厂房2-1",
            value: "0-1-0",
            key: "0-1-0"
          },
          {
            title: "厂房2-2",
            value: "0-1-1",
            key: "0-1-1"
          },
          {
            title: "厂房2-3",
            value: "0-1-2",
            key: "0-1-2"
          }
        ]
      },
      {
        title: "事业部3",
        value: "0-2",
        key: "0-2"
      }
    ]
  }
];

export default function App() {
  return (
    <div>
      <div>第一种</div>
      <p>
        父子节点解耦，正向选择即选择父节点，对应子节点默认全部选中；但是反向取消子节点选中状态，父节点选中状态不被取消
      </p>
      <TreeSelect treeData={treeData} />
      <div style={{ marginTop: 50 }}>第二种</div>
      <p>
        在第一种效果的基础上挂了一个"全部"的虚拟节点，导致选择时会把"全部"也回填到选择框中，但是"全部"实际上是无意义的，对"全部"这个节点在选择框中做特殊处理？或者从维度树中去掉"全部"这个虚拟节点？
      </p>
      <TreeSelect2
        treeData={[
          {
            title: "全部",
            key: "-1",
            value: "-1",
            children: treeData
          }
        ]}
      />
    </div>
  );
}
