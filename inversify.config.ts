import { Container } from 'inversify';
import { Locator } from "./locators";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { IMediaRepository } from './interfaces/IMediaRepository';
import { MediaRepository } from './repositories/MediaRepository';
import { IMediaAcitonsService } from './interfaces/IMediaActionsService';
import { StubRepository } from './repositories/StubRepository';
import { decorate, injectable } from "inversify";

const container = new Container();
container.bind<IMediaAcitonsService>(Locator.IMediaAcitons).to(MediaAcitonsService);
container.bind<IMediaRepository>(Locator.IMediaRepository).to(MediaRepository);

decorate(injectable(), StubRepository);
decorate(injectable(), MediaRepository);

export { container };