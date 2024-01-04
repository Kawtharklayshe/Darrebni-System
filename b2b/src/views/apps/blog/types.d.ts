



export interface blogData {
 
  id?:number|null,
  title: string,
  description: string,
  body: string,
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

blog_category_id: number|null,
  
}

