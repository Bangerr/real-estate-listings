import { NextRequest, NextResponse } from "next/server";
import { getListingById } from "@/lib/listingActions";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} NOT Allowed` },
      { status: 405 }
    );
  }

  try {
    const data = await req.json(); // Parse JSON body
    console.log(data);
    // Fetch listings based on form data
    const listing = await getListingById(data);
    //console.log("Listing with ID:", listing);
    return NextResponse.json(listing, { status: 200 });

    // Return the listings as a JSON response
  } catch (err) {
    console.error("Failed to fetch data", err);
    return NextResponse.json(
      { error: "Failed to fetch Data" },
      { status: 500 }
    );
  }
  return new NextResponse();
}
