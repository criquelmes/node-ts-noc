import { envs } from "./config/plugins/envs.plugin";
import { Server } from "./presentation/server";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "@prisma/client";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_DB_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const prisma = new PrismaClient();

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message from Prisma",
  //     origin: "app.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH",
  //   },
  // });

  // console.log(logs);

  // Crear una colección = tables, documento = registro
  // const newLog = await LogModel.create({
  //   level: "low",
  //   message: "Test message from Mongo",
  //   origin: "app.ts",
  // });

  // await newLog.save();
  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);
  Server.start();
}
