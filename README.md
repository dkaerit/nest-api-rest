<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.imgur.com/RKjS6ne.png" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
<img src="https://img.shields.io/github/commit-activity/y/dkaerit/nest-api-rest?color=17a8c8">
<img src="https://img.shields.io/github/downloads/dkaerit/nest-api-rest/total?color=17a8c8">
<img src="https://img.shields.io/badge/license-MIT-17a8c8" alt="License">
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications. 

Este microservice baseplate pretende hacer de estructura de partida para apis rest (como en los boilerplate) para ahorrar código repetitivo y esencial en la implementación de un backend, además de estar pensdo para proyectos de uso didácticos o personales. Incluye una conexión a un base de datos de Mongo Atlas, y servicio de autenticación por jwt.

## Tabla de contenidos
1. [ Instalación y ejecución. ](#exec)
2. [ Modules. ](#services)
    1. [ RootModule. ](#root)
    2. [ UserModule. ](#user)
    3. [ AuthModule. ](#auth)
4. [ Models. ](#models)
5. [ Tests. ](#tests)
6. [ Support Nest. ](#support)
7. [ Contact. ](#contact)

<a name="exec"></a>
## 1. Instalación y ejecución

Como requisito previo para levantar la imagen de producción es necesario tener instalado `docker` y `docker compose` en el servidor donde se ha decidido clonar el repositorio. Como alternativa se ofrece la posibilidad de instalar las dependencias de node en el propio directorio sin montar ningún contenedor, aunque es más recomendable la primera opción. 

Para que funcione la consexión a su base de datos de mongo atlas, se debe crear un fichero `.env` en la raíz y definir las variables de entorno para `USERNAME`, `PASSWORD` por las correspondientes credenciales que tengan permisos para el acceso a su base de datos, así como actulizar la parte del `url` de la cadena de conexión ubicada en el fichero `/src/database/mongo/mongo.module.ts`

Comandos para arrancar el servicio:

```bash
$ npm install
$ npm run start # development
$ npm run start:dev # watch mode
$ npm run start:prod # production mode
$ npm run image # levantar contenedor de prod en docker
```

<a name="modules"></a>
## 2. Modules
<a name="root"></a>
### 2.1. RootModule

![a drawio (1)](https://user-images.githubusercontent.com/24440929/206227124-8f314f1c-6d85-419c-9893-a9564514c8c8.png)


Módulo principal de la api donde se unen el resto de módulos para ser importados en conjuntos en la función `bootstrap()`, que se encuentra en el fichero principal `main.ts`. Con la ayuda de la clase core NestFactory que nos proporciona `nestjs` se crea la instancia de la app, a la que luego se le ordena la escucha del puerto designado.

En este punto se conecta la conexión a la base de datos establecida por `MongooseModule.forRoot(...)` y exportado como `MongoModule`. Además, como el resto de módulos, tiene incluido el servicio correspondiente, en este caso, con una única función que devuelve un json con la descripción de la api y su versión que será invocada tras una petición GET a la ruta principal `/`

```typescript
public async appInfo() {
    return {
      "name": "API Rest Full", 
      "framework": "Nestjs",
      "version": "8.0.0"
    };
  }
```
<a name="user"></a>
### 2.2. UserModule
```typescript
(en proceso)
```
<a name="auth"></a>
### 2.3. AuthModule
```typescript
(en proceso)
```

<a name="models"></a>
## 3. Models
### Usuarios
```typescript
@Schema({ versionKey: '_vk' }) 
export class User { 
  @Prop({unique:true}) user: string;
  @Prop({unique:true}) email: string;
  @Prop() passwd: string;
}
```

## 4. Tests

```bash
$ npm run test # unit tests
$ npm run test:e2e # e2e tests
$ npm run test:cov # test coverage
```

## 5. Support Nest

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 6. Contact

- Author - [Diego Vázquez Campos](https://twitter.com/dkaerit)
- Twitter - [@dkaerit](https://twitter.com/dkaerit)

## 6. License

Nest is [MIT licensed](LICENSE).
