import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} is working`,
        origin: "check-service.ts",
      });

      this.callLogs(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not working. ${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: "check-service.ts",
      });

      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
