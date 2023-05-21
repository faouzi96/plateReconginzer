import React from 'react'
import { Container } from 'react-bootstrap'
import Search from './Search/Search';
import MenuFilter from './MenuFilter/MenuFilter';
import ParkingGrid from './Main/ParkingGrid';

function MainApp() {
  return (
    <Container fluid className="px-12 d-flex flex-column justify-content-center align-items-center" style={{
      height: "calc(100vh - 100px)"
    }}>
        <Search />
        <Container fluid className="d-flex flex-row-reverse justify-content-between align-items-center" style={{
            display: "flex",
            height: "80%",
        }}>
        <MenuFilter />
        <ParkingGrid />
        </Container>
    </Container>
  )
}

export default MainApp