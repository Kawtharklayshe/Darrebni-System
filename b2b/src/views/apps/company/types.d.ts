export interface companyData {
  id?: number;
  name: string;
  icon: string;
  description: string;
  slug: string;
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
