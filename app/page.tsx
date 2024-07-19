"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Image from "next/image";
import JPMorgan from "@/app/assets/sponsors/JPMorganChase_Logo.png";
import XLogo from "@/app/assets/sponsors/X_Logo.png";
import CoinbaseLogo from "@/app/assets/sponsors/Coinbase_Logo.png";
import MetaLogo from "@/app/assets/sponsors/Meta_Logo.png";
import ListingsCard from "@/app/components/ListingsCard";
import House1 from "@/app/assets/listings/House1.png";
import useMediaQuery from "@/app/hooks/userMediaQuery";
import dynamic from "next/dynamic";

export default function Home() {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const Level = dynamic(() => import("@/app/components/Level"), {
    ssr: false,
  });
  const Sudo = dynamic(() => import("@/app/components/Sudo"), {
    ssr: false,
  });
  const Cactus = dynamic(() => import("@/app/components/Cactus"), {
    ssr: false,
  });
  const Camera = dynamic(() => import("@/app/components/Camera"), {
    ssr: false,
  });
  const Icon = dynamic(() => import("@/app/components/Icon"), {
    ssr: false,
  });
  const Pyramid = dynamic(() => import("@/app/components/Pyramid"), {
    ssr: false,
  });

  return (
    <main className="md:mt-10 md:p-24 pt-24 my-auto">
      <section
        id="home"
        className="md:h-full w-full mx-auto md:py-10 pb-10 items-center justify-center">
        {/* MAIN HEADER AND ANIMATION */}
        <div className="md:flex mx-auto mt-5 md:w-11/12 w-9/12 md:h-full ">
          {/* INTRODUCTIONS */}
          <div className="md:basis-2/5 z-20 my-auto">
            <div className="heading">
              <h1 className="md:pb-10 pb-5 text-2xl font-extrabold text-center md:text-start">
                Welcome to Home Finder
              </h1>
              <div className="intro">
                <p className="text-lg text-center md:text-start">
                  Your perfect home awaits. Explore our curated listings and
                  find your dream property with ease. From cozy apartments to
                  luxury estates, Home Finder is your trusted partner in real
                  estate.
                </p>
              </div>
            </div>
          </div>

          {/* ANIMATIONS */}
          <div className="h-[350px] md:h-[500px] mt-12 flex basis-3/5 justify-center md:z-10 md:ml-40 md:my-auto md:justify-end">
            <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
              <color attach="background" args={["#FFD8D8"]} />
              <ambientLight />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[0, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}>
                <group position-y={-0.75} dispose={null}>
                  <Level />
                  <Sudo />
                  <Camera />
                  <Cactus />
                  <Icon />
                  <Pyramid />
                </group>
              </PresentationControls>
            </Canvas>
          </div>
        </div>

        <div className="w-full">
          {/* SPONSORS */}
          {isAboveMediumScreens && (
            <div className="sponsor md:w-11/12 w-full mx-auto py-10 h-[150px] flex justify-start items-center gap-16">
              <div className="w-28">
                <Image src={JPMorgan} alt="JPMorgan" />
              </div>
              <div className="w-28">
                <Image src={CoinbaseLogo} alt="Coinabse" />
              </div>
              <div className="w-28">
                <Image src={MetaLogo} alt="Meta" />
              </div>
              <div className="w-12">
                <Image src={XLogo} alt="X" />
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        id="listings"
        className="mx-auto min-h-full md:w-full w-5/6 py-20">
        {/* LISTINGS */}
        <div className="md:w-11/12 mx-auto">
          <div className="md:my-5 md:w-full">
            <h1 className="text-2xl font-bold">Listings</h1>
          </div>
          <div className="overflow-visible grid grid-cols-1 md:grid-cols-[repeat(4,2fr)] gap-2 md:h-5/6 w-full items-center justify-center">
            <div className="md:row-span-2 ">
              <ListingsCard listingsImage={House1} id={1} />
            </div>
            <div className="">
              <ListingsCard listingsImage={House1} id={2} />
            </div>
            <div className="">
              <ListingsCard listingsImage={House1} id={3} />
            </div>
            <div className="">
              <ListingsCard listingsImage={House1} id={4} />
            </div>
            <div className="">
              <ListingsCard listingsImage={House1} id={5} />
            </div>
            <div>
              <ListingsCard listingsImage={House1} id={6} />
            </div>
            <div>
              <ListingsCard listingsImage={House1} id={7} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
