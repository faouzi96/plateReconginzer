import "./App.css";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { image_to_base64 } from "./utils/img_to_base64";
import { axiosApp } from "./api/apiConfig";
import { useState } from 'react';

function App() {

  const [licensePlate, setLicensePlate] = useState<string>("");

  const handleSubmit = (e: any)=> {
    e.preventDefault()
    image_to_base64(e.target[0].files[0]).then((result: any)=>{
      const base64 = result.split(",")[1]
      axiosApp.post("https://cors-anywhere.herokuapp.com/https://www.de-vis-software.ro/platebber.aspx", {
          "base64ImageString": base64,
          "plate_output": "No"
      }).then((result)=>{
        const plate = result.data[0].plate_text
        setLicensePlate(plate.slice(plate.length/2));
      })
    })
  }
  return (
    <Container className="w-25 d-flex justify-content-center align-items-center" style={{
      height: "100vh",
    }}>
      <Row>
       <Alert variant="info">
          Vehicle Allowed {licensePlate}
        </Alert>
        <Form className="border pb-4 pt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="mb-4">
              <h4>Upload Picture</h4>
            </Form.Label>
            <Form.Control type="file" placeholder="upload" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Check Plate
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default App;
