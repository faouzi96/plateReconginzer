import { Card, ListGroup } from 'react-bootstrap'

const ParkingCard = ({data}: any) => {
  return (
    <Card style={{ width: '18rem', height: "400px" }}>
    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    <Card.Body>
      <Card.Title>Parking Name</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Name: {data.parkingName}</ListGroup.Item>
      <ListGroup.Item>Free Slots: {data.numberSlots}</ListGroup.Item>
      <ListGroup.Item>Address: {data.address}</ListGroup.Item>
      <ListGroup.Item className="d-flex justify-content-between align-content-center"><span>{data.workingTime}</span><span><i>{data.price} Pln/H</i></span></ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <Card.Link href="#">Reserve</Card.Link>
      <Card.Link href={"http://maps.google.com/?q="+data.address} target='_blank'>Map</Card.Link>
    </Card.Body>
  </Card>
  )
}

export default ParkingCard