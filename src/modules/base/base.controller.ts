import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { BaseService } from './base.service';
import { Response } from 'express';
import { Req } from '@nestjs/common';
import { Request, Router } from 'express';

/**
 * Controlador principal que maneja las solicitudes en la ruta raíz ("/").
 * Responde a solicitudes GET y proporciona información de la aplicación.
 */

@Controller()
export class BaseController {
  constructor(private readonly rootService: BaseService) {}

  /**
   * Maneja solicitudes GET en la ruta raíz ("/").
   * Obtiene información de la aplicación y la envía como respuesta JSON con un estado 200 (OK).
   *
   * #param res - Objeto de respuesta Express para enviar la respuesta HTTP.
   * #param req - Objeto de solicitud Express que contiene información sobre la solicitud entrante.
   * #returns - Respuesta JSON con información de la aplicación y estado HTTP 200 (OK).
   */

  @Get("/")
  async baseController(@Res() res:Response, @Req() req:Request) { 
    
    // Obtiene una referencia al enrutador Express a través de la solicitud.
    const router = req.app._router as Router; 

    // Configura la respuesta HTTP con un estado 200 (OK) y envía una respuesta JSON.
    // Se utiliza el servicio rootService para obtener información de la aplicación.
    return res
    .status(HttpStatus.OK)
    .json({...await this.rootService.appInfo(router), "status": HttpStatus.OK });
    
  }
}
