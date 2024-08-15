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

type Props = {
  //fetchData: (formData: FormData) => void;
};

type TypeState = {
  FOR_SALE: boolean;
  FOR_RENT: boolean;
};

type CatergoryState = {
  HOUSE: boolean;
  APPARTMENT: boolean;
  CONDO: boolean;
  LAND: boolean;
};

export default function Listings() {
  const [typeState, setTypeState] = useState<TypeState>({
    FOR_SALE: true,
    FOR_RENT: false,
  });
  const [catergoryState, setCatergoryState] = useState<CatergoryState>({
    HOUSE: false,
    APPARTMENT: false,
    CONDO: false,
    LAND: false,
  });
  const [priceState, setPriceState] = useState(250000);
  const [dataReceivedDB, setDataReceivedDB] = useState<Listing[]>([]);

  const inputStyles = `w-full mb-2 min-h-max outline-0 text-[1.1em] 
  border-b-2 border-stone-400 focus:border-stone-200 transition duration-300
  bg-transparent`;
  const checkBoxLabelStyle = `flex items-center justify-center border w-28 
  rounded-lg h-10 hover:cursor-pointer hover:text-blue-600 hover:border-blue-600  `;
  // const focusCheckbox = checkBoxState.buy
  //   ? `focus:bg-blue-100 focus:text-blue-600
  // focus:border-blue-600`
  //   : "";
  useEffect(() => {
    //This useEffect acts as componentDidMount
    //It will only run once when the component mounts, since
    // the dependency array is empty
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
          console.log("Valid response:", data);
          if (data && data.data) {
            setDataReceivedDB(data.data);
            console.log("Iterateable: ", data.data);
          } else {
            console.error("No data received or data format is incorrect.");
          }
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
        const rawData = await response.text();
        console.log("Valid response:", rawData);
        try {
          const data = JSON.parse(rawData); // Attempt to parse JSON
          console.log("Parsed response:", data); // Log parsed response

          if (data && data.data) {
            setDataReceivedDB(data.data);
            console.log("Iterateable: ", data.data);
          } else {
            console.error(
              "Data does not contain 'data' property or is undefined."
            );
          }
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
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
        FOR_SALE: false,
        FOR_RENT: false,
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
        HOUSE: false,
        APPARTMENT: false,
        CONDO: false,
        LAND: false,
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
                        checked={typeState.FOR_SALE}
                        value={"FOR_SALE"}
                        handleAction={() =>
                          handleTypeCheckboxChange("FOR_SALE")
                        }
                      />
                      <SearchCheckbox
                        name="listingType"
                        labelName="Rent"
                        checked={typeState.FOR_RENT}
                        value={"FOR_RENT"}
                        handleAction={() =>
                          handleTypeCheckboxChange("FOR_RENT")
                        }
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
                          value={"HOUSE"}
                          checked={catergoryState.HOUSE}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("HOUSE")
                          }
                        />

                        <SearchCheckbox
                          name="PropertyType"
                          labelName="Appartment"
                          value={"APPARTMENT"}
                          checked={catergoryState.APPARTMENT}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("APPARTMENT")
                          }
                        />
                      </div>
                      <div className="w-full flex flex-row justify-around gap-2">
                        <SearchCheckbox
                          name="propertyType"
                          labelName="Condo"
                          value={"CONDO"}
                          checked={catergoryState.CONDO}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("CONDO")
                          }
                        />

                        <SearchCheckbox
                          name="propertyType"
                          labelName="Land"
                          value={"LAND"}
                          checked={catergoryState.LAND}
                          handleAction={() =>
                            handleCatergoryCheckboxChange("LAND")
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
                        <option value="60">60m&#178;</option>
                        <option value="70">70m&#178;</option>
                        <option value="80">80m&#178;</option>
                        <option value="90">90m&#178;</option>
                        <option value="100">100m&#178;</option>
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
        <div className="w-full mx-auto flex  pt-20 ">
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
