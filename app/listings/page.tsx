"use client";
import React, { useEffect, useState } from "react";
import SearchBarListings from "@/app/components/SearchListings";
import SearchCheckbox from "@/app/components/SearchCheckbox";
import ListingsCard from "@/app/components/ListingsCard";
import { houses } from "@/app/shared/HousesList";
import { getAllListing, getListing } from "@/lib/listingActions";
import SearchListings from "@/app/components/SearchListings";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  zipCode: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  energyclass: string;
  listingType: string;
  createdAt: string;
  updatedAt: string;
}

type TypeState = {
  Sale: boolean;
  Rent: boolean;
};

type CatergoryState = {
  House: boolean;
  Appartment: boolean;
  Condo: boolean;
  Land: boolean;
};

export default function Listings() {
  const [typeState, setTypeState] = useState<TypeState>({
    Sale: true,
    Rent: false,
  });
  const [catergoryState, setCatergoryState] = useState<CatergoryState>({
    House: false,
    Appartment: false,
    Condo: false,
    Land: false,
  });
  const [priceState, setPriceState] = useState(250000);
  const [dataReceivedDB, setDataReceivedDB] = useState<Listing[]>([]);

  const inputStyles = `w-full mb-2 min-h-max outline-0 text-[1.1em] 
  border-b-2 border-stone-400 focus:border-stone-200 transition duration-300
  bg-transparent`;
  const checkBoxLabelStyle = `flex items-center justify-center border w-28 
  rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600  `;

  useEffect(() => {
    //This useEffect acts as componentDidMount
    //It will only run once when the component mounts, since the dependency array is empty
    console.log("Entered");

    async function fetchAllListings() {
      try {
        const response = await fetch("/api/listings", {
          method: "POST",
          body: JSON.stringify("GETALL"),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Valid response:", data.data);
          setDataReceivedDB(data.data);
          console.log("Iterateable: ", dataReceivedDB);
        } else {
          const error = await response.json();
          console.error("Data fetching failed", error.message);
        }

        //console.log("Data received for rendering: ", dataReceivedDB);
      } catch (err) {
        console.error("Data fetching failed Step: ", err);
      }
    }

    fetchAllListings();

    //setDataReceivedDB();

    //console.log("mount");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents reloading when the form is submitted
    const formData = new FormData(e.currentTarget); // Get form data
    const formEntries = Object.fromEntries(formData);
    // console.log("Submitted: ", formEntries);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        body: JSON.stringify({
          formEntries,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Valid response:", data.data);

        setDataReceivedDB(data.data);
        console.log("Iterateable: ", dataReceivedDB);
      } else {
        const error = await response.json();
        console.error("Data fetching failed", error.message);
      }

      //console.log("Data received for rendering: ", dataReceivedDB);
    } catch (err) {
      console.error("Data fetching failed Step: ", err);
    }

    // setTypeState({
    //   FOR_SALE: false,
    //   FOR_RENT: false,
    // });
    // setCatergoryState({
    //   HOUSE: false,
    //   APPARTMENT: false,
    //   CONDO: false,
    //   LAND: false,
    // });
  };

  const handleTypeCheckboxChange = async (name: keyof TypeState) => {
    // giving type to name
    //console.log(name);

    await setTypeState((prevState) => {
      let newState = {
        Sale: false,
        Rent: false,
        [name]: !prevState[name], // toggle the checkbox state
      };

      // Log the new state of the checkbox
      console.log(`Checked [${name}]: `, newState);

      return newState;
    });

    //console.log("TypeState: ", typeState);
  };

  const handleCatergoryCheckboxChange = async (name: keyof CatergoryState) => {
    // giving type to name
    await setCatergoryState((prevState) => {
      let newState = {
        House: false,
        Appartment: false,
        Condo: false,
        Land: false,
        [name]: !prevState[name],
      };
      console.log(`Checked [${name}]: `, newState);
      return newState;
    });
  };

  function handlePriceChange(e: string) {
    setPriceState(parseInt(e));
  }
  return (
    <div className="relative md:min-h-screen md:w-screen w-full mx-auto pt-20">
      <div className="flex md:flex-row flex-col md:w-screen w-full md:min-h-screen  ">
        {/* SEARCHBAR */}
        <div
          className="flex md:min-h-screen justify-center items-center
          w-full md:w-[400px] bg-[#fcf9fd]">
          {" "}
          {/*bg-[#FEFCFF]*/}
          <div
            className="relative md:fixed md:top-0 flex flex-col justify-center items-center min-h-max 
            md:w-auto w-11/12 mx-auto md:pt-28">
            {/* TITLE */}
            <div className="flex md:justify-start justify-center md:mb-5 mb-2 sm:mx-5 md:mt-0 mt-5">
              <h1 className="md:text-[1.3rem] text-[1.5rem] md:font-extrabold font-semibold tracking-[10px]">
                Search
              </h1>
            </div>

            {/* FORM */}
            <div className="md:w-auto w-full mx-auto mt-5">
              <form
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 md:w-[250px] w-9/12 mx-auto">
                <div className="flex md:gap-10 gap-2 flex-col md:mb-10 mb-5">
                  {/* TYPE */}
                  <div className="flex flex-col items-start gap-2">
                    <p>Type</p>
                    <div className="w-full flex flex-row justify-around items-center ">
                      <SearchCheckbox
                        name="listingType"
                        labelName="Sale"
                        checked={typeState.Sale}
                        value={"Sale"}
                        handleAction={() => handleTypeCheckboxChange("Sale")}
                      />
                      <SearchCheckbox
                        name="listingType"
                        labelName="Rent"
                        checked={typeState.Rent}
                        value={"Rent"}
                        handleAction={() => handleTypeCheckboxChange("Rent")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:justify-center gap-2">
                    <p>Category</p>
                    <div className="flex flex-col gap-2">
                      <div className="w-full flex flex-row justify-around gap-2">
                        <SearchCheckbox
                          name="propertyType"
                          labelName="House"
                          value={"House"}
                          checked={catergoryState.House}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("House")
                          }
                        />

                        <SearchCheckbox
                          name="PropertyType"
                          labelName="Appartment"
                          value={"Appartment"}
                          checked={catergoryState.Appartment}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("Appartment")
                          }
                        />
                      </div>
                      <div className="w-full flex flex-row justify-around gap-2">
                        <SearchCheckbox
                          name="propertyType"
                          labelName="Condo"
                          value={"Condo"}
                          checked={catergoryState.Condo}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("Condo")
                          }
                        />

                        <SearchCheckbox
                          name="propertyType"
                          labelName="Land"
                          value={"LAND"}
                          checked={catergoryState.Land}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("Land")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {/* PLACE */}
                  <div className="flex flex-row gap-2">
                    <p>City</p>
                    <select className={`${inputStyles}`} name="location">
                      <option value="">All above</option>
                      <option value="New York">New York</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Austin">Austin</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Seattle">Seattle</option>
                    </select>
                  </div>
                  {/* <div className="flex flex-row gap-2">
                    <p>Zone</p>
                    <input type="text" className={`${inputStyles}`} />
                  </div> */}

                  <div className="flex flex-col md:gap-10 gap-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">Price</label>
                      <input
                        name="price"
                        type="range"
                        min="10000"
                        max="1000000"
                        value={priceState}
                        step={10000}
                        className="slider w-full mb-2 min-h-max"
                        onChange={(e) => {
                          handlePriceChange(e.target.value);
                        }}
                      />
                      <p>{priceState.toLocaleString()} €</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Area in m<sup>2</sup>
                      </label>
                      <select name="area" className={`${inputStyles}`}>
                        <option value="">All above</option>
                        <option value="60">&lt;60m&#178;</option>
                        <option value="70">&lt;70m&#178;</option>
                        <option value="80">&lt;80m&#178;</option>
                        <option value="<90">&lt;90m&#178;</option>
                        <option value=">90">&gt;90&#178;</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  className="-mt-5 rounded-lg border border-black px-8 py-3 transition 
              duration-500 hover:text-white hover:scale-90 hover:bg-black">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Houses */}
        <div className="w-full mx-auto flex justify-center pt-20 ">
          <div className="flex justify-center md:items-start items-center flex-row flex-wrap gap-y-5 gap-x-28">
            {dataReceivedDB.map((house) => (
              <div className={`flex box-border`} key={house.id}>
                <ListingsCard
                  location={house.location}
                  area={house.area}
                  bedrooms={house.bedrooms}
                  price={house.price}
                  id={house.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
