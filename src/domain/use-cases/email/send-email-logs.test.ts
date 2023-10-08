import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("SendLogEmailUseCase", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call sendEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute("ccriquelmes@gmail.com");
    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
    expect(mockLogRepository.saveLog).toBeCalledTimes(1);
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Email with logs sent to ccriquelmes@gmail.com",
      origin: "send-email-logs.ts",
    });
  });

  it("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmailLogs.execute("ccriquelmes@gmail.com");
    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
    expect(mockLogRepository.saveLog).toBeCalledTimes(1);
    expect(mockLogRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Error sending email with logs",
      origin: "send-email-logs.ts",
    });
  });
});
