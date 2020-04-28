import React, {useState} from 'react';
import Chart from './Chart';
import styles from './index.scss';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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
    <MDBContainer>
      <MDBRow>
        <MDBCol className="border">
          <form onSubmit={handleChart}>
            <h2 className="pad">Chart Name</h2>
            <input
              className="in"
              type="text"
              value={chartName}
              onChange={e => setChartName(e.target.value)}
            />
            <h2 className="pad">Chart Type</h2>
            <select className="in" value={template} onChange={e  => setTemplateValues(e.target.value)}>
              <option value={''} ></option>
              <option value={'line'}>Line</option>
              <option value={'bar'}>Bar</option>
              <option value={'pie'}>Pie</option>
              <option value={'polarArea'}>Polar Area</option>
            </select>
            <input className="pad" type="submit" value="Submit New Template" />
          </form>
          <h2 className="pad">Chart Table</h2>
          <MDBTable striped bordered>
            <MDBTableHead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {formValues.map((f, i) => {
                return (
                  <tr key={i} className="table">
                    <td>{f.x}</td>
                    <td>{f.y}</td>
                  </tr>
                )
              })}
            </MDBTableBody>
          </MDBTable>
          <div>
            <form className="in">
              <MDBInput
                label="Enter Key"
                type="text"
                value={key}
                onChange={e => setKey(e.target.value)} 
              />
              <MDBInput
                label="Enter Value"
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </form>
          </div>
          <div className="form">
            <button className="pad" onClick={handleForm}>
              Submit Data
            </button>
            <button className="pad" onClick={clearForm}>
              Clear Form
            </button>
          </div>
        </MDBCol>
        <MDBCol>
          {chartValues.map((e, i) => {
            return (
              <Chart key={i} cName={e.name} cType={e.type} cLabels={e.labels} cData={e.data} />
            );
          })}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
