import React from 'react';

import Chart from './Chart';
import Error from './results/components/Error';
import StepDataset from './StepDataset';

//temp fix
const replace = (url) => {
  if (typeof url === 'string' || url instanceof String) {
    return url.replace('//data.analyttica.com/', '');
  }
  return {
    ...url,
    href: url.href.replace('//data.analyttica.com/', ''),
  };
};

const formatHeader = (label) => {
  label = label.replace(/^\d+_/i, ' ');
  return label;
};

const Result = ({
  name,
  _links: { data, image, table, error, chart, pdf },
}) => {
  if (data !== undefined) {
    return (
      <p key={data.href}>
        The data is updated in the table{!!name && <b>{`: ${name}`}</b>}
      </p>
    );
  }
  if (image !== undefined) {
    return (
      <div key={image.href} style={{ marginBottom: '4rem' }}>
        {name && <h6>{name}</h6>}
        <img
          key={image.href}
          src={replace(image.href)}
          alt={name}
          width="fit-content"
        />
      </div>
    );
  }
  if (table !== undefined) {
    return (
      <div key={table.href} style={{ overflow: 'auto' }}>
        {name && <h3>{formatHeader(name)}</h3>}
        {<StepDataset csv={replace(table.href)} />}
      </div>
    );
  }
  if (chart !== undefined) {
    return (
      <div key={chart.href} style={{ marginBottom: '4rem' }}>
        {name && <h6>{name}</h6>}
        <Chart link={replace(chart)} />
      </div>
    );
  }
  if (error !== undefined) {
    return (
      <div key={error.href}>
        {name && <h6>{name}</h6>}
        <div
          style={{
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '25px',
            color: 'red',
            fontSize: '12px',
            background: '#fce4ec',
          }}
        >
          <Error error_link={replace(error)} download={true} />
        </div>
      </div>
    );
  }
  if (pdf !== undefined) {
    return (
      <div key={pdf.href}>
        {name && <h6>{name}</h6>}
        <object
          data={replace(pdf.href)}
          type="application/pdf"
          width="100%"
          height="500px"
        >
          <p>
            Your web browser doesn't have a PDF plugin. Instead you can{' '}
            <a href={pdf.href}>click here to download the PDF file.</a>
          </p>
        </object>
      </div>
    );
  }
  return null;
};

export default Result;
