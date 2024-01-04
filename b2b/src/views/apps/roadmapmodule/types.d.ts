



interface StageData{
  image: string,
  name: string,
  description: string,
  alt?: string,
  order:string,
  detail:string 
}
export interface roadmapData {
 
  id?:number|null,
  name: string,
  description: string,
  status: string,
  detail: string,
  type: string,
  slug: string,
  alt_cover?: string,
  cover?: string,
  alt?: string,
image: string,
seo:{
  title: string,
  author: string,

  description: string,
  keyword: string,
  og_image: string,
},
stages:Array<StageData>,

category_id: number|null,
  
}

