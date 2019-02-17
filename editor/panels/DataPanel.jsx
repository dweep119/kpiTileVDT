import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import withPanel from '@visualbi/bifrost-editor/dist/core/withPanel';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';
import ValueDriverTree from '../store/ValueDriverTree';
// import TreeStore from '../store/TreeStore';
import DataMenu from '../components/Data/DataMenu';
import '../styles/Icon.css';

const panelConfig = {
  title: 'Data',
  options: {
    resizable: false
  }
};

class DataPanel extends Component {
  constructor(props) {
    super(props);
    this.ValueDriverTree = new ValueDriverTree();
    // this.TreeStore = new TreeStore(this.props.store, this.props.VdtInstance);
  }

  static get propTypes() {
    return { store: PropTypes.element };
  }

  render() {
    const { store, VdtInstance } = this.props;

    return (
      <Provider ValueDriverTree={this.ValueDriverTree} >
        <DataMenu store={store} VdtInstance={VdtInstance} />
      </Provider>
    );
  }
}

DataPanel.defaultProps = {
  store: {}
};

export default withPanel(observer(DataPanel), panelConfig);
