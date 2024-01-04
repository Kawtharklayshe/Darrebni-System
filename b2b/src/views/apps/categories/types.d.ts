export interface categoriesData {
  id?: number;
  name: string;
  slug: string;
  course_category_id: string;
  course_company_id?: string;
  icon: string;
  description: string;
  image: string,
  alt:string,
  seo:{
    title: string,
    author: string,
  
    description: string,
    keyword: string,
    og_image: string,
  },
}
