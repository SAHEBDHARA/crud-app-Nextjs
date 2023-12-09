import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextResponse } from 'next/server'

export async function POST(request){
  try {
    const {title, description} = await request.json();
    await connectMongoDB();
    await Topic.create({ title,  description})
    return NextResponse.json({message: "created"})
  } catch (error) {
    NextResponse.json({message: error})
    console.log(error)
  }
}

export async function GET(){
    try {
        await connectMongoDB();
        const topics = await Topic.find(); 
        return NextResponse.json({topics})
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB(); 
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: 'deleted'})
}


