



export interface eventData {
 
  id?:number|null,
  name: string,
  description: string,
  alt: string,
  slug: string,
  summary:string,
  status:string,

  seo:{
    title: string,
    author: string,
  
    description: string,
    keyword: string,
    og_image: string,
  },


image: string,

location: string,
start_date: string,

end_date: string,
  
}

