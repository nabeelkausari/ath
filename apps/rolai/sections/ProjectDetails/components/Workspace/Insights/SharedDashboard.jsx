import React, { Component } from 'react';

import SharedDashboardRenderer from './SharedDashboardRenderer';

class Dashboard extends Component {
  render() {
    const { dashboard_code } = this.props.match.params;
    return (
      <SharedDashboardRenderer
        {...this.props}
        dashboard_code={dashboard_code}
      />
    );
  }
}

export default Dashboard;
