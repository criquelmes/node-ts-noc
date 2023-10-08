import { CheckServiceMultiple } from "./check-service-multiple";
import { LogEntity } from "../../entities/log.entity";

describe("CheckService UseCase", () => {
  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
    successCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://www.google.com");
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(successCallback).toBeCalledTimes(1);
    expect(errorCallback).not.toHaveBeenCalled();
    expect(errorCallback).toBeCalledTimes(0);

    expect(mockRepo1.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toBeCalledWith(expect.any(LogEntity));
  });

  it("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute("https://www.goasdasdogle.com");
    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(successCallback).toBeCalledTimes(0);
    expect(errorCallback).toHaveBeenCalled();
    expect(errorCallback).toBeCalledTimes(1);

    expect(mockRepo1.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toBeCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toBeCalledWith(expect.any(LogEntity));
  });
});
