export interface categoriesData {
  id?: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  seo:{
    title: string,
    author: string,
  
    description: string,
    keyword: string,
    og_image: string,
  },
}
