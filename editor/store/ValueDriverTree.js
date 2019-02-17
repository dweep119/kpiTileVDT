import {
  decorate, observable, action, computed,
} from 'mobx';


class ValueDriverTree {
  _treeData = [];
  _vdtMenu = null;
  _nodeDataset=[];
  _nodeConfig = null;
  _tabSelection=null;
  _nodeConfigModalOpen=true;
  _importModalOpen=true;
  _importMode="";
  _importTreeSettings = "";
  _importFullTree ="";

  _data = {
    nodeMapProps: {},
    dataSeries: {},
    periodAgg: {
      activePeriod: {},
      totalOfPeriod: {},
      totalToPeriod: {},
      selectedInterval: {},
    },
    primarySec: {},
  };

  
  _dataMenuItem = 0;
  _appearanceMenuItem = 0;
  _navPanelMenuItem = 0;

  _navPanel={
  };

  _appearance = {
    visualization: {},
    statusBar: {},
    general: {},
    colors: {},
  };

//Import Modal 
  get importModalOpen() {
    return this._importModalOpen;
  }
  toogleImportModal(value) {
    this._importModalOpen = value;
  }
  get importModeData(){
    return this._importMode;
  }
  setImportMode(value){
    this._importMode = value;
  }
  get importFullTreeData(){
    return this._importFullTree;
  }
  setImportFullTree(value){
    this._importFullTree = value;
  }

//  node configration modal  setter and getter funtion
  get nodeConfigModalOpen() {
    return this._nodeConfigModalOpen;
  }
  toggleNodeConfigModal(value) {
    this._nodeConfigModalOpen = value;
  }

// Modal Data getter and setter
  get nodeConfig() {
    return this._nodeConfig;
  }
  setNodeConfig(config) {
    this._nodeConfig = config;
  }

//   Menu Tab selection Store setter and getter funtion
  get tabSelection() {
    return this._tabSelection;
  }
  setTabSelection(initValue) {
    this._tabSelection = initValue;
  }


//  VDT Appearance setter and getter funtion
  get appearance() {
    return this._appearance;
  }
  setAppearance(value) {
    this._appearance = value;
  }
  get appearanceMenuItem(){
    return this._dataMenuItem;
  }
  setAppearanceMenuItem(value){
    this._dataMenuItem = value;
  }


//  VDT Data menu  setter and getter funtion
  get data() {
    return this._data;
  }
  setData(value) {
    this._data = value;
  }
  get dataMenuItem(){
    return this._dataMenuItem;
  }
  setDataMenuItem(value){
    this._dataMenuItem = value;
  }

//Settings Panel
  get navPanel(){
    return this._navPanel;
  }
  setSettings(value){
    this._navPanel = value;
  }
  get navPanelMenuItem(){
    return this._navPanelMenuItem;
  }
  setSettingsMenuItem(value){
    this._navPanelMenuItem = value;
  }
 

  
// Node navigator getter and setter
  get nodeDataset() {
    return this._nodeDataset;
  }
  get treeData() {
    return this._treeData;
  }
  setTreeData(treeData) {
    this._treeData = treeData;
  }
  setNodeDataSet(dataset) {
    this._nodeDataset = dataset;
  }

// Initial Menu selection setter and getter
  get vdtMenu() {
    return this._vdtMenu;
  }
  setVdtMenu(item) {
    this._vdtMenu = item;
  }

// Setter for intial data Value
  setInitialData(initValue) {
    this._data = initValue;
  }
  setInitialAppearance(initValue) {
    this._appearance = initValue;
  }
  setInitialSettings(initValue) {
    this._navPanel = initValue;
  }

}

export default decorate(ValueDriverTree, {
  _nodeDataset: observable,
  _treeData: observable,
  _vdtMenu: observable,
  _nodeConfig: observable,
  _data: observable,
  _appearance: observable,
  _navPanel:observable,
  _dataMenuItem: observable,
  _appearanceMenuItem: observable,
  _navPanelMenuItem:observable,
  _tabSelection: observable,
  _nodeConfigModalOpen: observable,
  _importModalOpen: observable,
  _importMode: observable,
  _importFullTree: observable,

  importFullTreeData:computed,
  importModeData:computed,
  importModalOpen: computed,
  nodeDataset: computed,
  treeData: computed,
  vdtMenu: computed,
  nodeConfig: computed,
  data: computed,
  navPanel:computed,
  dataMenuItem: computed,
  appearance: computed,
  appearanceMenuItem: computed,
  navPanel:computed,
  navPanelMenuItem : computed,
  tabSelection: computed,
  nodeConfigModalOpen: computed,

  setImportFullTree:action,
  setImportMode:action,
  toogleImportModal: action,
  setNodeConfig: action,
  setInitialData: action,
  setInitialAppearance: action,
  setVdtMenu: action,
  setAppearance: action,
  setData: action,
  setAppearanceMenuItem: action,
  setSettingsMenuItem:action,
  setDataMenuItem:action,
  setTreeData: action,
  setNodeDataSet: action,
  setTabSelection: action,
  toggleNodeConfigModal: action,
});
