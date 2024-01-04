export interface settingData {
  id?: number | null;
  title: string;
  date: string;

  body: string;
  type: string;
  seo:{
    title: string,
    author: string,
  
    description: string,
    keyword: string,
    og_image: string,
  },

}
