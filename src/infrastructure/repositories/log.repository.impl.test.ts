import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";
import { LogRepository } from "../../domain/repository/log.repository";

describe("LogRepositoryImpl", () => {
  //   it("saveLog should call the datasource with arguments", () => {
  //     // Arrange
  //     const logDataSource = {
  //       saveLog: jest.fn(),
  //       getLogs: jest.fn(),
  //     };
  //     const logRepository = new LogRepositoryImpl(logDataSource);
  //     const log = new LogEntity({
  //       level: LogSeverityLevel.low,
  //       message: "test",
  //       origin: "log.repository.impl.test.ts",
  //     });
  //     // Act
  //     logRepository.saveLog(log);
  //     // Assert
  //     expect(logDataSource.saveLog).toHaveBeenCalledWith(log);
  //   });

  //   it("getLogs should call the datasource with arguments", () => {
  //     // Arrange
  //     const logDataSource = {
  //       saveLog: jest.fn(),
  //       getLogs: jest.fn(),
  //     };
  //     const logRepository = new LogRepositoryImpl(logDataSource);
  //     const severityLevel = LogSeverityLevel.low;
  //     // Act
  //     logRepository.getLogs(severityLevel);
  //     // Assert
  //     expect(logDataSource.getLogs).toHaveBeenCalledWith(severityLevel);
  //   });

  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saveLog should call the datasource with arguments", async () => {
    const log = { level: LogSeverityLevel.high, message: "hola" } as LogEntity;
    await logRepository.saveLog(log);

    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });

  it("getLogs should call the datasource with arguments", async () => {
    const lowSeverity = LogSeverityLevel.low;
    await logRepository.getLogs(lowSeverity);
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(lowSeverity);
  });
});
