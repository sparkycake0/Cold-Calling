"use client";
import { useState, useEffect } from "react";
import { firestore, potentialRef } from "./utils/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import trash from "./assets/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import Image from "next/image.js";

export default function Home() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    location: "",
    status: "b",
  });
  const [fetchData, setFetchData] = useState([]);
  const addPotential = () => {
    try {
      addDoc(potentialRef, data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(potentialRef, async (snapshot) => {
        const potentials = snapshot.docs.map((doc) => {
          try {
            return {
              id: doc.id,
              name: doc.data().name,
              phone: doc.data().phone,
              location: doc.data().location,
              status: doc.data().status,
            };
          } catch (e) {
            console.log(e);
          }
        });
        setFetchData(potentials);
        console.log(potentials);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  const changeStatus = (id, currentStatus) => {
    try {
      let newStatus;
      if (currentStatus === "b") {
        newStatus = "i";
      } else if (currentStatus === "i") {
        newStatus = "c";
      } else if (currentStatus === "c") {
        newStatus = "n";
      } else if (currentStatus === "n") {
        newStatus = "b";
      }
      updateDoc(doc(firestore, "potential", id), {
        status: newStatus,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const deletePotential = (id) => {
    try {
      deleteDoc(doc(firestore, "potential", id));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <main className="flex flex-col items-center gap-8">
      <div className="w-full text-center font-bold text-5xl text-blue-500 p-8">
        <h1>Cold Calling</h1>
      </div>
      <form
        className="w-max gap-8 flex flex-col justify-center text-xl"
        onSubmit={(e) => {
          addPotential();
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-2">
          <h1>Business Name:</h1>
          <input onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>
        <div>
          <h1>Phone Number:</h1>
          <input
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>
        <div>
          <h1>Location:</h1>
          <input
            onChange={(e) => setData({ ...data, location: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-300 p-2 rounded-md text-black transition-color duration-150 hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
      <div className="w-9/12 self-start ml-3">
        <div className="*:p-2 flex justify-between bg-neutral-800 p-2 rounded-md mb-6">
          <h1>Name</h1>
          <h1>Number</h1>
          <h1>Location</h1>
        </div>
        {fetchData.map((potential, key) => (
          <main
            onClick={() => {
              changeStatus(potential.id, potential.status);
            }}
            key={`${potential.name}-${key}`}
            className={`text-sm p-4 rounded-md relative flex mt-2 w-full justify-between ${potential.status === "b" ? "bg-orange-400 text-black" : "bg-neutral-800 "} ${potential.status === "i" ? "bg-blue-500 text-black" : "bg-neutral-800 "} ${potential.status === "n" ? "bg-red-400 text-black" : "bg-neutral-800 "} ${potential.status === "c" ? "bg-green-500 text-black" : "bg-neutral-800 "}`}
          >
            <h1>{potential.name}</h1>
            <h1>{potential.phone}</h1>
            <h1>{potential.location}</h1>
            <button
              onClick={() => {
                deletePotential(potential.id);
              }}
              className="absolute -right-16 top-1/2 -translate-y-1/2 rounded-full bg-red-600 p-2"
            >
              <Image src={trash} alt="" width={32} />
            </button>
          </main>
        ))}
      </div>
    </main>
  );
}
