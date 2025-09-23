export interface Category {
  id: number;
  name: string;
  icon: string;
  imgPath: string;
}

export class CategoryService {
  private static categoryUrl = "/categories.json";

  private static async fetchCategories(): Promise<Category[]> {
    const response = await fetch(this.categoryUrl);
    const data: Category[] = await response.json();
    return data;
  }

  public static async getCategories(): Promise<Category[]> {
    return await this.fetchCategories();
  }

  public static async getCategoryNameById(
    id: number,
  ): Promise<string | undefined> {
    const categories = await this.fetchCategories();
    const category = categories.find((cat) => cat.id === id);
    return category?.name;
  }
}
