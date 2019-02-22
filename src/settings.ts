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

module powerbi.extensibility.visual {
    "use strict";

    const kpitile = [{"title":"Title","icon": "icon icon--General","text":"title","id":1550827454452,"general":{"name":"Dwep","sizex":"4","sizey":"1","col":"2","row":"1"},"appearance":{"fontFamily":"Times New Roman","fontColor":"rgba(255,255,255,1)","fontSize":"25","fontWeight":"bold","backgroundColor":"rgba(20,36,111,1)","textAlign":"center"},"data":{"dimension":"Business Area","customText":"hii"}},
    {"title":"Primary KPI","icon": "icon icon--StatusBar","text":"primarykpi","id":1550827549892,"general":{"name":"PK","sizex":"4","sizey":"3","col":"2","row":"2"},"appearance":{"fontFamily":"Helvetica","fontColor":"rgba(255,255,255,1)","fontSize":"25","fontWeight":"normal","backgroundColor":"rgba(239,235,13,1)","textAlign":"center"},"data":{"measure":"Actual","comparisonMeasure":"Amount","function":"avg"}}];

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
      public kpitile: string = JSON.stringify(kpitile);
      public kpieditor: string = "";
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
