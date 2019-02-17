import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../../styles/FormElements.css';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import '../../styles/FormElements.css';
import FormGroup from '@visualbi/bifrost-editor/dist/forms/FormGroup';

class Colors extends Component {
	constructor(props) {
		super(props);
		const { ValueDriverTree } = this.props;
		const colors = ValueDriverTree.appearance.colors;
		this.palettes = {
			light: {
				colorNodePrimaryFont:'#000000',
				colorNodeSecondaryFont:'#777777',
				colorSim:'#2E8AB8',
				colorNodeBg:'#FFFFFF',
				opacityNodeBg:'0.9',
				colorNodeBorder:'#000000',
				opacityNodeBorder:'0.2',
				colorNodeBgDerived:'#FFFFFF',
				opacityNodeBgDerived:'0.3',
				colorLinks:'#666666',
				colorNodeBorderFocus:'#2E8AB8',
				colorCanvasBase:'#E2E8EF',
				colorCanvas1:'#C5DADC',
				colorCanvas2:'#91ABBF',
				colorCanvas3:'#CFDDE7'
			},
			contrast: {
				colorNodePrimaryFont:'#000000',
				colorNodeSecondaryFont:'#777777',
				colorSim:'#2E8AB8',
				colorNodeBg:'#FFFFFF',
				opacityNodeBg:'0.9',
				colorNodeBorder:'#FFFFFF',
				opacityNodeBorder:'0.9',
				colorNodeBgDerived:'#FFFFFF',
				opacityNodeBgDerived:'0.3',
				colorLinks:'#FFFFFF',
				colorNodeBorderFocus:'#FFFF00',
				colorCanvasBase:'#A2C4D2',
				colorCanvas1:'#152124',
				colorCanvas2:'#FBFDFD',
				colorCanvas3:'#B8CBD3'
			},
			dark: {
				colorNodePrimaryFont:'#FFFFFF',
				colorNodeSecondaryFont:'#DDDDDD',
				colorSim:'#7DBFDF',
				colorNodeBg:'#000000',
				opacityNodeBg:'0.3',
				colorNodeBorder:'#000000',
				opacityNodeBorder:'0',
				colorNodeBgDerived:'#000000',
				opacityNodeBgDerived:'0.15',
				colorLinks:'#666666',
				colorNodeBorderFocus:'#2E8AB8',
				colorCanvasBase:'#E2E8EF',
				colorCanvas1:'#93C8B6',
				colorCanvas2:'#95CCD0',
				colorCanvas3:'#B8CBD3'
			}
		};

		this.state = {
			selectedTheme: colors.colorNodeBg === '#FFFFFF' ? 'light' : 'dark'
		};
	}

	onClick = (theme) => {
		const { ValueDriverTree } = this.props;
		const themeColors = this.palettes[theme];
		Object.keys(themeColors).map((key) => {
			ValueDriverTree.appearance.colors[key] = themeColors[key];
		});
		this.setState({ selectedTheme: theme });
	}

	isActive = (value) => {
		return 'theme ' + (value === this.state.selectedTheme ? 'selected-theme' : '');
	}

	render() {
		return (
			<Flex flexDirection="column">
				<h3 className="section-header">Theme Manager</h3>
				<FormGroup>
					<div className="menu-note section-note">Select a standard theme color</div>
				</FormGroup>
				<Box className="theme-selection">
					<Flex flex-direction="column">						
						<Box className={this.isActive('light')} >
							<div onClick={() => this.onClick('light')}>
								<Box>Light Theme</Box>
								<div className='light-preview'></div>
							</div>						
						</Box>
						<Box className={this.isActive('dark')} >
							<div onClick={() => this.onClick('dark')}>
								<Box>Dark Theme</Box>
								<div className='dark-preview'></div>
							</div>
						</Box>
					</Flex>
				</Box>
			</Flex>
		);
	}
}

export default inject('TreeStore')(inject('ValueDriverTree')(observer(Colors)));
