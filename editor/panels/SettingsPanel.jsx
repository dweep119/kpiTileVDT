import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import withPanel from '@visualbi/bifrost-editor/dist/core/withPanel';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';
import ValueDriverTree from '../store/ValueDriverTree';
import TreeStore from '../store/TreeStore';
import SettingsMenu from '../components/Settings/SettingsMenu';
import '../styles/Icon.css';

const panelConfig = {
  title: 'Settings',
  options: {
    resizable: false
  }
};

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.ValueDriverTree = new ValueDriverTree();
    this.TreeStore = new TreeStore(this.props.store, this.props.VdtInstance);
  }

  static get propTypes() {
    return { store: PropTypes.element };
  }

  render() {
    const { store, treeInstance, VdtInstance } = this.props;

    return (
      <Provider ValueDriverTree={this.ValueDriverTree} TreeStore={this.TreeStore}>
        <SettingsMenu store={store} treeInstance={treeInstance} VdtInstance={VdtInstance} />
      </Provider>
    );
  }
}

SettingsPanel.defaultProps = {
  store: {}
};

export default withPanel(observer(SettingsPanel), panelConfig);
