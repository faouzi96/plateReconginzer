import {
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import TimePicker from "react-bootstrap-time-picker";

const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

const ParkingCard = ({ data }: any) => {
  const { parkingsData } = useSelector((state: any) => state.appStore);
  const [show, setShow] = useState<boolean>(false);
  const [license, setLicense] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setEndTime(startTime + 3600);
  }, [startTime]);

  const handleSubmit = () => {
    if (!name || !phone || !license || !regex.test(phone) || !regexName.test(name)) {
      toast.info("Please fill all the fields correctly!", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }
    const docToUpadate = doc(db, "parkings", "98q4cgFU7rVL70LVumJM");
    let constructedData = parkingsData.parkings.map(
      (park: any, index: number) => {
        if (park.parkingName === data.parkingName) {
          return {
            ...park,
            books: [
              ...park.books,
              {
                name: name,
                phoneNumber: phone,
                licencsePlate: license,
                startTime: startTime / 3600,
                endTime: endTime / 3600,
              },
            ],
            numberSlots: park.numberSlots - 1,
          };
        }
        return park;
      }
    );
    updateDoc(docToUpadate, { parkings: constructedData })
      .then(() => {
        toast.success("Slot reserved!", {
          autoClose: 3000,
          position: "top-right",
        });
        handleClose();
      })
      .catch((error) => {
        toast.error(error, {
          autoClose: 5000,
          position: "top-right",
        });
      });
  };
  return (
    <Card style={{ width: "300px", height: "300px" }}>
      <Card.Title
        className="p-3"
        style={{
          backgroundColor: "#4BA1F2",
        }}
      >
        {data.parkingName}
      </Card.Title>
      <ListGroup className="list-group-flush">
        <ListGroup.Item
          style={{
            height: "80px",
          }}
        >
          Address: {data.address}
        </ListGroup.Item>
        <ListGroup.Item>Free Slots: {data.numberSlots}</ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-content-center">
          <span>{data.workingTime}</span>
          <span>
            <i>{data.price} Pln/H</i>
          </span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex align-content-center">
        <>
          <Card.Link
            style={{
              textDecoration: "none",
              border: "1px solid #ff000020",
              borderRadius: "5px",
              width: "80px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              cursor: "pointer",
            }}
            onClick={handleShow}
          >
            Reserve
          </Card.Link>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{data.parkingName} Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3 w-100">
                <Form.Control
                  required
                  placeholder="Full name"
                  aria-describedby="basic-addon1"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3 w-100">
                <Form.Control
                  required
                  placeholder="Phone number"
                  aria-describedby="basic-addon1"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </InputGroup>
              <InputGroup className="mb-3 w-100 d-flex justify-content-around align-items-center">
                <span
                  style={{
                    fontSize: "12px",
                    marginRight: "5px",
                  }}
                >
                  From{" "}
                </span>
                <TimePicker
                  start="00:00"
                  end="24:00"
                  step={60}
                  value={startTime}
                  onChange={(time: any) => setStartTime(time)}
                />
                <span
                  style={{
                    fontSize: "12px",
                    margin: "5px",
                  }}
                >
                  To{" "}
                </span>
                <TimePicker
                  start={`${startTime / 3600 + 1}:00`}
                  end="24:00"
                  step={60}
                  value={endTime}
                  onChange={(time: any) => setEndTime(time)}
                />
              </InputGroup>
              <InputGroup className="mb-3 w-100">
                <Form.Control
                  required
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  placeholder="Vehicle License Plate"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3 w-100">
                <Form.Label><i>Total cost: {(endTime - startTime)/3600 * data.price} Pln</i></Form.Label>
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Reserve
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <Card.Link
          style={{
            textDecoration: "none",
            border: "1px solid #ff000020",
            borderRadius: "5px",
            width: "80px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#000",
            backgroundColor: "#",
          }}
          href={"http://maps.google.com/?q=" + data.address}
          target="_blank"
        >
          Map
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ParkingCard;
