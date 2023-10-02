import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started");

    //TODO: Enviar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "ccriquelmes@gmail.com",
    //   "criquelmes@live.com",
    // ]);
    // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY);

    // emailService.sendEmail({
    //   to: "criquelmes@live.com",
    //   subject: "Logs de sistema",
    //   htmlBody: `<h1>Logs de sistema NOC</h1>
    //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //   <p>Ver logs Adjuntos</p>
    //   `,
    // });

    // emailService.sendEmailWithFileSystemLogs([
    //   "ccriquelmes@gmail.com",
    //   "criquelmes@live.com",
    // ]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}
