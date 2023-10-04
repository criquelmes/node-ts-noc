import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { CronService } from "./cron/cron-service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started... ");

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

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
