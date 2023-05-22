import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvailability,
  setNearToMe,
  setPriceFilter,
} from "../../store/appSlice";
import { getGeo } from "geoplugin";
import { toast } from "react-toastify";

const MenuFilter = () => {
  const { priceFilter, availability } = useSelector(
    (state: any) => state.appStore
  );
  const [isNear, setIsNear] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isNear)
      getGeo()
        .then((response: any) => dispatch(setNearToMe(response?.city)))
        .catch((error: any) =>
          toast.error("Could not retrieve your localization")
        );
    else dispatch(setNearToMe(""));
  }, [isNear]);

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
          <Form.Label className="d-flex justify-content-between justify-content-center">
            <span>Max Price</span>
            <span>
              <i>{priceFilter} Pln</i>
            </span>
          </Form.Label>
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
            onChange={() => {
              dispatch(setAvailability(!availability));
            }}
          />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={isNear}
            onChange={() => setIsNear(!isNear)}
            label="Near to me"
          />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default MenuFilter;
