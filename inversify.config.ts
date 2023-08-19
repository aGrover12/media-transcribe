import { Container } from 'inversify';
import { Locator } from "./locators";
import { MediaAcitonsService } from "./services/MediaActionsService";
import { IMediaRepository } from './interfaces/IMediaRepository';
import { StubRepository } from './repositories/StubRepository';

const container = new Container();
container.bind<MediaAcitonsService>(Locator.IMediaAcitons).to(MediaAcitonsService);
container.bind<IMediaRepository>(Locator.IMediaRepository).to(StubRepository);

export { container };