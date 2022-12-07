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

Este microservice baseplate pretende hacer de estructura de partida para apis rest (como en los boilerplate) para ahorrar código repetitivo y esencial en la implementación de un backend, además de estar pensdo para proyectos de uso didácticos o personales.

## Tabla de contenidos
1. [ Instalación y ejecución. ](#exec)
2. [ Services. ](#services)
    1. [ UserService. ](#services)
    2. [ RootService. ](#services)
    3. [ AuthService. ](#services)
4. [ Models. ](#services)
5. [ Tests. ](#services)
6. [ Support Nest. ](#services)
7. [ Stay in touch. ](#services)

<a name="exec"></a>
## 1. Instalación y ejecución
```bash
$ npm install
$ npm run start # development
$ npm run start:dev # watch mode
$ npm run start:prod # production mode
$ npm run image # levantar contenedor de prod en docker
```

<a name="services"></a>
## 2. Services
### 2.1. UserService
```typescript
(en proceso)
```
### 2.2. RootService
```typescript
(en proceso)
```
### 2.3. AuthService
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

## 6. Stay in touch

- Author - [Diego Vázquez Campos](https://twitter.com/dkaerit)
- Twitter - [@dkaerit](https://twitter.com/dkaerit)

## 6. License

Nest is [MIT licensed](LICENSE).
