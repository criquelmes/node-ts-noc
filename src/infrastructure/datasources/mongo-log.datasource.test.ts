import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("Test on MongoLogDatasource", () => {
  const logDataSource = new MongoLogDatasource();

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: "test",
    origin: "mongo-log.datasource.test.ts",
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_DB_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log Created: ",
      expect.any(String)
    );
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
