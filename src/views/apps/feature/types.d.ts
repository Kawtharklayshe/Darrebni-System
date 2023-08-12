

export interface featureData {

  id?:number,
  name: string,
  summary: string,
  icon: string,

  service_id: string,
  alt: string,
  image: string,
  description: string,
  seo:{
    title: string,
    author: string,
  
    description: string,
    keyword: string,
    og_image: string,
  },
}

