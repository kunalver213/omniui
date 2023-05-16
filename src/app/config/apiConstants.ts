import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' 
})
export class ApiConstants {
  
  public readonly LOGIN: string = '/login';
  public readonly GET_ENTITYID: string = '/get_entityid';
  public readonly DOWNLOAD_REPORT: string = '/download_report';
  public readonly HOME_TRANS_STATS: string = '/home_trans_stats';
  public readonly HOME_TRANS_LATEST: string = '/home_trans_latest'
  public readonly HOME_RESP_TYPE: string ='/home_resp_type'
  public readonly HOME_CARD_BRAND_TYPE: string ='/home_card_brand_type'
  public readonly HOME_TRAN_TYPE: string ='/home_tran_type'
  public readonly HOME_RESP_CODE: string ='/home_resp_code'
  public readonly GET_MERCHANT_DETAIL: string ='/get_merchant_detail'
  public readonly GET_TERMINAL_DETAIL: string ='/get_terminal_detail'
  public readonly TRAN_HISTORY: string ='/tran_history'
  public readonly TRAN_HISTORY_TABLE: string ='/tran_history_table'
  public readonly GET_USER: string ='/getUser'
  public readonly UPDATE_USER: string ='/update_user'
  public readonly SIGNUP_MERCH_CHECK: string ='/signup_merch_check'
  public readonly SIGNUP: string ='/signup'
  public readonly GET_ADMIN_ALL_MERCHANT_STATS: string ='/get_admin_all_merchant_stats'
  public readonly GET_ADMIN_GRAPHS_TRAN_BY_APROV_DECL: string ='/get_admin_graphs_tran_by_aprov_decl'
  public readonly GET_ADMIN_GRAPHS_TRAN_TYPE: string ='/get_admin_graphs_tran_type'
  public readonly GET_ADMIN_GRAPHS_RESP_CODE: string ='/get_admin_graphs_resp_code'
  public readonly GET_ADMIN_GRAPHS_CARD_BRAND: string ='/get_admin_graphs_card_brand'
  public readonly GET_ADMIN_GRAPHS_TRAN_BY_MODE: string ='/get_admin_graphs_tran_by_mode'
  public readonly GET_ADMIN_GRAPHS_TRAN_STATUS: string ='/get_admin_graphs_tran_status'
  public readonly GET_ADMIN_MERCHANT_DETAIL: string ='/get_admin_merchant_detail'
  public readonly GET_ADMIN_MERCHANT_LIST: string ='/get_admin_merchant_list'
  public readonly GET_ADMIN_TRAN_DETAIL: string ='/get_admin_tran_detail'

}