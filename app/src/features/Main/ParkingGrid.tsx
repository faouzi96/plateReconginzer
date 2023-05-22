import React, { useEffect, useState } from "react";
import ParkingCard from "../../components/ParkingCard";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { setParkingsData } from "../../store/appSlice";
import { toast } from "react-toastify";

const ParkingGrid = () => {
  const { quickFilter , priceFilter, availability, nearToMe} = useSelector((state: any) => state.appStore);
  const dispatch = useDispatch();
  const collectionRef = collection(db, "parkings");
  const [parkings, setParkings] = useState<any>([])

  useEffect(() => {
    getDocs(collectionRef)
      .then((response) => {
        const data = (response.docs.map((item) => item.data())[0]);
        setParkings(data.parkings);
        dispatch(setParkingsData(data));
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #22222220",
        borderRadius: "5px",
        paddingBottom: "5px",
        overflowY: "scroll",
        overflowX: "auto",
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
        if(Boolean(nearToMe) && !park?.address.toLowerCase().includes(nearToMe.toLowerCase())) return;
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
