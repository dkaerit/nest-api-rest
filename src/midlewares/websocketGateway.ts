import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { createHash } from 'crypto';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Maneja la conexión de un cliente.
  handleConnection() {
    //console.log('Cliente conectado');
  }

  // Maneja la desconexión de un cliente.
  handleDisconnect() {
    //console.log('Cliente desconectado');
  }

  /**
   * Envía una notificación a un cliente específico.
   * #param message Mensaje de la notificación.
   */
  sendNotificationToClient(message: string) {
    this.server.emit('notification', { message });
  }

  /**
   * Envía una notificación a un canal específico.
   * #param channelId ID del canal.
   * #param message Mensaje de la notificación.
   */
  sendNotificationToChannel(channelId: string, message: string) {
    console.log('notification', message)
    this.server.to(channelId).emit('notification', { message });
  }


  /**
   * Genera un ID de canal para notificaciones basado en el usuario principal y sus mutuals.
   * #param mainUserId ID del usuario principal.
   * #param mutualIds Lista de IDs de mutuals.
   * #returns Un ID de canal para notificaciones.
   */
  public generateChannelId(mainUserId: string, mutualIds: string[]): string {
    const allIds = [mainUserId, ...mutualIds].sort().join('_');
    const hash = createHash('md5').update(allIds).digest('hex');  // Aplica MD5 para generar hash
    return `channel_${hash}`;
  }
  
}