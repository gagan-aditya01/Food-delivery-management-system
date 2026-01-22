import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MenuItem } from "../../shared/models/menu-item.model";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  private readonly dataUrl = "assets/mock-data/menu-items.json";

  constructor(private readonly http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.dataUrl);
  }
}
