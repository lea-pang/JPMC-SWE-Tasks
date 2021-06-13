import { ServerRespond } from './DataStreamer';

export interface Row {
      abc_price:number,
      def_price:number,
      ratio:number,
      timestamp:Date;
      upper:number,
      lower:number,
      trigger_alert:number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // Generates the row attributes of ABC/DEF price, ratio between the two, upper/lower bounds, and timestamp
      const abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
      const def =  (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
      const abc_def_ratio = abc / def;
      const upper_bound = 1 + 0.1;
      const lower_bound = 1 - 0.1;
      return{
        abc_price: abc,
        def_price: def,
        ratio:abc_def_ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper: upper_bound, 
        lower: lower_bound,
        trigger_alert: (abc_def_ratio>upper_bound || abc_def_ratio < lower_bound) ? abc_def_ratio : undefined,
      }; 
  }
}
