function NextFC({ chartConfigs }) {
  const FusionCharts = require('fusioncharts');
  const Column2D = require('fusioncharts/fusioncharts.charts');
  const FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion.js');
  const Maps = require('fusioncharts/fusioncharts.maps');
  const PowerCharts = require('fusioncharts/fusioncharts.powercharts');
  const TimeSeries = require('fusioncharts/fusioncharts.timeseries');
  const TreeMap = require('fusioncharts/fusioncharts.treemap');
  const Widgets = require('fusioncharts/fusioncharts.widgets');
  const Usa = require('fusioncharts/maps/fusioncharts.usa');
  const India = require('fusioncharts/maps/fusioncharts.india');
  // maps
  const World = require('fusioncharts/maps/fusioncharts.world');
  const CandyTheme = require('fusioncharts/themes/fusioncharts.theme.candy');
  const CarbonTheme = require('fusioncharts/themes/fusioncharts.theme.carbon');
  const GammelTheme = require('fusioncharts/themes/fusioncharts.theme.gammel');
  const OceanTheme = require('fusioncharts/themes/fusioncharts.theme.ocean');
  const ZuneTheme = require('fusioncharts/themes/fusioncharts.theme.zune');
  const { default: ReactFC } = require('react-fusioncharts');

  FusionCharts.options.license({
    key: 'FE-11G5ramB13C6B5D3E1E1C4A3H3A8A3C3dB-11uC1D4C1A-21B1B4B1psfE4H1B9d1dA-13C4B4A3i1xxA5C5B3A5D1D4D1D3A4D4E2F-11wqG1H4DC11gapB4E4D4aG-7C8WE6F4hjH-9D2I3B6A8B6E5G5B1C3A2A1B8D7D1c==',
    creditLabel: false,
  });

  ReactFC.fcRoot(
    FusionCharts,
    Column2D,
    FusionTheme,
    GammelTheme,
    CandyTheme,
    ZuneTheme,
    OceanTheme,
    CarbonTheme,
    World,
    Usa,
    Maps,
    TreeMap,
    Widgets,
    TimeSeries,
    India,
    PowerCharts
  );

  return <ReactFC {...chartConfigs} />;
}

export default NextFC;
