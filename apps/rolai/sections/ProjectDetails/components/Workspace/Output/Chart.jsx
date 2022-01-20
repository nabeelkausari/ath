import get from 'lodash/get';
import dynamic from 'next/dynamic';
import React from 'react';

// import Plot from 'react-plotly.js';
import { fetchLinkDirectlyAs } from '../../../../../utils/api/fetch';

const NextFC = dynamic(() => import('./NextFC'), { ssr: false });

class Chart extends React.Component {
  state = {
    chartData: {},
    plotly: null,
    loading: null,
    theme: '',
  };

  componentDidMount() {
    this.fetchChartData();
    let theme = this.props.theme === 'dark' ? 'candy' : 'fusion';
    this.setState({ theme });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (get(this.props, 'link.href') !== get(prevProps, 'link.href')) {
      this.fetchChartData();
    }
  }

  fetchChartData = () => {
    this.setState({ loading: true });
    // if (!this.props.link) return;
    fetchLinkDirectlyAs({
      ...this.props.link,
      href: this.props.link.href.startsWith('//')
        ? `https://${this.props.link.href}`
        : this.props.link.href,
    })
      .then((chart) => {
        if (this.props.link.href.includes('plotly')) {
          this.setState({ plotly: chart, loading: false });
        } else {
          this.setState({
            chartData: {
              ...chart,
              width: '100%',
              height: '500',
              dataSource: {
                ...chart.dataSource,
                chart: {
                  ...chart.dataSource.chart,
                  theme: this.state.theme,
                },
              },
            },
            loading: false,
          });
        }
      })
      .catch((reason) => {
        console.log(reason);
        this.setState({ loading: false });
      });
  };

  changeTheme = (theme) => {
    this.setState({ theme: theme });
    this.setState((state) => {
      return {
        chartData: {
          ...state.chartData,
          dataSource: {
            ...state.chartData.dataSource,
            chart: {
              ...state.chartData.dataSource.chart,
              theme: theme,
            },
          },
        },
      };
    });
  };

  render() {
    const { chartData, plotly, loading } = this.state;
    return (
      <div className="chart-area">
        {loading ? (
          <div className="chart-area__loader">
            <h2 className="chart-area__title">
              Please wait! Your chart is being prepared..
            </h2>
          </div>
        ) : (
          <NextFC chartConfigs={chartData} />
        )}
      </div>
    );
  }
}

export default Chart;
