import React from "react";
import { TreeSelect as AntdTreeSelect } from "antd";
import { TreeSelectProps as AntdTreeSelectProps } from "antd/lib/tree-select";

interface TreeSelectProps extends AntdTreeSelectProps<any> {}

interface LabelInValue {
  label: string;
  value: string;
}

const getChildNodesViaNodeValue = (treeData: any[], value: string) => {
  const getNodes = (data: any[], nodes = []) => {
    return data.reduce((memo, item) => {
      memo.push(item.value);
      if (item.children) {
        getNodes(item.children, memo);
      }
      return memo;
    }, nodes);
  };

  let childNodes = [];
  let stack = [...treeData];
  while (stack.length) {
    const current = stack.shift();
    if (current.value === value) {
      if (current.children) {
        childNodes = getNodes(current.children, childNodes);
      }
      stack = [];
    } else {
      if (current.children) {
        stack = stack.concat(current.children);
      }
    }
  }
  return childNodes;
};

// const stringToMapping = (data: string[]) => {
//   return data.map((value) => ({
//     label: undefined,
//     value: value
//   }));
// };

const TreeSelect = (props: TreeSelectProps) => {
  const [value, setValue] = React.useState<string[]>(props.value || []);

  const selectedNodeRef = React.useRef<string>();

  React.useEffect(() => {
    // 因为父级节点和子节点没关联关系，简单认为长度不一致的话，就需要同步数据
    if (Array.isArray(props.value) && props.value?.length !== value.length) {
      setValue(props.value);
    }
  }, [props.value]);

  const onChange = (data: LabelInValue[]) => {
    let childNodes: string[] = [];
    if (selectedNodeRef.current) {
      childNodes = getChildNodesViaNodeValue(
        props.treeData || [],
        selectedNodeRef.current
      );
    }
    const newValueSet = data.reduce((memo: Set<string>, item) => {
      memo.add(item.value);
      if (item.value === selectedNodeRef.current && childNodes.length > 0) {
        childNodes.forEach((v) => {
          memo.add(v);
        });
      }
      return memo;
    }, new Set<string>());
    const newValue = Array.from(newValueSet);
    selectedNodeRef.current = "";
    setValue(newValue);
    // @ts-ignore
    props?.onChange?.(newValue);
  };

  const onSelect = (value: LabelInValue) => {
    selectedNodeRef.current = value.value;
  };

  const formatedValue = React.useMemo(() => {
    return value.map((value) => ({
      label: undefined,
      value: value
    }));
  }, [value]);

  console.log("formatedValues:", formatedValue, value.indexOf("0") > -1);

  return (
    <AntdTreeSelect
      {...props}
      value={formatedValue}
      onChange={onChange as any}
      onSelect={onSelect}
      treeCheckable
      treeCheckStrictly
      treeDefaultExpandAll
      showCheckedStrategy={AntdTreeSelect.SHOW_ALL}
      searchPlaceholder={"Please select"}
      style={{ width: "500px" }}
    />
  );
};

export default TreeSelect;
