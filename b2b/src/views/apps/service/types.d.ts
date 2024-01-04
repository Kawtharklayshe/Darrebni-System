import type { Invoice, PaymentDetails } from '@/@fake-db/types'


export interface PurchasedProduct {
  title: string
  cost: number
  hours: number
  description: string
}

export interface ServiceData {

  id?:number,
  name: string,
  summary: string,
  icon: string,
  slug: string,
  btn: string,
  alt: string,
  image: string,
  description: string,

}

// export interface InvoiceParams {
//   q?: string,
//   status?: string,
//   perPage: number,
//   currentPage: number,
//   startDate?: string,
//   endDate?: string,
// }
export interface InvoiceParams {
  search_text?: string,
  page_size: number,
  current_page: number,
  clint:boolean,
  company_detail:boolean,
  employee:boolean,
  faqs:boolean,
  news:boolean,
  service:boolean,
  work:boolean,

  
}
export interface LanguagesItemType{
  id:number,
  name:string
  }
  export interface langData{
    icon:string,
    name:string
    }
