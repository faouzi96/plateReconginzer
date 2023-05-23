import "./App.css";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import { image_to_base64 } from "./utils/img_to_base64";
import { axiosApp } from "./api/apiConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { app, db } from "./firebaseConfig";
import { toast, ToastContainer } from "react-toastify";

const PARKING_NAME = "Axel II. Parking";

function App() {
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const collectionRef = collection(db, "parkings");

  useEffect(() => {
    getDocs(collectionRef)
      .then((response) => {
        const parkings = response.docs.map((item) => item.data())[0];
        setData(parkings);
        const parking = parkings.parkings.filter(
          (park: any) => park.parkingName === PARKING_NAME
        )[0];
        if (
          parking?.parkingName === PARKING_NAME &&
          parking?.books?.filter((book: any) =>
            book.licencsePlate?.includes(licensePlate)
          )
        )
          setIsValid(true);
        else setIsValid(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [licensePlate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    image_to_base64(e.target[0].files[0]).then((result: any) => {
      const base64 = result.split(",")[1];
      axiosApp
        .post(
          "https://cors-anywhere.herokuapp.com/https://www.de-vis-software.ro/platebber.aspx",
          {
            base64ImageString: base64,
            plate_output: "No",
          }
        )
        .then((result) => {
          const plate = result.data[0].plate_text;
          setLicensePlate(plate.slice(plate.length / 2));
        });
    });
  };

  const handleQuitParking = () => {
    const docToUpadate = doc(db, "parkings", "98q4cgFU7rVL70LVumJM");
    const hours = new Date().getHours();
    const endTime = data.parkings
      .filter((park: any) => park.parkingName === PARKING_NAME)[0]
      .books.filter(
        (item: any) => item.licencsePlate === licensePlate
      )[0].endTime;
    const price = data.parkings.filter(
      (park: any) => park.parkingName === PARKING_NAME
    )[0].price;

    if (endTime < hours) {
      toast.warn(`You need to pay ${(hours - endTime) * price} PLN extra!`);
      return;
    }

    const constructedData = data;
    constructedData.parkings.filter(
      (park: any) => park.parkingName === PARKING_NAME
    )[0].numberSlots++;
    constructedData.parkings.filter(
      (park: any) => park.parkingName === PARKING_NAME
    )[0].books = data.parkings
      .filter((park: any) => park.parkingName === PARKING_NAME)[0]
      .books.filter((item: any) => item.licencsePlate !== licensePlate);

    updateDoc(docToUpadate, constructedData)
      .then(() => {
        toast.success("Vehicle has left the parking", {
          autoClose: 3000,
          position: "top-right",
        });
        setIsValid(false);
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 5000,
          position: "top-right",
        });
      });
  };
  return (
    <Container
      className="w-25 d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Row>
        {licensePlate && (
          <Alert variant="info">
            Vehicle {licensePlate} is {!isValid && "NOT"} Allowed
          </Alert>
        )}
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
          <Button
            variant="primary"
            type="button"
            className="m-2"
            onClick={handleQuitParking}
          >
            Free slot
          </Button>
        </Form>
      </Row>
      <ToastContainer />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          border: "1px solid #00000050",
          padding: "5px 15px",
        }}
      >
        {PARKING_NAME}
      </div>
    </Container>
  );
}

export default App;
