import React, { Component } from 'react';
import Tile from '@visualbi/bifrost-editor/dist/elements/Tile';
import Box from '@visualbi/bifrost-editor/dist/layout/Box';
import Button from '@visualbi/bifrost-editor/dist/elements/Button';
import { observer, inject } from 'mobx-react';
import Flex from '@visualbi/bifrost-editor/dist/layout/Flex';
import PropTypes from 'prop-types';
import '../../styles/Panels.css';

class TileSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tileSelected: ''
    };
    this.onContinue = this.onContinue.bind(this);
  }

  /* static get propTypes() {
    return {
      menu: PropTypes.shape,
      ValueDriverTree: PropTypes.element,
    };
  } */

  onContinue() {
    const { ValueDriverTree, router, TreeStore } = this.props;
    const { tileSelected } = this.state;
    ValueDriverTree.setVdtMenu(tileSelected);
  }

  render() {
    const { menu } = this.props;
    const { tileSelected } = this.state;

    return (
      <Box>
        {<h2 className="select-header">Value Driver Tree</h2>}
        {<h4>Start designing your tree</h4>}
        {
          menu.map((data) => {
            const { title, subTitle, icon } = data;

            return (
              <Tile
                title={title}
                key={title}
                subtitle={subTitle}
                icon={icon}
                secondary={tileSelected === title}
                onClick={(e, j) => this.setState({ tileSelected: j.title })}
              />
            );
          })
        }
        <Flex justifyContent="flex-end">
          <Button onClick={this.onContinue} className="btn-primary continue">Continue</Button>
        </Flex>

      </Box>
    );
  }
}

TileSelection.defaultProps = {
  menu: [],
  ValueDriverTree: {},
};
export default inject('TreeStore')(inject('router')(inject('ValueDriverTree')(observer(TileSelection))));
