import { useState, useEffect } from "react";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import WorkplacesTable from "./WorkplacesTable";
import "../css/Workplaces.css";

const Workplaces = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [error, setError] = useState("");
  const [order, setOrder] = useState("asc");
  const [lastOrderBy, setLastOrderBy] = useState("");

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

    if (!predio && !workplace) {
      return setError("predio-workplace");
    } else if (!predio && workplace) {
      return setError("predio");
    } else if (predio && !workplace) {
      return setError("workplace");
    } else {
      setError("");
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

  const sortByPredio = () => {
    setLastOrderBy("predio");
    setWorkplaces((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState]?.sort((a, b) => (a.predio > b.predio ? 1 : -1));
      } else {
        setOrder("asc");
        return [...prevState]?.sort((a, b) => (a.predio > b.predio ? -1 : 1));
      }
    });
  };

  const sortByWorkplace = () => {
    setLastOrderBy("workplace");
    setWorkplaces((prevState) => {
      if (order === "asc") {
        setOrder("desc");
        return [...prevState]?.sort((a, b) =>
          a.workplace > b.workplace ? 1 : -1
        );
      } else {
        setOrder("asc");
        return [...prevState]?.sort((a, b) =>
          a.workplace > b.workplace ? -1 : 1
        );
      }
    });
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
              <Form.Select
                size="sm"
                aria-label="Selecione um prédio"
                required
                isInvalid={error.includes("predio")}
              >
                <option></option>
                <option value="Prédio 1">Prédio 1</option>
                <option value="Prédio 2">Prédio 2</option>
                <option value="Prédio 3">Prédio 3</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Selecione um prédio
              </Form.Control.Feedback>
            </Col>
            <Col md xs={5} required>
              <Form.Label>Local de Trabalho</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                required
                isInvalid={error.includes("workplace")}
              />
              <Form.Control.Feedback type="invalid">
                Digite um local
              </Form.Control.Feedback>
            </Col>
            <Col md className={"workplace-form-button"}>
              <Button
                variant="light"
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
              <th
                style={{ borderRadius: "4px 0 0 0" }}
                onClick={() => sortByPredio()}
              >
                Prédio{" "}
                {lastOrderBy === "predio" ? (
                  order === "desc" ? (
                    <i class="bi bi-arrow-down"></i>
                  ) : (
                    <i class="bi bi-arrow-up"></i>
                  )
                ) : undefined}
              </th>
              <th onClick={() => sortByWorkplace()}>
                Local de Trabalho{" "}
                {lastOrderBy === "workplace" ? (
                  order === "desc" ? (
                    <i class="bi bi-arrow-down"></i>
                  ) : (
                    <i class="bi bi-arrow-up"></i>
                  )
                ) : undefined}
              </th>
              <th style={{ borderRadius: "0 4px 0 0" }}></th>
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
