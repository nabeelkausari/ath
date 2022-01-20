import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchStepDetailsCsv } from '../../../../../store/workspace/steps/output/actions';

const StepDataset = ({ csv }) => {
  const dispatch = useDispatch();
  const [tables, setTables] = useState([]);
  const { steps } = useSelector((state) => state.workspace);
  const { output_csv_results } = steps?.output;

  useEffect(() => {
    if (output_csv_results[csv] !== undefined) {
      return setTables(output_csv_results[csv]);
    }
    dispatch(fetchStepDetailsCsv(csv));
  }, []);

  useEffect(() => {
    setTables(output_csv_results[csv]);
  }, [JSON.stringify(output_csv_results)]);
  return (
    <div className="output">
      {tables !== undefined &&
        tables.map((table, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            {table.name && <h5>{table.name}</h5>}
            <table style={{ position: 'relative', zIndex: 1 }}>
              <thead>
                <tr>
                  {table.headers.map((head, i) => (
                    <th key={i}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, ci) => (
                      <td key={ci}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};
export default StepDataset;
