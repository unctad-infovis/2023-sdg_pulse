import React, { /* useState, */useEffect, useCallback, useRef } from 'react';
import '../styles/styles.less';

import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

import roundNr from './helpers/RoundNr.js';
import formatNr from './helpers/FormatNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ' '
  }
});

Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

function Figure1() {
  // Data states.
  // const [data, setData] = useState(false);

  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const createChart = useCallback(() => {
    Highcharts.chart('T2_3_Fig1', {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '14px'
        },
        text: '<em>Source:</em> UNCTAD calculations based on data from <a href="https://sdgpulse.unctad.org/debt-sustainability/#Ref_WBWZLTCF" target="_blank">World Bank (2023a)</a>, <a href="https://sdgpulse.unctad.org/debt-sustainability/#Ref_BTG3N29P" target="_blank">IMF (2023)</a> and national sources.<br /><em>Note:</em> <span> Figures for 2022 are UNCTAD estimates. Data does not include IMF credit lines. PPG stands for Publicly guaranteed debt. PNG stands for Publicly non-guaranteed debt.</span>',
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          render() {

          },
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://storage.unctad.org/2023-ter_report/assets/img/unctad_logo.svg', 5, 15, 80, 100).add();
          }
        },
        height: 550,
        type: 'column',
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        }
      },
      colors: ['#009edb', '#72bf44', '#a066aa', '#f58220', '#ffcb05'],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        }
      },
      legend: {
        enabled: true,
        align: 'right',
        itemDistance: 20,
        itemStyle: {
          color: '#000',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400
        },
        layout: 'horizontal',
        verticalAlign: 'top'
      },
      plotOptions: {
        column: {
          animation: {
            duration: 3000,
          },
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            }
          },
          groupPadding: 0.08,
          selected: true,
          lineWidth: 0,
          marker: {
            enabled: false,
            radius: 0,
            states: {
              hover: {
                animation: false,
                enabled: false,
                radius: 8
              }
            },
            symbol: 'circle'
          },
          stacking: 'normal',
          states: {
            hover: {
              halo: {
                size: 0
              },
              enabled: false,
              lineWidth: 0
            }
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: 20
            }
          },
          condition: {
            maxWidth: 800
          }
        }, {
          chartOptions: {
            title: {
              style: {
                fontSize: '22px',
                lineHeight: '26px'
              }
            }
          },
          condition: {
            maxWidth: 450
          }
        }]
      },
      series: [{
        name: 'PPG long-term debt',
        data: [1205.4564803806, 1186.8227895518, 1242.7652510248, 1297.150589287, 1340.3799543462, 1259.9973838894, 1226.0635008746, 1346.1889988173, 1432.4061048299, 1546.8328082779, 1689.6184815531, 1812.5562889265, 2001.8900992887, 2155.271293615, 2384.5183906049, 2472.1120709826, 2700.5723788585, 3058.2696216681, 3302.8854160338, 3549.637761918, 3826.201448088, 4000.4313581716, 4034.09238234577]
      }, {
        name: 'PNG long-term debt',
        data: [513.6069389775, 521.361088636801, 490.0704830997, 584.478187656401, 628.5199108145, 698.0252560211, 867.056607947001, 1126.9049106585, 1348.6621639784, 1392.740291352, 1592.5895265566, 1907.4961147582, 2209.685752532, 2441.0241302723, 2739.0057430819, 2829.4833402923, 3033.0232240576, 3222.3183009716, 3294.4296262501, 3546.7459951135, 3726.2971494302, 3782.7142138758, 3768.16936677714]
      }, {
        name: 'Short-term debt',
        data: [312.5582464957, 324.398226508, 321.9489197721, 436.0469808002, 524.7101478516, 609.6316499435, 702.6184206578, 867.8130283825, 910.2872471971, 974.938591847401, 1452.384552695, 1765.0465203845, 1951.0159456639, 2347.3962481491, 2519.9156337987, 2039.4924157197, 1995.3073749304, 2343.0499851808, 2591.8458806996, 2625.7318037694, 2628.2256633307, 2980.166684373, 3155.18119573572]
      }],
      subtitle: {
        align: 'left',
        enabled: true,
        widthAdjust: -144,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        x: 100,
        text: 'Billions of current US$, 2000—2022'
      },
      title: {
        align: 'left',
        margin: 20,
        widthAdjust: -160,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        x: 100,
        text: 'External debt of developing countries continues to rise'
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: true,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">${this.x}</h3><div class="tooltip_row" style="color: ${this.points[0].color}"><span class="tooltip_label">PPG long-term debt:</span> <span class="tooltip_value">${formatNr(roundNr(this.points[0].y, 0))}</span></div><div class="tooltip_row" style="color: ${this.points[1].color}"><span class="tooltip_label">PNG long-term debt:</span> <span class="tooltip_value">${formatNr(roundNr(this.points[1].y, 0))}</span></div><div class="tooltip_row" style="color: ${this.points[2].color}"><span class="tooltip_label">Short-term debt:</span> <span class="tooltip_value">${formatNr(roundNr(this.points[2].y, 0))}</span></div></div>`;
        },
        shadow: false,
        shared: true,
        useHTML: true
      },
      xAxis: {
        accessibility: {
          description: 'Year'
        },
        allowDecimals: false,
        categories: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        crosshair: {
          color: 'transparent',
          width: 1
        },
        labels: {
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
        },
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        showFirstLabel: true,
        showLastLabel: true,
        tickWidth: 0,
        tickInterval: 5,
        type: 'category',
        title: {
          text: null
        }
      },
      yAxis: {
        accessibility: {
          description: 'Value'
        },
        allowDecimals: false,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineWidth: 1,
        gridLineDashStyle: 'shortdot',
        labels: {
          format: '{value:.,0f}',
          rotation: 0,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        max: 12500,
        min: 0,
        endOnTick: false,
        lineColor: 'transparent',
        lineWidth: 0,
        opposite: false,
        reversedStacks: false,
        stackLabels: {
          enabled: false,
        },
        title: {
          enabled: false,
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector('#T2_3_Fig1').style.opacity = 1;
  }, []);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="app">
      <div className="chart_container">
        <div ref={chartRef}>
          {(isVisible) && (<div className="chart" id="T2_3_Fig1" />)}
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure1;
