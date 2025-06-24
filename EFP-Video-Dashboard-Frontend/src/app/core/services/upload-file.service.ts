import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUploadReturnInterface} from "../interfaces/FileUploadReturnInterface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = environment.baseApiUrl+'/storage';

  constructor(private httpClient: HttpClient) {
  }

  /* istanbul ignore next */
  upload(formData: FormData | null) {
    return this.httpClient.post<FileUploadReturnInterface>(this.baseUrl + "/upload", formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe();
  }

  /* istanbul ignore next */
  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/files`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  /* istanbul ignore next */
  newUpload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

}
