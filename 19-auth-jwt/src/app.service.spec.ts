import { Test } from '@nestjs/testing'
import { AppService } from './app.service';
import { JsLogger } from './js-logger/js-logger.service';


const mockService = () => ({
    getHello: jest.fn(),
});

const mockLogger = () => ({
    log: jest.fn(),
});

describe('AppController', () => {
    let appService;
    let jsLogger;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {provide: AppService, useFactory: mockService},
                {provide: JsLogger, useFactory: mockLogger},
            ]
        }).compile();
        appService = await module.get<AppService>(AppService);
        jsLogger = await module.get<JsLogger>(JsLogger);
    });

    it('confirm AppService is defined', async() => {
        jsLogger.log.mockResolvedValue('log output');
        appService.getHello.mockResolvedValue('Hello World!!');

        expect(AppService).toBeDefined();
        const response = await appService.getHello();
        const logger = jsLogger.log();
        expect(jsLogger.log).toBeCalled();
        expect(response).toEqual('Hello World!!');

    })
});