import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('O16 Lab Assignment')
  .setDescription('Backend Api')
  .setVersion('0.1')
  .addBearerAuth()
  .build();
