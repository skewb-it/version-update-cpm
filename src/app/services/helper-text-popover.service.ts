import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperTextPopoverService {

  components: any[] = [];
  shouldHelperTextEnable: boolean = true;

  push(ele) {
    this.components.push(ele);
  }

  findIndex(id) {
    const idx = this.components.findIndex((t) => {
      return t.id === id;
    });
    return idx;
  }

  splice(idx) {
    this.components.splice(idx, 1);
  }

  getCompo() {
    return new BehaviorSubject<any[]>(this.components);
  }

}
