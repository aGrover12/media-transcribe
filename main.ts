import { container } from "./inversify.config";
import { Locator } from "./locators";
import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitonsService } from "./interfaces/IMediaActionsService";

// Resolved dependencies
container.get<IMediaAcitonsService>(Locator.IMediaAcitons);
container.get<IMediaRepository>(Locator.IMediaRepository);