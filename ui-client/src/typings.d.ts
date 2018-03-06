/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}


declare var jquery: any;

interface $ {
  tooltip(options?: any): any;
}
