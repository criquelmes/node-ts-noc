import nodemailer from "nodemailer";
import { EmailService, SendMailOptions } from "./email.service";

describe("EmailService", () => {
  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  it("should send email", async () => {
    const options: SendMailOptions = {
      to: "ccriquelmes@gmail.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    // const emailSent = await emailService.sendEmail(options);
    // expect(emailSent).toBe(true);

    await emailService.sendEmail(options);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "ccriquelmes@gmail.com",
    });
  });

  it("should send email with attachements", async () => {
    const email = "ccriquelmes@gmail.com";
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs de sistema",
      html: expect.any(String),
      //   attachments: expect.any(Array),
      attachments: expect.arrayContaining([
        { filename: "logs-all.log", path: "./logs/logs-all.log" },
        { filename: "logs-high.log", path: "./logs/logs-high.log" },
        { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      ]),
    });
  });
});
