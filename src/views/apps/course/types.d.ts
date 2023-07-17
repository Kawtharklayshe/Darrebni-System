



export interface courseData {
 
  id?:number|null,
  name: string,
  description: string,
  price:number|null,
  prerequisites: string,
  slug: string,
  summary:string,
  objectives:string,
  audience:string,
  status:string,
  languages:Array,
  first_image_alt:string,
  alt:string,
  version:number|null,
level_id:number|null,
number_hour: number|null,
first_image: string,
image: string,
video:string,
small_text?: string,
file: string,
youtube_url:string,
seo:{
  title: string,
  author: string,

  description: string,
  keyword: string,
  og_image: string,
},
course_category_id: number|null,

company_category_id: number|null,


  
}

