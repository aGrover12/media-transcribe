import { Container } from 'inversify';
import { Locator } from "./locators";
import { MediaAcitons } from "./services/MediaActions";
import { IMediaRepository } from './interfaces/IMediaRepository';
import { StubRepository } from './repositories/StubRepository';

const container = new Container();
container.bind<MediaAcitons>(Locator.IMediaAcitons).to(MediaAcitons);
container.bind<IMediaRepository>(Locator.IMediaRepository).to(StubRepository);

export { container };