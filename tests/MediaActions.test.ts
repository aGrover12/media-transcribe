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

    mediaActions.retrieveMedia(media.id).then(retrievedMediaResult => {
        expect(repository.meidaInformation).toContain(retrievedMediaResult.media);
    });
});

let error: string = 'This is a test';

test('Fails to upload media to repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'Insert');
    mock.mockImplementation(() => { throw error });
   
    mediaActions.insertMedia(media).then(result => {
        expect(result.successful).toBeFalsy();
        expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
    });
});

test('Retrieve media from repository', () => {
    mediaActions.insertMedia(media).then(result => {
        expect(result.successful).toBeTruthy();
        expect(result.message).toMatch(Results.SUCCESS);
    });

    mediaActions.retrieveMedia(media.id).then(retrievedMediaResult => {
        expect(repository.meidaInformation).toContain(retrievedMediaResult.media);
    });
});

test('Fails to retrieve media from repository', () => {
    const mock =  jest.spyOn(StubRepository.prototype, 'Retrieve');
    mock.mockImplementation(() => { throw error });

    mediaActions.retrieveMedia(media.id).then(result => {
        expect(result.successful).toBeFalsy();
        expect(result.message).toMatch(`${Results.FAILURE}: ${error}`);
        expect(repository.meidaInformation.includes(result.media)).toBeFalsy();
    });
});

test('Retrieve comes back empty', () => {
    mediaActions.retrieveMedia(media.id).then(result => {
        expect(result.media).toBeUndefined();
        expect(result.successful).toBeFalsy();
        expect(result.message).toEqual(`${Results.FAILURE}: Media not found`);
    });
})