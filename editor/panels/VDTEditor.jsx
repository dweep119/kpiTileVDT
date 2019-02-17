import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import withPanel from '@visualbi/bifrost-editor/dist/core/withPanel';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';
import ValueDriverTree from '../store/ValueDriverTree';
import TreeStore from '../store/TreeStore';
import VDTMenuSelection from '../components/VDTMenu/VDTMenuSelection';
import '../styles/Icon.css';

const panelConfig = {
  title: '',
  options: {
    resizable: false,
  }
};

class VDTEditorPanel extends Component {
  constructor(props) {
    super(props);
    this.ValueDriverTree = new ValueDriverTree();
    this.TreeStore = new TreeStore(this.props.store, this.props.VdtInstance);
  }

  /* static get propTypes() {
    return {
      store: PropTypes.element
    };
  } */

  render() {
    const { VdtInstance } = this.props;

    return (
      <Provider ValueDriverTree={this.ValueDriverTree} TreeStore={this.TreeStore}>
        <VDTMenuSelection VdtInstance={VdtInstance} />
      </Provider>
    );
  }
}

VDTEditorPanel.defaultProps = {
  store: {}
};

export default withPanel(observer(VDTEditorPanel), panelConfig);
