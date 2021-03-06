import React, { Component } from 'react';
import { observer, Provider } from 'mobx-react';
import withPanel from '@visualbi/bifrost-editor/dist/core/withPanel';
import 'react-sortable-tree/style.css';
import PropTypes from 'prop-types';

import DataStore from '../store/DataStore';
import CustomizeMenu from '../components/Customize/CustomizeMenu'
import '../styles/Icon.css';

const panelConfig = {
  title: 'Customize',
  options: {
    resizable: false
  }
};

class CustomizePanel extends Component {
  constructor(props) {
    super(props);
    this.dataStore = new DataStore();
  }

  static get propTypes() {
    return { store: PropTypes.element };
  }

  render() {
    const { store, dataView, onClose } = this.props;
    // const obj = { enable: true };
    //   store.set('kpieditor', obj);
    console.log('Customize Panel', this.props)
    return (
      <Provider dataStore={this.dataStore}>
        <CustomizeMenu store={store} dataView={dataView} onClose={onClose} />
      </Provider>
    );
  }
}

CustomizePanel.defaultProps = {
  store: {}
};

export default withPanel(observer(CustomizePanel), panelConfig);
