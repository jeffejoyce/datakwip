import React, {useState} from 'react';
import Chart from './Chart';
import styles from './index.scss';

function App() {
  const [chartName, setChartName] = useState('');
  const [template, setTemplateValues] = useState('');
  const [keyValues, setKeyValues] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [formValues, setFormValues] = useState([]);
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [chartValues, setChartValues] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    setFormValues(formValues.concat([{x: key, y: value}]))
    setKeyValues(keyValues.concat(key))
    setDataValues(dataValues.concat(value))
    setKey('')
    setValue('')
  }

  const handleChart = (e) => {
    e.preventDefault();
    if (template === '' || keyValues === [] || dataValues === []) {
      return (
        alert("Please enter correct information")
      );
    }
    setChartValues(chartValues.concat([{
      name: chartName,
      type: template,
      labels: keyValues,
      data: dataValues,
    }]));
    setKey('')
    setValue('')
    setTemplateValues('')
  }

  const clearForm = (e) => {
    e.preventDefault()
    setFormValues([])
    setKeyValues([])
    setDataValues([])
  }

  return (
    <>
      <div className="left">
        <form onSubmit={handleChart}>
          <p>Chart Name</p>
          <input
            className="in"
            type="text"
            value={chartName}
            onChange={e => setChartName(e.target.value)}
          />
          <p>Chart Type</p>
          <select className="in" value={template} onChange={e  => setTemplateValues(e.target.value)}>
            <option value={''} ></option>
            <option value={'line'}>Line</option>
            <option value={'bar'}>Bar</option>
            <option value={'pie'}>Pie</option>
            <option value={'polarArea'}>Polar Area</option>
          </select>
          <input type="submit" value="Submit New Template" />
        </form>
        <div>
          <p>Data Fields</p>
          <table className="table">
            <tbody>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
              {formValues.map((f, i) => {
                return (
                  <tr key={i} className="table">
                    <td>{f.x}</td>
                    <td>{f.y}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="in">
          <form onSubmit={handleForm}>
            <input 
              type="text"
              value={key}
              onChange={e => setKey(e.target.value)}
            />
            <input 
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <input type="submit" value="Submit Data" />
          </form>
        </div>
        <button onClick={clearForm}>
          Clear Form
        </button>
      </div>
      <div className="right">
        {chartValues.map((e, i) => {
          return (
            <Chart key={i} cName={e.name} cType={e.type} cLabels={e.labels} cData={e.data} />
          );
        })}
      </div>
    </>
  );
}

export default App;
