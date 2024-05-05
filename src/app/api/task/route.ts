import { Sequelize, sequelize } from "../../../../models";
import taskModel from "../../../../models/task";

const Task = taskModel(sequelize, Sequelize.DataTypes);

export async function GET(req: Request) {
  try {
    const res = await Task.findAll();
    return Response.json({ data: res });
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, type, completed, dueDate } = await req.json();

    const res = await Task.create({
      title,
      description,
      type,
      completed,
      dueDate,
    });
    return Response.json({ data: res });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
  // try {
  //   const res = await Task.create()
  // } catch (error) {

  // }
}
