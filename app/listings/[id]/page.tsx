"use client";
import React, { useEffect, useState } from "react";
import ContactInfo from "@/app/components/ContactInfo";
import ImageGallery from "@/app/components/ImageGallery";
import balcony from "@/app/assets/balcony.png";
import Image from "next/image";
import ListingDetailItem from "@/app/components/ListingDetailItem";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ListingId } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function List({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const [dataReceivedDB, setDataReceivedDB] = useState<ListingId | null>(null);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isGalleryClicked, setIsGalleryClicked] = useState<boolean>(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const detailsStyle = `flex flex-col`;
  const detailsContentStyle = `text-sm ml-7`;
  const hideThumbnail = isGalleryClicked ? "hidden" : "";
  const dimBackground = isGalleryClicked ? "" : "bg-gray-200";

  useEffect(() => {
    const id = pathname.split("/").pop(); //extract the id from the pathname. assume the id is the last segment of the path
    async function fetchListing() {
      try {
        const response = await fetch(`/api/${pathname}`, {
          method: "POST",
          body: JSON.stringify({
            id, // send the extracted id in the request body
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setDataReceivedDB(data);
          if (data && data.images) {
            const urls = data.images.map((image: any) => image.url);
            setImagesUrl(urls);
          }
        } else {
          const error = await response.json();
          console.error("Data fetching failed", error.message);
        }
      } catch (err) {
        console.error("Data fetching failed Step: ", err);
      }
    }
    fetchListing();
  }, [pathname]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);
    console.log("formData", formEntries);

    async function sendEmail() {
      try {
        const response = await fetch(`/api/send`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          toast({
            variant: "success",
            description: "Successfully sent message.",
          });
          setInterval(() => {
            window.location.reload();
          }, 1500);
        } else {
          const error = await response.json();
          console.error("Data fetching failed", error.message);
        }
      } catch (error) {
        console.log("Couldn't send email", error);
      }
    }
    sendEmail();
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  return (
    <div className={`w-full md:p-24 md:pt-24 pt-[70px] my-auto relative `}>
      {isCarouselOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center animate ease-in-out duration-500`}
          onClick={closeCarousel}>
          <Carousel className="w-full max-w-3xl">
            <CarouselContent className="">
              {imagesUrl.map((image: any, idx: any) => (
                <CarouselItem key={idx}>
                  <img
                    src={`https://homefinderr-images.s3.eu-north-1.amazonaws.com/${image}`}
                    alt="image"
                    className={`w-full h-auto`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      <div
        className={`flex flex-col gap-8 md:h-full md:w-9/12 w-full mx-auto md:py-10 pt-5 pb-10 drop-shadow-sm ${
          isCarouselOpen ? "opacity-25" : ""
        }`}>
        {/* IMAGES */}

        <div
          className="grid gap-8 md:grid-cols-1 w-full"
          onClick={() => handleImageClick}>
          <ImageGallery
            images={imagesUrl}
            clicked={isGalleryClicked}
            listingType={dataReceivedDB?.listingType}
          />
        </div>
        <div className="md:w-full w-11/12 mx-auto">
          <div className="description  flex lg:flex-row flex-col md:gap-16 gap-5 p-5 justify-between">
            <div className="flex w-full">
              <div className="w-full flex md:flex-row flex-col justify-between">
                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-5">
                    <div className="flex md:flex-row flex-col gap-5 justify-between">
                      <div className="flex flex-col gap-5">
                        <h1 className="font-bold text-xl">
                          {dataReceivedDB?.title}
                        </h1>
                        <div className="flex flex-row gap-5">
                          <p>
                            <i className="fa-solid fa-bed"></i>{" "}
                            {dataReceivedDB?.bedrooms} Beds
                          </p>
                          <p>
                            <i className="fa-solid fa-bath"></i>{" "}
                            {dataReceivedDB?.bathrooms} Baths
                          </p>
                          <p>
                            <i className="fa-solid fa-ruler"></i>{" "}
                            {dataReceivedDB?.area}
                            m&#178;
                          </p>
                        </div>
                      </div>

                      {/* PRICE AND LOCATION */}
                      <div className="">
                        <p className="font-bold text-[1.2rem] mb-2">
                          {dataReceivedDB?.price === null
                            ? "Preis auf Anfrage"
                            : dataReceivedDB?.price?.toLocaleString()}{" "}
                          €
                        </p>
                        <p>Location: {dataReceivedDB?.location}</p>
                      </div>
                    </div>
                    {/* DETAILS */}
                    <div className="flex-row border-t border-b w-full py-2">
                      <h1 className="mb-3 font-semibold w-full border bg-gray-200 rounded p-2">
                        <i className="fa-solid fa-house"></i> Property
                        Information
                      </h1>
                      <div className="grid grid-cols-2 md:gap-y-2 gap-y-4">
                        <ListingDetailItem
                          title={"Property Type"}
                          content={dataReceivedDB?.propertyType}
                          icon={`fa-solid fa-building mr-2`}
                        />
                        <ListingDetailItem
                          title={"Contract"}
                          content={dataReceivedDB?.listingType}
                          icon={`fa-solid fa-file-signature mr-2`}
                        />
                        <ListingDetailItem
                          title={"Floors"}
                          content={dataReceivedDB?.floors}
                          icon={`fa-solid fa-stairs mr-2`}
                        />
                        <ListingDetailItem
                          title={"Building Floors"}
                          content={dataReceivedDB?.buildingFloors}
                          icon={`fa-solid fa-building mr-2`}
                        />
                        <ListingDetailItem
                          title={"Elevator"}
                          content={dataReceivedDB?.elevator ? "Yes" : "No"}
                          icon={`fa-solid fa-elevator mr-2`}
                        />
                        <ListingDetailItem
                          title={"Area"}
                          content={`${dataReceivedDB?.area}m²`}
                          icon={`fa-solid fa-elevator mr-2`}
                        />
                        <ListingDetailItem
                          title={"Bedrooms"}
                          content={dataReceivedDB?.bedrooms}
                          icon={`fa-solid fa-bed mr-2`}
                        />
                        <ListingDetailItem
                          title={"Bathrooms"}
                          content={dataReceivedDB?.bathrooms}
                          icon={`fa-solid fa-bath mr-2`}
                        />
                        <ListingDetailItem
                          title={"Furnished"}
                          content={dataReceivedDB?.furnished}
                          icon={`fa-solid fa-couch mr-2`}
                        />

                        <div className={`${detailsStyle}`}>
                          <div className=" flex flex-row gap-2">
                            <Image
                              src={balcony}
                              alt="balconyImage"
                              height={18}
                            />
                            <h2 className="font-semibold md:text-base text-[0.9rem]">
                              Balcony
                            </h2>
                          </div>
                          <p className={`${detailsContentStyle}`}>
                            {dataReceivedDB?.balcony ? "Yes" : "No"}
                          </p>
                        </div>

                        <ListingDetailItem
                          title={"Garage"}
                          content={dataReceivedDB?.garage}
                          icon={`fa-solid fa-car mr-2`}
                        />
                        <ListingDetailItem
                          title={"Heating"}
                          content={dataReceivedDB?.heating}
                          icon={`fa-solid fa-fire mr-2`}
                        />
                        <ListingDetailItem
                          title={"Energy Class"}
                          content={dataReceivedDB?.energyclass}
                          icon={`fa-solid fa-fire mr-2`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 mt-10 basis-[25%]">
                    <h1>Description:</h1>
                    <p className="text-justify">
                      {dataReceivedDB?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center h-full border rounded-lg md:mt-0 mt-10">
              <ContactInfo
                id={dataReceivedDB?.id}
                onSubmit={handleEmailSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
