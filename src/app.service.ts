import { Injectable } from '@nestjs/common';
import * as geolib from 'geolib';
@Injectable()
export class AppService {
  getHello() {
    let dis =geolib.getDistance(
      { latitude: 24.914445724212936, longitude: 67.03067846714754 },
      { latitude: 24.92460953811233, longitude: 67.0304526303256 },0.01
  );
  dis=dis/1000
    console.log({dis});
    return 'Hello World!';
  }
}
