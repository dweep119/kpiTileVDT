/*
 *  Power BI Visual CLI
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

    let gridster = (<any>window).Gridster;
    let _ = (<any> window)._;
    let titleVar, primaryKPIVar, secondaryKPIVar, iconVar, imageVar, sparkLineChartVar;
    let position = {
        col: 1,
        row: 1,
        sizex: 1,
        sizey: 1,
        id: ''
    };

    export class ExampleChart extends bifrost.visual.BifrostVisual {

        private element: HTMLElement;
        private chartContainer: HTMLElement;
        private visualInstance: any;
        private gridsterContainer: HTMLElement;

        constructor(options: VisualConstructorOptions) {
            super(options)
            this.visualInstance = options.host;
            this.element = options.element;
            console.log('Visual constructor options', options);

            this.gridsterContainer = document.createElement("div");
            this.gridsterContainer.setAttribute("class", "gridster");
            this.gridsterContainer.style.border = "solid";

            this.element.appendChild(this.gridsterContainer);
            this.initComponent(this.render, {
				editor:true,
				getEditorConfiguration: this.getEditorConfiguration,
				getSettingsUIConfiguration: this.getEnumerationConfiguration,
				isMeasureComponent: true
			});

        }

        private getEditorConfiguration = () => (			
			[
                {}
            ]
        )
        
        private getEnumerationConfiguration = (): bifrost.SettingsSchema.Section[] => {
			return [
				{
					name: 'editor',
					isVisible: true
				}
			];
        };
        
        private numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        private titleFun = (kpi) => {
            if (kpi.appearance && kpi.general && kpi.data) {
                return ('<div id="'+ kpi.id +'"><div class="title-style" style="padding: 25px; height: 100%;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '; color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">' + kpi.data.dimension + '</div></div>');
            } else if (kpi.appearance && kpi.general) {
                return ('<div id="'+ kpi.id +'"><div class="title-style" style="padding: 25px; height: 100%;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '; color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">Apple Products</div></div>');
            }
            return ('<div id="'+ kpi.id +'"><div class="title-style" style="padding: 25px; height: 100%;text-align: left;background-color: #4A90E2;font-family: Arial;font-size: 20px;font-weight: normal;color: black;">Apple Products</div></div>');
        }

        private primaryKPIFun = (options, kpi) => {
            let amount, amount1, imgsrc, imgsrc1;
            options.data.categorical.measures.map(itm => {
                if (kpi.data) {
                    if (kpi.data.measure === itm.label) {
                        if (kpi.data.function === 'sum') {
                            amount = _.sum(itm.values);
                        } else if (kpi.data.function === 'avg') {
                            amount = _.mean(itm.values);
                        } else if (kpi.data.function === 'max') {
                            amount = _.max(itm.values);
                        } else if (kpi.data.function === 'min') {
                            amount = _.min(itm.values);
                        }
                        amount = _.ceil(amount);
                        amount = this.numberWithCommas(amount);
                    } else if (kpi.data.comparisonMeasure === itm.label) {
                        if (kpi.data.function === 'sum') {
                            amount1 = _.sum(itm.values);
                        } else if (kpi.data.function === 'avg') {
                            amount1 = _.mean(itm.values);
                        } else if (kpi.data.function === 'max') {
                            amount1 = _.max(itm.values);
                        } else if (kpi.data.function === 'min') {
                            amount1 = _.min(itm.values);
                        }
                        amount1 = _.ceil(amount1);
                        amount1 = this.numberWithCommas(amount1);
                    }

                    if ( amount < amount1 ) {
                        console.log("!!!!!!!!!!!!!!!!", amount, amount1);
                        imgsrc = "https://i.imgur.com/uHvo5kW.png";
                        imgsrc1 = "https://i.imgur.com/IJRKq5P.png";
                    } else if ( amount > amount1 ) {
                        console.log("######", amount, amount1);
                        imgsrc = "https://i.imgur.com/IJRKq5P.png";
                        imgsrc1 = "https://i.imgur.com/uHvo5kW.png";
                    }
                }
            });
            if (kpi.appearance && kpi.general && kpi.data) {
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', amount, amount1, imgsrc, imgsrc1);
                return ('<div id="'+ kpi.id +'"><div class="inner-wrap"  style="height: 100%;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '"> '+
                '<div class="value-text mb" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">$' + amount + '<img src=" ' + imgsrc + ' " alt="" style="height: 25px;width: 15px;" class="icon-sm mx" /></div>'+
                '<div class="label-text-md mb-md" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">' + kpi.data.measure + '</div>'+
                // '<div class="label-text-sm mb">Total sales 2017-18</div>'+
                '<div class="label-text-sm" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">$' + amount1 + '<img src=" ' + imgsrc1 + ' " alt="" style="height: 25px;width: 15px;" class="icon-sm mx" /></div>'+
                '<div class="label-text-md mb-md" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">' + kpi.data.comparisonMeasure + '</div>'+
              '</div></div>');
            } else if (kpi.appearance && kpi.general) {
                return ('<div id="'+ kpi.id +'"><div class="inner-wrap"  style="height: 100%;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '"> '+
                '<div class="value-text mb" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">$78,900<img src="https://i.imgur.com/uHvo5kW.png" alt="" style="height: 25px;width: 15px;" class="icon-sm mx" /></div>'+
                '<div class="label-text-md mb-md" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">Macbook Pro</div>'+
                // '<div class="label-text-sm mb">Total sales 2017-18</div>'+
                '<div class="label-text-sm" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">$24,900<img src="https://i.imgur.com/IJRKq5P.png" alt="" style="height: 25px;width: 15px;" class="icon-sm mx" /></div>'+
                '<div class="label-text-md mb-md" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">Macbook Pro</div>'+
              '</div></div>');
            }
            return ('<div id="'+ kpi.id +'"><div class="inner-wrap"  style="height: 100%;text-align:center;background-color: #4A90E2"> '+
            '<div class="value-text mb" style="font-family: Arial;font-size: 20px;font-weight: normal;color: black;">$78,900<img src="https://i.imgur.com/uHvo5kW.png" alt="" style="height: 25px;width: 15px;" class="icon-sm mx" /></div>'+
            '<div class="label-text-md mb-md" style="font-family: Arial;font-size: 20px;font-weight: normal;color: black;">Macbook Pro</div>'+
            '<div class="label-text-sm" style="font-family: Arial;font-size: 20px;font-weight: normal;color: black;">$24,900<img src="https://i.imgur.com/IJRKq5P.png" alt="" style="height: 25px;width: 15px;" class="icon-sm mx" /></div>'+
            '<div class="label-text-sm mb" style="font-family: Arial;font-size: 20px;font-weight: normal;color: black;">Total sales 2017-18</div>'+
          '</div></div>');
        }

        private secondaryKPIFun = (options, kpi) => {
            let amount;
            options.data.categorical.measures.map(itm => {
                if (kpi.data) {
                    if (kpi.data.function === 'sum') {
                        amount = _.sum(itm.values);
                    } else if (kpi.data.function === 'avg') {
                        amount = _.mean(itm.values);
                    } else if (kpi.data.function === 'max') {
                        amount = _.max(itm.values);
                    } else if (kpi.data.function === 'min') {
                        amount = _.min(itm.values);
                    }
                    amount = _.ceil(amount);
                    amount = this.numberWithCommas(amount);
                }
            });
            if (kpi.appearance && kpi.general && kpi.data) {
                return ('<div id="'+ kpi.id +'"><div class="inner-wrap"  style="height: 100%;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '"> '+
                '<div class="value-text mb" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">$' + amount + '<img src="up-arrow.png" alt="" class="icon-sm mx" /></div>'+
                '<div class="label-text-md mb-md" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">' + kpi.data.measure + '</div>'+
                // '<div class="label-text-sm mb">Total sales 2017-18</div>'+
              '</div></div>');
            } else if (kpi.appearance && kpi.general) {
                return ('<div id="'+ kpi.id +'"><div class="inner-wrap"  style="height: 100%;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '"> '+
                '<div class="value-text mb" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">$78,900<img src="up-arrow.png" alt="" class="icon-sm mx" /></div>'+
                '<div class="label-text-md mb-md" style="color: ' + kpi.appearance.fontColor + '; font-size: ' + kpi.appearance.fontSize + 'px; font-weight: ' + kpi.appearance.fontWeight + '; font-family: ' + kpi.appearance.fontFamily + '">Macbook Pro</div>'+
                // '<div class="label-text-sm mb">Total sales 2017-18</div>'+
              '</div></div>');
            }
            return ('<div id="'+ kpi.id +'"><div class="inner-wrap"  style="height: 100%;text-align:center;background-color: #4A90E2"> '+
            '<div class="value-text mb" style="font-family: Arial;font-size: 20px;font-weight: normal;color: black;">$78,900<img src="up-arrow.png" alt="" class="icon-sm mx" /></div>'+
            '<div class="label-text-md mb-md" style="font-family: Arial;font-size: 20px;font-weight: normal;color: black;">Macbook Pro</div>'+
            // '<div class="label-text-sm mb">Total sales 2017-18</div>'+
            // '<div class="label-text-sm" style="font-size: 20px;">$24,900<img src="down-arrow.png" alt="" class="icon-sm mx" /></div>'+
          '</div></div>');
        }

        private imageFun = (kpi) => {
            if (kpi.appearance && kpi.general && kpi.data) {
                return ('<div id="'+ kpi.id +'"><div style="height: 100px;width: 100px;background: ' + kpi.appearance.backgroundColor + '"><img src="' + kpi.data.imageSource + '" alt="" height="100px" width="100px"></div></div>');
            } else if (kpi.appearance && kpi.general) {
                return ('<div id="'+ kpi.id +'"><div style="height: 100px;width: 100px;background: ' + kpi.appearance.backgroundColor + '"><img src="https://image.flaticon.com/icons/svg/858/858699.svg" alt="" height="100px" width="100px"></div></div>');
            }
            return ('<div id="'+ kpi.id +'"><div style="height: 100px;width: 100px;"><img src="https://image.flaticon.com/icons/svg/858/858699.svg" alt="" height="100px" width="100px"></div></div>');
        }

        private iconFun = (kpi) => {
            if (kpi.appearance && kpi.general && kpi.data) {
                return ('<div id="'+ kpi.id +'" style="height: 60px;width: 60px;"><div class="ddd wrap d-flex flex-col align-l align-x" style=" background: ' + kpi.appearance.backgroundColor + ';padding: 8px; "><img src=" ' + kpi.data.iconSource + ' " alt="" height="42" width="42"></div></div>');
            } else if (kpi.appearance && kpi.general) {
                return ('<div id="'+ kpi.id +'"><div style="background: ' + kpi.appearance.backgroundColor + '"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-c-512.png" alt="" height="100px" width="100px"></div></div>');
            }
            return ('<div id="'+ kpi.id +'"><div><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-c-512.png" alt="" height="100px" width="100px"></div></div>');
        }

        private sparklinechartFun = (kpi) => {
            if (kpi.appearance && kpi.general) {
                return ('<div id="'+ kpi.id +'"><div class="inner-tab" id="container" style="height: 100%;border-right: 1px solid #eeeeee;text-align: ' + kpi.appearance.textAlign + ';background: ' + kpi.appearance.backgroundColor + '" ></div></div>');
            }
            return ('<div id="'+ kpi.id +'"><div class="inner-tab" id="container" style="height: 100%;border-right: 1px solid #eeeeee;text-align: center;background-color: #4A90E2;" ></div></div>');
        }


        public render(options: bifrost.RenderOptions) {
            options.element.innerHTML = '';
            let a;
            // (window as any).KPI.kpiGrid(options.element)
            let dataView = options.data,
                settings: any = options.settings;
            // this.chartContainer = options.element;
            if (dataView.categorical.dimensions.length < 2 || dataView.categorical.measures.length < 2) {
                bifrost.UIIndicators.showErrorMessage(options.element, "Two Measures and Two Category Fields are required", "");
                return;
            }
            console.log('Render', options, this.visualInstance);
            let kpitile = _.attempt(JSON.parse, settings.editor.kpitile);
            let kpieditor = _.attempt(JSON.parse, settings.editor.kpieditor);

                // gridsterContainer.style.left = "320px";

            let amount = _.sum(options.data.categorical.measures[0].values);
                amount = _.ceil(amount);
                amount = this.numberWithCommas(amount);

            // this.chartContainer.appendChild(this.gridsterContainer);

            let kpitileSettings = {
                widget_base_dimensions: [settings.kpisettings.width, settings.kpisettings.height],
                widget_margins: [settings.kpisettings.horizontalMargins, settings.kpisettings.verticalMargins],
                max_rows: settings.kpisettings.maxCols,
                min_cols: settings.kpisettings.maxCols,
                max_cols: settings.kpisettings.maxCols,
                draggable: {
                    enabled: settings.kpisettings.draggable,
                    start: function (e, ui) {
                        console.log('DRAG start', ui, e, ui.$helper[0].dataset);
                    },
                    drag: function (e, ui) {
                        console.log('DRAG drag', ui, e, ui.$helper[0].dataset);
                    },
                    stop: function (e, ui) {
                        position.col = ui.$helper[0].dataset.col;
                        position.row = ui.$helper[0].dataset.row;
                        position.sizex = ui.$helper[0].dataset.sizex;
                        position.sizey = ui.$helper[0].dataset.sizey;
                        position.id = ui.$helper[0].id;
                        // let result = kpitile.map(kpi => {
                        //     if (kpi.text === position.id) {
                        //         kpi.position = position;
                        //     }
                        //     return kpi;
                        // });
                        // updatedProperty['kpitile'] = JSON.stringify(result);
                        // // self.setWidgetFun(kpitile, a, options);
                        // let host = self.visualInstance;
                        // host.persistProperties({
                        //     merge: [
                        //         {
                        //             objectName: 'editor',
                        //             selector: null,
                        //             properties: updatedProperty
                        //         } as VisualObjectInstancesToPersist
                        //     ]
                        // } as VisualObjectInstancesToPersist);
                        console.log('DRAG stop', position, kpitile);
                    }
                },
                resize: {
                    enabled: settings.kpisettings.resize,
                    start: function (e, ui, $widget) {
                        console.log('resize start', ui, e, $widget, $widget[0].dataset);
                    },
                    resize: function (e, ui, $widget) {
                        console.log('resize resize', ui, e, $widget, $widget[0].dataset);
                    },
                    stop: function (e, ui, $widget) {
                        position.col = ui.$helper[0].dataset.col;
                        position.row = ui.$helper[0].dataset.row;
                        position.sizex = ui.$helper[0].dataset.sizex;
                        position.sizey = ui.$helper[0].dataset.sizey;
                        position.id = ui.$helper[0].id;
                        console.log('resize stop', ui, e, $widget, $widget[0].dataset);
                    }
                },
                collision: {
                    wait_for_mouseup: true
                },
                autogenerate_stylesheet: true,
                shift_widgets_up: false,
                shift_larger_widgets_down: false,
                avoid_overlapped_widgets: true
            };

            if (!_.isError(kpitile)) {
                // if (kpieditor.enable) {
                //     kpitileSettings.draggable.enabled = true;
                //     kpitileSettings.resize.enabled = true;
                // }
                a = new gridster(this.gridsterContainer, kpitileSettings);
                if (!kpitileSettings.draggable.enabled) {
                    a.disable();
                }
                kpitile.map(kpi => {
                    if (position.id == kpi.id && kpi.general) {
                        console.log('Inside If id is same', position , kpi)
                        kpi.general.sizex = position.sizex;
                        kpi.general.sizey = position.sizey;
                        kpi.general.col = position.col;
                        kpi.general.row = position.row;
                    }
                });
                console.log('After shift kpitile', kpitile, kpitileSettings, position);
                // this.setWidgetFun(kpitile, a, options);
                kpitile.map(kpi => {
                    if (kpi.text === "title") {
                        titleVar = this.titleFun(kpi);
                        if (kpi.general) {
                            a.remove_widget(document.getElementById(kpi.id), remove => {
                                console.log('remove', remove);
                            });
                            a.add_widget(titleVar, kpi.general.sizex, kpi.general.sizey, kpi.general.col, kpi.general.row);
                        } else {
                            a.add_widget(titleVar, 4, 1, 1, 1);
                        }
                    } else if (kpi.text === "primarykpi") {
                        console.log('primarykpi start', kpi);
                        primaryKPIVar = this.primaryKPIFun(options, kpi);
                        if (kpi.general) {
                            console.log('after primarykpiFuncrion call', document.getElementById(kpi.id))
                            a.remove_widget(document.getElementById(kpi.id), remove => {
                                console.log('remove', remove);
                            });
                            console.log('after remove', kpi)
                            a.add_widget(primaryKPIVar, kpi.general.sizex, kpi.general.sizey, kpi.general.col, kpi.general.row);
                        } else {
                            console.log('else condition', kpi)
                            a.add_widget(primaryKPIVar, 4, 2, 1, 2);
                        }
                    } else if (kpi.text === "secondarykpi") {
                        secondaryKPIVar = this.secondaryKPIFun(options, kpi);
                        if (kpi.general) {
                            a.remove_widget(document.getElementById(kpi.id), remove => {
                                console.log('remove', remove);
                            });
                            a.add_widget(secondaryKPIVar, kpi.general.sizex, kpi.general.sizey, kpi.general.col, kpi.general.row);
                        } else {
                            a.add_widget(secondaryKPIVar, 4, 2, 5 , 1);
                        }
                    } else if (kpi.text === "image") {
                        imageVar = this.imageFun(kpi);
                        a.add_widget(imageVar, 1, 1);
                    } else if (kpi.text === "icon") {
                        iconVar = this.iconFun(kpi);
                        a.add_widget(iconVar, 1, 1);
                    } else if (kpi.text === "sparklinechart") {
                        sparkLineChartVar = this.sparklinechartFun(kpi);
                        if (kpi.general) {
                            a.remove_widget(document.getElementById(kpi.id), remove => {
                                console.log('remove', remove);
                            });
                            a.add_widget(sparkLineChartVar, kpi.general.sizex, kpi.general.sizey, kpi.general.col, kpi.general.row);
                        } else {
                            a.add_widget(sparkLineChartVar, 2, 1, 3, 4);
                        }
                        // this.createChart('container', options, kpi);
                    }
                });
            }
            // a = new gridster(this.gridsterContainer, kpitileSettings);

            // a.add_widget('<div class="ddd" style=" background: #f5f5f5 "><div style="margin: 25px;padding: 1em;text-align: center;"><div class="value-text mb-md">' + amount + '</div><div class="label-text-md">' + options.data.categorical.measures[0].label + '</div></div></div>', 1, 1, 3, 3);
            
            if (options.updateType === VisualUpdateType.ResizeEnd || options.updateType === 36 || options.updateType === VisualUpdateType.Data) {
                // a.remove_all_widgets(remove => {
                //     console.log('remove', remove);
                // });

            }
        }
    }
}