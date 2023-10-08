import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("LogEntity", () => {
  const dataObj = {
    origin: "log.entity.test.ts",
    message: "test",
    level: LogSeverityLevel.low,
  };
  it("should create a log entity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it("should create a log entity instance from json", () => {
    const json = `{"level":"low","message":"Service https://www.google.com is working","createdAt":"2023-10-07T00:37:25.053Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service https://www.google.com is working");
    expect(log.level).toBe("low");
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it("should create a log entity instance from object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
