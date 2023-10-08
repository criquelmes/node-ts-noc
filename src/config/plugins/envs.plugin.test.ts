import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  it("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "ccriquelmes@gmail.com",
      MAILER_SECRET_KEY: "tznzqsgcomcchoyb",
      PROD: false,
      MONGO_DB_URL: "mongodb://criquelmes:654321@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_DB_USER: "criquelmes",
      MONGO_DB_PASSWORD: "654321",
    });
  });

  it("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = undefined;

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
