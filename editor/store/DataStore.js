import {decorate, observable, action, computed} from 'mobx';

class NodeConfig {
  nodeConfig = {
    nodeData: {
      dec: 0
    },
    treeData: [],
    treeArray: []
  }
  data = {
    nodeMapping: {},
    dataSeries: {},
    periodAgg: {
      activePeriod: {},
      totalOfPeriod: {},
      totalToPeriod: {},
      selectedInterval: {}
    },
    primarySec: {}
  }
  appearance = {
    visualization: {},
    statusBar: {},
    general: {},
    colors: {}
  }

  constructor() {}

  //   Data

  nodeMappingFun(value) {
    this.data.nodeMapping = {
      ...this.nodeMapping,
      ...value
    };
  }
  dataSeriesFun(value) {
    this.data.dataSeries = {
      ...this.dataSeries,
      ...value
    };
  }
  periodAggFun(value) {
    this.data.periodAgg = {
      ...this.data.periodAgg,
      ...value
    };
  }
  primarySecFun(value) {
    this.data.primarySec = {
      ...this.data.primarySec,
      ...value
    };
  }

  //   Appearance
  generalFun(value) {
    this.appearance.general = {
      ...this.appearance.general,
      ...value
    };
  }
  statusBarFun(value) {
    this.appearance.statusBar = {
      ...this.appearance.statusBar,
      ...value
    };
  }
  visualizationFun(value) {
    this.appearance.visualization = {
      ...this.appearance.visualization,
      ...value
    };
  }
  colorsFun(value) {
    this.appearance.colors = {
      ...this.appearance.colors,
      ...value
    };
  }

  //  Node Config
  updateTreeData(data, array) {
    this.nodeConfig.treeData = data;
    this.nodeConfig.treeArray = array;
  }

  addNodeFun(value) {
    this.nodeConfig.nodeData = {
      ...this.nodeConfig.nodeData,
      ...value
    };
    let index = this
    .nodeConfig.treeArray
      .findIndex(o => o.name === this.nodeConfig.nodeData.name);
    this
    .nodeConfig.treeArray
      .splice(index, 0, this.nodeConfig.nodeData);
  }

}

export default decorate(NodeConfig, {
  data: observable,
  nodeConfig: observable,
  appearance: observable,
  updateTreeData: action,
  generalFun: action,
  visualizationFun: action,
  statusBarFun: action,
  colorsFun: action,
  nodeMappingFun: action,
  periodAggFun: action,
  dataSeriesFun: action,
  primarySecFun: action

});