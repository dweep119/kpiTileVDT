import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class CreateNodeButton extends Component {
  constructor(props) {
    super(props);
    this.onNewNodeAdded = this.onNewNodeAdded.bind(this);
  }

  /*
    func onChangeTreeData
    params { parentNode } Null if Top node else node data to which child is created.
    params { data } Node data
    info: create new node int VDT
  */
  onNewNodeAdded(parentNode) {
    const { VdtInstance, TreeStore } = this.props;
    const parentHier = TreeStore.treeMap[parentNode.name];
    VdtInstance.TreeUtils.addNewNode(parentHier, TreeStore.treeMap);
    TreeStore.setHierarchicalTree(TreeStore.treeHier);
  }

  render() {
    const { children, parentNode, data } = this.props;

    return (
      <div
        className="add-new-node"
        onClick={() => this.onNewNodeAdded(parentNode, data)}
      >
        {children}
      </div>
    );
  }
}

export default inject('TreeStore')(inject('ValueDriverTree')(observer(CreateNodeButton)));
