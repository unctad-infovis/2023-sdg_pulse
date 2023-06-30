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
    Highcharts.chart('T2_3_Fig2', {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '14px'
        },
        text: '<em>Source:</em> UNCTAD calculations bases on UNCTADstat <a href="https://sdgpulse.unctad.org/trade-agriculture-biotrade/#Ref_VCAHNVZB" target="_blank">(UNCTAD, 2023a)</a> and FAOSTAT (<a href="https://sdgpulse.unctad.org/trade-agriculture-biotrade/#Ref_W8MMH9BE" target="_blank">FAO, 2023a)</a>.<br /><em>Note:</em> <span> Food groups include preparations of the main commodity except those preparations that fall in the miscellaneous category. Food products are grouped according to SITC Revision 3 for export value and according to CPC Version 2.1 for supply in calories. Trade in meat excludes live animals sold for raising and slaughter which fall in SITC 00. Total trade value and supply of calories both exclude alcoholic beverages as well as coffee, tea, cocoa and spices. Alcoholic beverages constitute 2%, and stimulants and spices 1% of the total calorie supply including those groups.</span>',
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
        height: 800,
        type: 'bar',
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
        bar: {
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
          stacking: false,
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
        name: 'Export value',
        data: [22.5827423247134, 15.4910352530579, 13.0012715858196, 12.0434932915784, 9.18620498054052, 8.03352516478031, 7.29386320517042, 3.75406533602107, 8.61379885831839]
      }, {
        name: 'Supply in kcal',
        data: [15.4034887006623, 45.3834331516158, 8.27032950371131, 1.34392854435309, 11.3496488555932, 7.77342053936332, 2.48109885111339, 7.92573244105667, 0.0689194125309276]
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
        margin: 0,
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
          return `<div class="tooltip_container"><h3 class="tooltip_header">${this.x}</h3><div class="tooltip_row" style="color: ${this.points[0].color}"><span class="tooltip_label">Export value:</span> <span class="tooltip_value">${formatNr(roundNr(this.points[0].y, 1))}</span></div><div class="tooltip_row" style="color: ${this.points[1].color}"><span class="tooltip_label">Supply in kcal:</span> <span class="tooltip_value">${formatNr(roundNr(this.points[1].y, 1))}</span></div></div>`;
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
        categories: ['Vegetables,<br />fruits and treenuts', 'Cereals', 'Meat', 'Fish and<br />seafood', 'Animal and<br />vegetable fats', 'Dairy and<br />eggs', 'Oilcrops', 'Sugar and<br />sweeteners', 'Miscellaneous'],
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
    chartRef.current.querySelector('#T2_3_Fig2').style.opacity = 1;
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
          {(isVisible) && (<div className="chart" id="T2_3_Fig2" />)}
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure1;
