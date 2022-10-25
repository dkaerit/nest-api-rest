import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { RootService } from './root.service';
import { Response } from 'express';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get() async hello(@Res() res:Response) { 
    return res
    .status(HttpStatus.OK)
    .json({...await this.rootService.appInfo(), "status": HttpStatus.OK });
  }
}
