import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "updated", topic: updatedTopic });
  } catch (error) {
    console.error("Error updating topic:", error);

    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}


export async function GET(request, {params}) {
    try {
        const {id} = params;
        await connectMongoDB();
        const topic = await Topic.findOne({_id: id});
        return NextResponse.json({topic})
    } catch (error) {
        return NextResponse.error("Internal Server Error", { status: 500 });
    }
}
