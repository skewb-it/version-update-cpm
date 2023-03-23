export class DialogModel {
  visible: boolean;
  baseZIndex: number = 500;
  width: string = '800px'
  minWidth: string = '700px';
  textAlign: string = 'left';
  fontSize: string = '15px';
  maximizable: boolean = false
  minY: number = 100;
  header: string;
  responsive: boolean = true;
  closable: boolean = true;
  data: any;
}
