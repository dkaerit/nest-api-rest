export abstract class BaseController {
    protected constructor(private readonly endpoints: Record<string, Function[]>) {}
  
    protected registerEndpoints(prefix: string, controller: any) {
      Object.entries(this.endpoints).forEach(([key, value]) => {
        const path = `${prefix}/${key}`;
        controller.get(`${path}`, this.createHandler(`${path}`, ...value));
      });
    }
  
    private createHandler(path: string, ...functions: Function[]) {
      return async (req, res, next) => {
        try {
          for (const func of functions) {
            await func(req, res, next);
          }
        } catch (err) {
          next(err);
        }
      };
    }
}

export function Endpoints(endpoints: Record<string, string[]>) {
return (target: any) => {
    return class extends target {
    constructor(...args: any[]) {
        super(...args);
        this.registerEndpoints('api', this);
    }
    };
};
}