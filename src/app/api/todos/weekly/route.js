import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Todo from '@/db/models/Todos';

export async function GET() {
  try {
    await connectToDatabase();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const weeklyData = await Todo.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          tasks: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          tasks: 1
        }
      },
      {
        $sort: { name: 1 }
      }
    ]);

    return NextResponse.json(weeklyData);
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}