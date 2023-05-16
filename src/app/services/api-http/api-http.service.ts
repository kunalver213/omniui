import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private http: HttpClient) { }

  public get(url: string, options?: any) {
    return this.http.get(environment.domain + url, options);
  }
  public post(url: string, data: any, options?: any) {
    return this.http.post(environment.domain + url, data, options);
  }
  public put(url: string, data: any, options?: any) {
    return this.http.put(environment.domain + url, data, options);
  }
  public delete(url: string, options?: any) {
    return this.http.delete(environment.domain + url, options);
  }
  
}
