import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource } from "./postgres-log.datasource";
describe("Test on PostgreSQLDatasource", () => {
  //   const LogDataSource = new PostgresLogDatasource();
  //   const log = new LogEntity({
  //     level: LogSeverityLevel.medium,
  //     message: "test",
  //     origin: "postgres-log.datasource.test.ts",
  //   });
  //   beforeAll(async () => {
  //     await LogDataSource.connect();
  //   })

  it("should create a log", () => {});
});
