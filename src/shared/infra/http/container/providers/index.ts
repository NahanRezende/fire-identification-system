import { MailProvider } from "@modules/sensor/providers/implementations/MailProvider";
import { IMailProvider } from "@modules/sensor/providers/interface/IMailProvider";
import { container } from "tsyringe";

container.registerSingleton<IMailProvider>('MailProvider', MailProvider);
