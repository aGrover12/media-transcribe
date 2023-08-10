import { container } from "./inversify.config";
import { Locator } from "./locators";
import { IMediaRepository } from "./interfaces/IMediaRepository";
import { IMediaAcitons } from "./interfaces/IMediaActions";

// Resolved dependencies
container.get<IMediaAcitons>(Locator.IMediaAcitons);
container.get<IMediaRepository>(Locator.IMediaRepository);