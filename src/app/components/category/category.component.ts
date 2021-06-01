import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title = "List of Category";
  categories: Category[] = [];
  currentCategory: Category;
  dataLoaded = false;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }

  cleanCurrentCategory(){
    this.currentCategory = {categoryID:-1, categoryName:"bla"};
  }

  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return "list-group-item active"
    }
    else {
      return "list-group-item"
    }
  }

  getAllCategoryClass() {
    if (!this.currentCategory || this.currentCategory=={categoryID:-1, categoryName:"bla"}) return "list-group-item active"
    else return "list-group-item"
  }
}
