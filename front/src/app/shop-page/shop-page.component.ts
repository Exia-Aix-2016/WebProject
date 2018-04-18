import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShopService } from '../shop.service';
import { ICategory } from '../../../../common/interface';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  $categories: Observable<ICategory[]>;
  selectedCategory = 'all';
  sortBy = 'name';
  sort: 'ASC' | 'DSC' = 'ASC';

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.$categories = this.shopService.getCategories();
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  setSortBy(sortBy: string) {
    this.sortBy = sortBy;
  }

  setSort(sort: 'ASC' | 'DSC') {
    this.sort = sort;
  }
}
