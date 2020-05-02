import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";
import * as logger from "morgan";
import { DatabaseController } from "./controllers/database.controller";
import Types from "./types";
import { AuthentificationController } from "./controllers/authentification.controller";
import { MemberController } from "./controllers/member.controller";
import { AdminController } from "./controllers/admin.controller";
import { FilmController } from "./controllers/film.controller";

@injectable()
export class Application {

    private readonly internalError: number = 500;
    public app: express.Application;

    public constructor(@inject(Types.DatabaseController) private databaseController: DatabaseController,
        @inject(Types.AuthentificationController) private authentificationController: AuthentificationController,
        @inject(Types.MemberController) private memberController: MemberController,
        @inject(Types.AdminController) private adminController: AdminController,
        @inject(Types.FilmController) private filmcontroller: FilmController) {
        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        // Middlewares configuration
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
    }

    public bindRoutes(): void {
        // Notre application utilise le routeur de notre API
        this.app.use("/database", this.databaseController.router);
        this.app.use("/authentificate", this.authentificationController.router);
        this.app.use("/member", this.memberController.router);
        this.app.use("/admin", this.adminController.router);
        this.app.use("/film", this.filmcontroller.router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        // if (this.app.get("env") === "development") {
        if (true) {
            // tslint:disable-next-line:no-any
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}
