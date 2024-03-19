import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { CategoryService } from '../../services/category.service';
import { Expense } from '../../Expense';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnChanges, OnInit {
  @Input() expenses: Expense[] = [];
  chart: any = [];

  categories: any = {};
  categoriesCount: any = {};

  constructor(private categoryService: CategoryService) { 
    this.categoryService.getCategories().subscribe(response => {
      for (let cat of response)
        this.categories[cat.c_id + ""] = cat.c_name;
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expenses.length !== 0) {
      for (const key in this.categories)
        this.categoriesCount[this.categories[key]] = 0;
      this.drawChart();
    }
  }

  drawChart() {
    for (const exp of this.expenses) {
      for (const cId of exp.itemCategory) {
        const categoryName = this.categories[cId];
        this.categoriesCount[categoryName]++;
      }
    }

    const chartLabels = [];
    const chartData = [];

    for (const categoryName in this.categoriesCount) {
      chartLabels.push(categoryName);
      chartData.push(this.categoriesCount[categoryName]);
    }

    if (Object.keys(this.chart).length !== 0)
      this.chart.destroy();

    this.chart = new Chart('pie_chart', {
      type: 'pie',
      data: {
        labels: chartLabels,   // ["Food", "Milk"],
        datasets: [{
          label: 'Expense Category',
          data: chartData  // [1, 2]
        }],
      }
    });
  }

}
