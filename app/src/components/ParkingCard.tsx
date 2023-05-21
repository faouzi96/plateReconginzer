import {
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
// ts-ignore
import img from "../images/img.jpg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ParkingCard = ({ data }: any) => {
  const {parkingsData} = useSelector((state: any)=> state.appStore)
  const [show, setShow] = useState<boolean>(false);
  const [license, setLicense] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = ()=>{
    const docToUpadate = doc(db, "parkings", "98q4cgFU7rVL70LVumJM");
    let constructedData = parkingsData.parkings.map((park: any, index:number)=> {
      if(park.parkingName === data.parkingName){
        return {...park, books: [...park.books, license], numberSlots: park.numberSlots - 1}
      }
      return park;
    })
    updateDoc(docToUpadate, {parkings: constructedData}).then(()=>{
      toast.success("Vehicle has left the parking", {
        autoClose: 3000,
        position: "top-right"
      });
    }).catch((error)=> {
      toast.error(error, {
        autoClose: 5000,
        position: "top-right"
      })
    })
  }
  return (
    <Card style={{ width: "300px", height: "500px" }}>
      <Card.Img variant="top" src={img} />
      <Card.Title className="p-3">{data.parkingName}</Card.Title>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Free Slots: {data.numberSlots}</ListGroup.Item>
        <ListGroup.Item
          style={{
            height: "80px",
          }}
        >
          {data.address}
        </ListGroup.Item>
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
              border: "1px solid #ff000080",
              borderRadius: "5px",
              width: "80px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              cursor: "pointer"
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
                  placeholder="Name"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3 w-100">
                <Form.Control
                  required
                  placeholder="Phone number"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3 w-100">
                <Form.Control
                  required
                  value={license}
                  onChange={(e)=> setLicense(e.target.value)}
                  placeholder="Vehicle License Plate"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>Reserve</Button>
            </Modal.Footer>
          </Modal>
        </>
        <Card.Link
          style={{
            textDecoration: "none",
            border: "1px solid #ff000080",
            borderRadius: "5px",
            width: "80px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#000",
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
