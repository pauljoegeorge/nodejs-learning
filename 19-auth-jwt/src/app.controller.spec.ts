import { Test } from '@nestjs/testing'
import { AppController } from "./app.controller"
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
    let appController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {provide: AppService, useFactory: mockService},
                {provide: JsLogger, useFactory: mockLogger},
            ]
        }).compile();
        appController = await module.get<AppController>(AppController);
        appService = await module.get<AppService>(AppService);
        jsLogger = await module.get<JsLogger>(JsLogger);
    });


    it('AppController should be defined', () => {
        expect(AppController).toBeDefined();
    });

    it('invoke root request to call Hello', async() => {
        appService.getHello.mockResolvedValue('Hello World!!');
        const response = await appService.getHello();
        expect(appService.getHello).toHaveBeenCalled();
        expect(response).toEqual('Hello World!!');
    })

    it('invoke jsLogger', () => {
        jsLogger.log.mockResolvedValue('log output');
        expect(jsLogger.log).not.toBeCalled();
        const logger = jsLogger.log();
        expect(jsLogger.log).toBeCalled();
    });
})