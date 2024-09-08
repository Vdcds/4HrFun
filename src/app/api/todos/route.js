import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Todo from '@/db/models/Todos';

export async function GET() {
  try {
    await connectToDatabase();
    const todos = await Todo.find({});
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const { task, severity } = await request.json();
    const newTodo = new Todo({ task, severity });
    await newTodo.save();
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { id, ...updateData } = await request.json();
    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { id } = await request.json();
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}