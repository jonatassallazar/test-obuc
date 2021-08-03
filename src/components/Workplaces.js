import { useState, useEffect } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import WorkplacesTable from "./WorkplacesTable";
import "../css/Workplaces.css";

const Workplaces = () => {
  const [workplaces, setWorkplaces] = useState([]);

  useEffect(() => {
    const array = localStorage.getItem("arrLocaisTrabalho") || [];
    const arrayParsed = JSON.parse(array);

    setWorkplaces(arrayParsed);
  }, []);

  const handleWorkplaces = (e) => {
    e.preventDefault();

    let predio;
    let workplace;

    if (e.type === "click") {
      predio = e.target.form[0].value;
      workplace = e.target.form[1].value;
    } else {
      predio = e.target[0].value;
      workplace = e.target[1].value;
    }

    const oldArray = localStorage.getItem("arrLocaisTrabalho") || [];
    const oldArrayParsed = JSON.parse(oldArray);
    const newArray = [...oldArrayParsed, { predio, workplace }];

    localStorage.setItem("arrLocaisTrabalho", JSON.stringify(newArray));
    setWorkplaces(newArray);

    const predioInput = document.querySelector("select");
    const workplaceInput = document.querySelector("input");

    predioInput.value = "";
    workplaceInput.value = "";
  };

  return (
    <div className="workplaces">
      <h1 className="workplaces-title">Locais de Trabalho</h1>
      <div className="workplaces-divisor" />
      <div className="workplaces-content">
        <Form className="workplaces-form" onSubmit={(e) => handleWorkplaces(e)}>
          <Row className="g-2">
            <Col md xs={3}>
              <Form.Label>Prédio</Form.Label>
              <Form.Select size="sm" aria-label="Selecione um prédio">
                <option></option>
                <option value="Prédio 1">Prédio 1</option>
                <option value="Prédio 2">Prédio 2</option>
                <option value="Prédio 3">Prédio 3</option>
              </Form.Select>
            </Col>
            <Col md xs={5}>
              <Form.Label>Local de Trabalho</Form.Label>
              <Form.Control size="sm" type="text" />
            </Col>
            <Col md>
              <Button
                variant="outline-dark"
                size="sm"
                onClick={(e) => handleWorkplaces(e)}
              >
                +
              </Button>
            </Col>
          </Row>
        </Form>
        <Table hover size="sm" className="workplaces-table">
          <colgroup>
            <col span="1" style={{ width: "35%" }} />
            <col span="1" style={{ width: "50%" }} />
            <col span="1" style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Prédio</th>
              <th>Local de Trabalho</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workplaces?.map((i, index) => (
              <WorkplacesTable
                key={`${i.workplace}_${index}`}
                item={i}
                workplaces={workplaces}
                setWorkplaces={setWorkplaces}
                index={index}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Workplaces;
