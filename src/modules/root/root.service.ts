import { Injectable } from '@nestjs/common';


@Injectable()
export class RootService {
  public async appInfo(router:any) {
    const availableRoutes = router.stack.reduce((acc, layer) => {
      if (layer.route && !layer.route.path.startsWith('/api')) {
        const path = layer.route.path;
        const method = layer.route.stack[0].method;
        const pathParts = path.split("/");
        const pathKey = pathParts[1] === '' ? 'root' : pathParts[1];
        const pathObj = {[path]: method};
        const pathSubObj = {...(acc[pathKey] || {}), ...pathObj};
        return {...acc, [pathKey]: pathSubObj};
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

