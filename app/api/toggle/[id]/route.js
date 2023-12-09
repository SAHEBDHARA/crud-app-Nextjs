import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from 'next/server';


export async function POST(request, {params}) {


  try {
    const { id } = params;
    console.log(id)
    await connectMongoDB();
    const existingTopic = await Topic.findById(id);

    if (!existingTopic) {
      return NextResponse.error("Topic not found", { status: 404 });
    }
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { isDone: !existingTopic.isDone },
      { new: true }
    );
    return NextResponse.json({ message: "Toggle successful", topic: updatedTopic });
  } catch (error) {
    console.error("Error toggling isDone:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
