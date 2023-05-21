import React, { useEffect, useState } from "react";
import ParkingCard from "../../components/ParkingCard";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const PARKINGS = [
  {
    address: "Gliwice, Kochanowskiego 35",
    price: 3,
    books: [],
    numberSlots: 12,
    parkingName: "parking name one",
    workingTime: "open 24/24",
  },
  {
    address: "Gliwice, Jakoni 23",
    price: 7,
    books: [],
    numberSlots: 10,
    parkingName: "Hala lala",
    workingTime: "open 24/24",
  },
  {
    address: "Katowice, Kochanowskiego 5",
    price: 3.5,
    books: [],
    numberSlots: 12,
    parkingName: "parkingisko",
    workingTime: "open 20/24",
  },
  {
    address: "Katowice, Kocha 35",
    price: 4,
    books: [],
    numberSlots: 7,
    parkingName: "parking name one",
    workingTime: "open 24/24",
  },
  {
    address: "Dublin, Skiego 15",
    price: 2,
    books: [],
    numberSlots: 22,
    parkingName: "Dublin Park",
    workingTime: "open 24/24",
  },
  {
    address: "Gliwice, Kochanowskiego 30",
    price: 2.5,
    books: [],
    numberSlots: 14,
    parkingName: "Kocha Park",
    workingTime: "open 24/24",
  },
];
const ParkingGrid = () => {
  const { quickFilter , priceFilter, availability} = useSelector((state: any) => state.appStore);
  const collectionRef = collection(db, "parkings");
  const [parkings, setParkings] = useState<any>([])

  useEffect(() => {
    getDocs(collectionRef)
      .then((response) => {
        const data = (response.docs.map((item) => item.data())[0]);
        setParkings(data.parkings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px 0",
        justifyItems: "center",
        paddingTop: "10px",
      }}
    >
      {parkings.map((park: any, index: number) => {
        if(availability &&  !park?.workingTime.toLowerCase().includes("24/24")) return;
        if(park?.price > priceFilter && priceFilter !== 0) return;
        if (
          park?.parkingName.toLowerCase().includes(quickFilter.toLowerCase()) ||
          park?.address.toLowerCase().includes(quickFilter.toLowerCase()) ||
          park?.price == quickFilter ||
          park?.numberSlots == quickFilter ||
          park?.workingTime.toLowerCase().includes(quickFilter.toLowerCase())
        )
          return <ParkingCard key={index} data={park} />;
        return;
      })}
    </div>
  );
};

export default ParkingGrid;
