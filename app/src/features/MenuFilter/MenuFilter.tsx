import React from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAvailability, setPriceFilter } from "../../store/appSlice";

const MenuFilter = () => {
  const { quickFilter, nearToMe, priceFilter, availability } = useSelector(
    (state: any) => state.appStore
  );
  const dispatch = useDispatch();
  return (
    <div
      style={{
        width: "400px",
        height: "100%",
      }}
    >
      <ListGroup as="ul">
        <ListGroup.Item as="li" className="mb-5" disabled>
          <h4>Menu Filter</h4>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Form.Label className="d-flex justify-content-between justify-content-center"><span>Max Price</span><span><i>{priceFilter} Pln</i></span></Form.Label>
          <Form.Range
            value={priceFilter}
            min={0}
            max={10}
            step={0.5}
            onChange={(e) => {
              dispatch(setPriceFilter(e.target.value));
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="24/7 availability"
            value={availability}
            onChange={()=>{
              dispatch(setAvailability(!availability));
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Form.Check type="switch" id="custom-switch" label="Near to me" />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default MenuFilter;
