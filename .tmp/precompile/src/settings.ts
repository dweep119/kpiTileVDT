/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual.kpiTileVDTDAAAAECA2A9B4BB0920B352B6793C662  {
    "use strict";

    const nodeMapProps = {};
    const dataSeries = {};
    const periodAgg = {};
    const primarySec = {};
    const visualization = {};
    const statusBar = {};
    const general = {};
    const colors = {};
    const nav = {};



    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class VisualSettings extends DataViewObjectsParser {
      public dataPoint: dataPointSettings = new dataPointSettings();
      public editor = new Editor();
      public bifrostSection = new BifrostSection();
      public license = new License();
      public kpisettings = new KPIettings();
      }

    export class dataPointSettings {
     // Default color
      public defaultColor: string = "";
     // Show all
      public showAllDataPoints: boolean = true;
     // Fill
      public fill: string = "";
     // Color saturation
      public fillRule: string = "";
     // Text Size
      public fontSize: number = 12;
     }

     export class Editor {
      public treeConfig: string = "[]";
    // data
    public nodeMapProps:string= JSON.stringify(nodeMapProps);
    public dataSeries:string= JSON.stringify(dataSeries);
    public periodAgg: string= JSON.stringify(periodAgg);
    public primarySec:string = JSON.stringify(primarySec);

    // Appearance
    public visualization :string= JSON.stringify(visualization);
    public statusBar:string= JSON.stringify(statusBar);
    public general:string= JSON.stringify(general);
    public colors:string= JSON.stringify(colors);

    //Settings
    public navPanel:string = JSON.stringify(nav);
    }

    export class BifrostSection {
      public bifrost: string = "{}";
    }
    export class License {
      public key: string = "";
      public customer: string = "";
    }
  
    export class KPIettings {
      public resize: Boolean = false;
      public draggable: Boolean = false;
      public horizontalMargins: number = 10;
      public verticalMargins: number = 10;
      // public maxRows: number = 15;
      public maxCols: number = 12;
      public height: number = 100;
      public width: number = 100;
  
    }

}