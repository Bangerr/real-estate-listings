"use client";
import React from "react";

type Props = {
  image: string;
  location: string;
  area: number;
  bedrooms: number;
  price: number;
  id: number;
};

const ListingsCard = ({
  image,
  location,
  area,
  bedrooms,
  price,
  id,
}: Props) => {
  const detailTitleStyle = `font-semibold text-[1.05rem]`;
  const detailValuesStyle = `w-1/2 mr-2 text-right`;
  return (
    <div className=" bg-[#ffffff] rounded overflow-hidden mb-5 drop-shadow w-[19rem] sm:w-[22rem] md:w-[24rem]">
      <a href={`/listings/${id}`} target="_blank" className="w-full">
        <div className="md:w-full h-[200px]  overflow-hidden">
          <img
            className="md:h-full md:w-full rounded hover:scale-105 duration-500 ease-out delay-100 hover:cursor-pointer "
            src={`https://homefinderr-images.s3.eu-north-1.amazonaws.com/${image}`}
            alt={"House image"}
          />
        </div>
        <div className="min-h-fit mt-5 w-[99%] mx-auto">
          <div className="h-48 flex gap-5">
            <div className="flex flex-col w-full gap-5 ">
              <div className="flex flex-row px-5">
                <p className="w-1/2">
                  <span className={`${detailTitleStyle}`}>Location:</span>
                </p>
                <p className={`${detailValuesStyle}`}>{location}</p>
              </div>

              <div className="flex flex-row px-5">
                <p className="w-1/2">
                  <span className={`${detailTitleStyle}`}>Superfisce:</span>
                </p>
                <p className={`${detailValuesStyle}`}>
                  {area}
                  m&#178;
                </p>
              </div>

              <div className="flex flex-row px-5">
                <p className="w-1/2">
                  <span className={`${detailTitleStyle}`}>Bedrooms:</span>
                </p>
                <p className={`${detailValuesStyle}`}>{bedrooms}</p>
              </div>

              <div className="flex flex-row px-5">
                <p className="w-1/2">
                  <span className={`${detailTitleStyle}`}>Price: </span>
                </p>
                <p className={`${detailValuesStyle}`}>
                  {price.toLocaleString()}€
                </p>
              </div>
            </div>
            {/* <div className="flex flex-col basis-1/2 gap-5 font-light"></div> */}
          </div>
        </div>
      </a>
    </div>
  );
};

export default ListingsCard;
