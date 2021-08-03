import { useState } from "react";
import { Form } from "react-bootstrap";

const WorkplacesTable = ({ item, setWorkplaces, index, workplaces }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [predio, setPredio] = useState(item.predio);
  const [workplace, setWorkplace] = useState(item.workplace);

  const handleEditWorkplace = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      const newArray = workplaces?.map((item, indexA) => {
        if (indexA !== index) {
          return { ...item };
        }
        return {
          ...item,
          predio: predio,
          workplace: workplace,
        };
      });

      setWorkplaces(newArray);
      localStorage.setItem("arrLocaisTrabalho", JSON.stringify(newArray));
    }
  };

  const handleDeleteWorkplace = () => {
    const newArray = workplaces?.filter((item, indexA) => indexA !== index);

    console.log(newArray);

    setWorkplaces(newArray);
    localStorage.setItem("arrLocaisTrabalho", JSON.stringify(newArray));

    console.log(workplaces);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <Form.Select
              size="sm"
              aria-label="Selecione um prédio"
              value={predio}
              onChange={(e) => setPredio(e.target.value)}
            >
              <option></option>
              <option value="Prédio 1">Prédio 1</option>
              <option value="Prédio 2">Prédio 2</option>
              <option value="Prédio 3">Prédio 3</option>
            </Form.Select>
          </td>
          <td>
            <Form.Control
              size="sm"
              type="text"
              value={workplace}
              onChange={(e) => setWorkplace(e.target.value)}
            />
          </td>
        </>
      ) : (
        <>
          <td>{predio}</td>
          <td>{workplace}</td>
        </>
      )}
      <td>
        <i
          className="bi bi-pencil-fill workplace-icon"
          onClick={() => handleEditWorkplace()}
        ></i>
        <i
          className="bi bi-trash-fill workplace-icon"
          onClick={() => handleDeleteWorkplace()}
        ></i>
      </td>
    </tr>
  );
};

export default WorkplacesTable;
