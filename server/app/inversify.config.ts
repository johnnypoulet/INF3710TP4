import { Container } from "inversify";
import { Application } from "./app";
import { DatabaseController } from './controllers/database.controller';
import { Server } from "./server";
import { DatabaseService } from "./services/database.service";
import Types from "./types";
import { AuthentificationController } from "./controllers/authentification.controller";
import { AuthentificationService } from "./services/authentification.service";
import { MemberController } from "./controllers/member.controller";
import { MemberService } from "./services/member.service";
import { EncryptService } from "./services/encrypt.service";
import { AdminController } from "./controllers/admin.controller";
import { AdminService } from "./services/admin.service";
import { FilmService } from "./services/film.service";
import { FilmController } from "./controllers/film.controller";

const container: Container = new Container();

container.bind(Types.Server).to(Server);
container.bind(Types.Application).to(Application);

container.bind(Types.DatabaseService).to(DatabaseService);
container.bind(Types.DatabaseController).to(DatabaseController);

container.bind(Types.EncryptService).to(EncryptService);

container.bind(Types.AuthentificationController).to(AuthentificationController);
container.bind(Types.AuthentificationService).to(AuthentificationService);


container.bind(Types.MemberController).to(MemberController);
container.bind(Types.MemberService).to(MemberService);

container.bind(Types.AdminController).to(AdminController);
container.bind(Types.AdminService).to(AdminService);

container.bind(Types.FilmController).to(FilmController);
container.bind(Types.FilmService).to(FilmService);

export { container };
