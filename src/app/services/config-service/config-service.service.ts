import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfig } from 'src/app/models/IConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static config:IConfig;
  constructor( private http: HttpClient) { }

  static createURL(relativePath: string): string {
    const relP = relativePath.charAt(0) == '\\' || relativePath.charAt(0) == '/'
      ?relativePath.substring(1)
      :relativePath;
    if (ConfigService.config.endPoint.length){
      if (ConfigService.config.endPoint.charAt(ConfigService.config.endPoint.length -1)=='/'){
        return ConfigService.config.endPoint + relP;
      }else{
        return ConfigService.config.endPoint + '/' + relP;
      }
    }else{
      return relP;
    }
  }

  configLoad(): void{
    const fPath='assets/config/config.json';
    this.http.get<IConfig>(fPath).subscribe(
      (data)=>{
        if (data && typeof(data)==='object'){
          ConfigService.config = data;
        }
      }
    );
  }
  loadPromise() {
    const jsonFile = `assets/config/config.json`;
    const configPromise =  new Promise<IConfig>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: any ) => {
        if (response && typeof(response) === 'object') {
          ConfigService.config = response;
          const config = ConfigService.config;
          if (config) {
            // set origin host
            if (config.testRunApp){
              resolve(config);
            }else{
              reject('Запуск приложения запрещен. config: '+JSON.stringify(config));
            }
          } else {
            reject('Ошибка при инициализации конфига - неверный формат '+config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа '+ response);
        }
      }).catch((response: any) => {
        reject(`Ошибка при загрузки файла '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });

    const promiseArr = [configPromise];
    return Promise.all(promiseArr);
  }
}
