import { Injectable } from '@nestjs/common';


@Injectable()
export class BaseService {

  /**
   * Obtiene información de la aplicación basada en las rutas disponibles en el enrutador.
   * @param router - Enrutador Express que contiene información sobre las rutas disponibles.
   * @returns Información de la aplicación en formato JSON.
   */

  public async appInfo(router:any) {
    const availableRoutes = router.stack.reduce((acc, layer) => {
      if (layer.route && !layer.route.path.startsWith('/api')) {
        const path = layer.route.path; // Obtiene la ruta de la capa.
        const method = layer.route.stack[0].method; // Obtiene el método HTTP asociado con la ruta.
        const pathParts = path.split("/"); // Divide la ruta en partes separadas por '/'.
        const pathKey = pathParts[1] === '' ? 'base' : pathParts[1]; // Determina la clave de la ruta.
        const pathObj = {[path]: method}; // Crea un objeto que mapea la ruta con su método.
        const pathSubObj = {...(acc[pathKey] || {}), ...pathObj}; // Combina con rutas previas si ya existe la clave.
        return {...acc, [pathKey]: pathSubObj}; // Agrega la ruta al objeto de rutas disponibles.
      }
      return acc;
    }, {});

    return {
      name: 'Werply API Rest Full',
      version: '0.0.1',
      timestamp: availableRoutes
    };
  }
}

