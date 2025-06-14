import { NextRequest, NextResponse } from "next/server";
import { studentData } from "@/utils/data";

export function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    
    const filtered = studentData.filter((student) =>
        student.name.toLowerCase().includes(query)
    );

    return NextResponse.json(filtered.slice(0, 5));
}
