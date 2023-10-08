import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDataSource } from "../../domain/datasources/log.datasource";
describe("FileSystemDatasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  it("should create a log file if they dont exists", () => {
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  it("should save a log in logs-all.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  it("should save a log in logs-all.log and logs-medium.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test",
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  it("should save a log in logs-all.log and logs-high.log", () => {
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test",
      origin: "file-system.datasource.test.ts",
    });

    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  it("should return all logs", async () => {
    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "log-low",
      origin: "file-system.datasource.test.ts",
    });
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "log-medium",
      origin: "file-system.datasource.test.ts",
    });
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "log-high",
      origin: "file-system.datasource.test.ts",
    });

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsLow).toEqual(expect.arrayContaining([logMedium]));
    expect(logsLow).toEqual(expect.arrayContaining([logHigh]));
  });

  it("should not throw an error if path exists", () => {
    new FileSystemDatasource();
    new FileSystemDatasource();

    expect(true).toBe(true);
  });

  it("should throw an error if severity level is not implemented", async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = "not-implemented" as LogSeverityLevel;

    try {
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBe(false);
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toContain(customSeverityLevel);
    }
  });
});
