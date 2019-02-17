import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { toJS } from 'mobx';
import withPanel from '@visualbi/bifrost-editor/dist/core/withPanel';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';
import ValueDriverTree from '../store/ValueDriverTree';
import TreeStore from '../store/TreeStore';
import NodeTree from '../components/Nodes/NodeTree';
import '../styles/Icon.css';
import SampleTreeProvider from '../store/SampleTreeProvider';

const panelConfig = {
  title: 'Nodes',
  options: {
    resizable: true
  }
};

class NodePanel extends Component {
  constructor(props) {
    super(props);
    const state = this.props.router.state;
    const action = state && state.action;
    const VdtInstance = this.props.VdtInstance;
    this.ValueDriverTree = new ValueDriverTree();
    this.TreeStore = new TreeStore(this.props.store, VdtInstance);

    // TO-DO : Add Reset Confirmation as already configured tree will be lost

    this.setupTree(action, VdtInstance);
  }

  static get propTypes() {
    return { store: PropTypes.element };
  }

  setupTree(action, VdtInstance) {
    // TO-DO : Add Reset Confirmation as already configured tree will be lost

    switch (action) {
      case 'new':
        this.TreeStore.treeMap = {};
        this.TreeStore.treeHier = VdtInstance.TreeUtils.addNewNode(null, this.TreeStore.treeMap);
        this.TreeStore.setHierarchicalTree(this.TreeStore.treeHier);
        break;

      case 'sampleTree':
        const sampleTree = new SampleTreeProvider('default').getTreeData();
        if (sampleTree) {
          const treeData = VdtInstance.TreeUtils.getTreeFromFlatData(sampleTree);
          this.TreeStore.treeHier = treeData.treeHier;
          this.TreeStore.treeMap = treeData.treeMap;
          this.TreeStore.setHierarchicalTree(treeData.treeHier);
        }
        break;

      case 'dynamicTree':
        this.TreeStore.treeMap = {};
        this.TreeStore.treeHier = VdtInstance.TreeUtils.addNewNode(null, this.TreeStore.treeMap);
        this.TreeStore.treeHier.deriveChildren = true;
        this.TreeStore.setHierarchicalTree(this.TreeStore.treeHier);
        break;

      default:
        const treeHierachy = toJS(this.props.store.get('treeConfig'));
        if (treeHierachy.length > 0) {
          const treeData = VdtInstance.TreeUtils.getTreeFromFlatData(treeHierachy);
          this.TreeStore.treeHier = treeData.treeHier;
          this.TreeStore.treeMap = treeData.treeMap;
          this.TreeStore.setHierarchicalTree(treeData.treeHier, true);
        } else {
          // TODO: Nothing Configured. Show Placeholder Tree
        }
    }
  }


  render() {
    const { store, VdtInstance } = this.props;

    return (
      <Provider ValueDriverTree={this.ValueDriverTree} TreeStore={this.TreeStore}>
        <NodeTree store={store} VdtInstance={VdtInstance} />
      </Provider>
    );
  }
}

NodePanel.defaultProps = {
  store: {}
};

export default withPanel(observer(NodePanel), panelConfig);
