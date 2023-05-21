import React from 'react'
import { Container, InputGroup, Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setQuickFilter } from '../../store/appSlice';

const Search = () => {
  const {quickFilter} = useSelector((state: any)=> state.appStore)
  const dispatch = useDispatch()
  return (
    <Container fluid style={{
        height: "100px"
    }} className="d-flex justify-content-center align-items-center my-3text-white">
      <InputGroup className="mb-3 w-25">
        <InputGroup.Text id="basic-addon1"><Icon.Search></Icon.Search></InputGroup.Text>
        <Form.Control
          placeholder="Quick Filter..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={quickFilter}
          onChange={(e)=>{
             dispatch(setQuickFilter(e.target.value))
          }}
        />
      </InputGroup>
    </Container>
  )
}

export default Search