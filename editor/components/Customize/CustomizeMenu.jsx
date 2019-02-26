import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import CommonComponent from './CommonComponent';
import MenuList from '../Shared/MenuList';
import FormPanel from '../Shared/FormPanel';
import GeneralComponent from './General'

import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Modal from '@visualbi/bifrost-editor/dist/layout/Modal';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';
import Tile from '@visualbi/bifrost-editor/dist/elements/Tile';

import '../../styles/DataTab.css';
import '../../styles/Modal.css';
import '../../styles/NodeNavigator.css';
import '@visualbi/bifrost-editor/css/Editor.css'

class CustomizeMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'first',
			text: '',
			id: 0,
			title: '',
			description: '',
			showModal: false,
			selectedTitle: '',
			selectedId: 0,
			selectedText: '',
			key: ''
		};
        
		this.onClick = this.onClick.bind(this);
		this.onBack = this.onBack.bind(this);
		this.addOnClick = this.addOnClick.bind(this);
		this.submit = this.submit.bind(this);
		this.onFieldsChange = this.onFieldsChange.bind(this);
		this.verticalTab = this.verticalTab.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onClick(view, menuItem) {
		const { store } = this.props;
		const itemArray = toJS(store.get('kpitile'));
		console.log('view menuItem', view, menuItem);
		itemArray.map(item => {
			if (item.id === menuItem) {
				this.setState({
					view,
					selectedTitle: item.title,
					selectedId: item.id,
					selectedText: item.text
				});
			}
		});
	}

	onBack() {
		this.setState({ view: 'first' });
	}

	addOnClick () {
		this.setState({showModal: true})
	}

	submit () {
		const { store } = this.props;
		const { text, id, title, description } = this.state;
		const itemArray = toJS(store.get('kpitile'));
		if (id !== 0 ) {
			const obj = {
				'text' : text,
				'id': id,
				'title': title,
				'description': description
			}
			itemArray.push(obj)
			store.set('kpitile', itemArray);
			this.setState({showModal: false})
		}
		console.log('addOnClick', itemArray);
	}

	onFieldsChange (e, j) {
		console.log('onFieldsChange e, j', j, this.state);
		this.setState({
			text: j.description,
			id: Date.now(),
			title: j.title,
			description: j.subtitle,
			key: j.className
		})
	}

	verticalTab () {
		console.log('this.state.key', this.state.key)
    return (
      <div className="">
        <div className="node-config-submit">
          <Button secondary size="sm" className="finish-button" onClick={this.submit} disabled={this.state.key === ''} >Submit</Button>
          {/* <Button primary size="sm" onClick={this.onNext} disabled={selected === 'business-defination'}>Next</Button> */}
        </div>
      </div>
    );
  }

	onClose () {
		this.setState({showModal: false, key: ''})		
	}
  render() {
    const { view, showModal, selectedId, selectedTitle, selectedText } = this.state;
    const { store, dataView, onClose } = this.props;
    const kpitileArray = toJS(store.get('kpitile'));
    console.log('datastore in CustomizeMenu', this.props, store, this.state, kpitileArray)
    // const { treeHierachical } = TreeStore; // Store does not update without this statement, TODO
    return (
      <div className="vdt-data-view" style={{ marginBottom: '20px' }}>
        {view === 'first'
          && kpitileArray.map(data => <MenuList data={data} onClick={this.onClick} /> )
        }
        
        {view === 'second'
          && (
            <FormPanel onSubmit={this.onSubmit} onBack={this.onBack} title={selectedTitle}> 
                { <CommonComponent store={store} title={selectedTitle} data={selectedId} component={selectedText} dataView={dataView} onClose={onClose} /> }
            </FormPanel>
          )
        }

        {
            view === 'first'
            && <div className="node-toolbar" style={{ position: 'fixed', width: '320px'}}>
					<Button className="btn-clear" onClick={this.addOnClick}>
						<Flex alignItems="center">
						<i className="icon icon--Add" />
						Add
						</Flex>              
					</Button>
					<Button className="btn-clear add-node-btn" onClick={this.confirmResetHandler}>
						<Flex>
						<i className="icon icon--Refresh" style={{ color: '#e81123' }} />
						Reset
						</Flex>
					</Button>
				</div>
		}
		
		{
			showModal === true
			&&	<Modal className="node-config-modal" title="Add new KPI Tile" size="large" open={showModal} onClose={this.onClose} >
					<div className="modal-general">
						<div className="modal-general-view">
							{this.verticalTab()}
							<div className="vertical-form">
							<Box className="menu-title">
								<FormGroup label="Select KPI Tile">
								<Flex flexWrap="wrap">
									<Tile
									title="Title"
									key="title"
									subtitle="Containing primitive value from a data source"
									icon="DataSource"
									description="title"
									className={"kpi-title" === this.state.key ? 'active' : 'kpi-title'}
									// secondary={nodeData.cMeth === ''}
									onClick={(e, j) => this.onFieldsChange(e, j)}
									/>
									<Tile
									title="Primary KPI"
									key="primarykpi"
									subtitle="Containing customizable data format and value"
									icon="Custom"
									description="primarykpi"
									className={"kpi-primarykpi" === this.state.key? 'active': 'kpi-primarykpi'}
									// secondary={nodeData.cMeth === 'C'}
									onClick={(e, j) => this.onFieldsChange(e, j)}
									/>
									<Tile
									title="Secondary KPI"
									key="secondarykpi"
									subtitle="Containing a calculation based on other nodes"
									icon="Calculator"
									description="secondarykpi"
									className={"kpi-secondarykpi" === this.state.key? 'active': 'kpi-secondarykpi'}
									// secondary={nodeData.cMeth === 'F' || nodeData.cMeth === 'A' || nodeData.cMeth === 'S' || nodeData.cMeth === 'M' || nodeData.cMeth === 'D'}
									onClick={(e, j) => this.onFieldsChange(e, j)}
									/>

									<Tile
									title="SparkLine Chart"
									key="sparklinechart"
									subtitle="Containing primitive value from a data source"
									icon="DataSource"
									description="sparklinechart"
									className={"kpi-sparklinechart" === this.state.key? 'active': 'kpi-sparklinechart'}
									// secondary={nodeData.cMeth === ''}
									onClick={(e, j) => this.onFieldsChange(e, j)}
									/>
									<Tile
									title="Icon"
									key="icon"
									subtitle="Containing customizable data format and value"
									icon="Custom"
									description="icon"
									className={"kpi-icon" === this.state.key? 'active': 'kpi-icon'}
									// secondary={nodeData.cMeth === 'C'}
									onClick={(e, j) => this.onFieldsChange(e, j)}
									/>
									<Tile
									title="Image"
									key="image"
									subtitle="Containing a calculation based on other nodes"
									icon="Calculator"
									description="image"
									className={"kpi-image" === this.state.key? 'active': 'kpi-image'}
									// secondary={nodeData.cMeth === 'F' || nodeData.cMeth === 'A' || nodeData.cMeth === 'S' || nodeData.cMeth === 'M' || nodeData.cMeth === 'D'}
									onClick={(e, j) => this.onFieldsChange(e, j)}
									/>

								</Flex>
								</FormGroup>
							</Box>
							</div>
						</div>
						</div>
				</Modal>
		}
      </div>
    );
  }
}

  export default inject('dataStore')(observer(CustomizeMenu));
//   export default withPanel(observer(CustomizeMenu), panelConfig); 