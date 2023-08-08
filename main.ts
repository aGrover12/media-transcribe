import { container } from "./inversify.config";
import { Locator } from "./locators";
import { IMediaRepository } from "./repositories/IMediaRepository";
import { IMediaAcitons } from "./services/IMediaActions";

// Resolved dependencies
container.get<IMediaAcitons>(Locator.IMediaAcitons);
container.get<IMediaRepository>(Locator.IMediaRepository);