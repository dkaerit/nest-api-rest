import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { RootService } from './root.service';
import { Response } from 'express';
import { Req } from '@nestjs/common';
import { Request, Router } from 'express';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get("/") async rootController(@Res() res:Response, @Req() req: Request) { 
    const router = req.app._router as Router;
    return res
    .status(HttpStatus.OK)
    .json({...await this.rootService.appInfo(router), "status": HttpStatus.OK });
  }
}
