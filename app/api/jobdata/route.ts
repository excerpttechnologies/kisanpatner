


// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/lib/mongodb";
// import Job from "@/app/models/excerptjobdatas";
// import type { NextRequest } from "next/server";

// export const dynamic = 'force-dynamic';

// export async function GET(request: NextRequest) {
//   console.log("=== API ROUTE HIT ===");
  
//   try {
//     console.log("Connecting to DB...");
//     await connectDB();
//     console.log("✓ DB Connected");
    
//     console.log("Fetching jobs from excerptjobdatas collection...");
//     const jobs = await Job.find({}).lean().exec();
//     console.log(`✓ Found ${jobs.length} jobs`);
    
//     // Log first job to verify structure
//     if (jobs.length > 0) {
//       console.log("Sample job:", JSON.stringify(jobs[0], null, 2));
//     }
    
//     return NextResponse.json(jobs, { 
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//   } catch (error: any) {
//     console.error("=== API ERROR ===");
//     console.error("Error name:", error.name);
//     console.error("Error message:", error.message);
//     console.error("Full error:", error);
    
//     return NextResponse.json(
//       { 
//         error: error.message,
//         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       },
//       { status: 500 }
//     );
//   }
// }





//UPDATED BY SAGAR




import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Job from "@/app/models/excerptjobdatas";
import type { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  console.log("=== API ROUTE HIT ===");

  try {
    console.log("Connecting to DB...");
    await connectDB();
    console.log("✓ DB Connected");

    console.log("Fetching jobs from excerptjobdatas collection...");
    const jobs = await Job.find({}).lean().exec();
    console.log(`✓ Found ${jobs.length} jobs`);

    if (jobs.length > 0) {
      console.log("Sample job:", JSON.stringify(jobs[0], null, 2));
    }

    return NextResponse.json(jobs, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error("=== API ERROR ===");

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Full error:", error);

      return NextResponse.json(
        {
          error: error.message,
          stack:
            process.env.NODE_ENV === "development"
              ? error.stack
              : undefined,
        },
        { status: 500 }
      );
    }

    // Fallback (extremely rare, but TS-safe)
    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}
