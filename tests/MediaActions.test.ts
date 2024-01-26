import { test, expect } from '@jest/globals';
import { MediaAcitonsService } from "../services/MediaActionsService";
import { StubRepository } from '../repositories/StubRepository';
import { Media } from '../models/Media';
import { Results } from '../constants/Results';

let repository: StubRepository = new StubRepository();
let mediaActions: MediaAcitonsService = new MediaAcitonsService(repository);

let media: Media = new Media({
    id: 1,
    title: "Test_Name",
    directory: "Not/Real/Directory"
});

afterEach(() => {
    jest.resetAllMocks();
    repository.meidaInformation = [];
});

test('Uploads media to repository', () => {
    mediaActions.insertMedia(media).then(result => {
        expect(result.successful).toBeTruthy();
        expect(result.message).toMatch(Results.SUCCESS);
    });

    mediaActions.retrieveMedia(media.id!).then(result => {
        expect(result.media != null || result.media != undefined);
    });
});

let error: string = 'This is a test';

test('Fails to upload media to repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'insert');
    mock.mockImplementation(() => { throw error });
   
    mediaActions.insertMedia(media).then(result => {
        expect(result.successful).toBeFalsy();
        expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
    });
});

test('Retrieve media from repository', () => {
    mediaActions.insertMedia(media);

    mediaActions.retrieveMedia(media.id!).then(result => {
        expect(result.successful).toBeTruthy();
        expect(result.message).toMatch(Results.SUCCESS);
        expect(result.media != null || result.media != undefined).toBeTruthy();
    });
});

test('Fails to retrieve media from repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'retrieve');
    mock.mockImplementation(() => { throw error });

    mediaActions.insertMedia(media);

    mediaActions.retrieveMedia(media.id!).then(result => {
        expect(result.successful).toBeFalsy();
        expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
        expect(result.media == null || result.media == undefined).toBeTruthy();
    });
});

test('Retrieve comes back empty', () => {
    mediaActions.retrieveMedia(media.id!).then(result => {
        expect(result.media).toBeUndefined();
        expect(result.successful).toBeFalsy();
        expect(result.message).toEqual(`${Results.FAILURE}: Media not found`);
    });
})

test('RetrieveAll returns all media', () => {
    mediaActions.insertMedia(media);

    mediaActions.retrieveAll().then(result => {
        expect(result.mediaList).toContain(media);
        expect(result.successful).toBeTruthy();
        expect(result.message).toMatch(Results.SUCCESS);
    });
});

test('Fails to retrieve all media', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'retrieveAll');
    mock.mockImplementation(() => { throw error });

    mediaActions.insertMedia(media);

    mediaActions.retrieveAll().then(result => {
        expect(result.successful).toBeFalsy();
        expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
    });
});

test('Deletes media refernce in database', () => {
    mediaActions.insertMedia(media);

    mediaActions.removeMedia(media.id!)
   
    mediaActions.retrieveAll().then(results => {
        expect(results.mediaList?.includes(media)).toBeFalsy();
    });
})