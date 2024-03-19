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
export class ChartComponent implements OnChanges {
  @Input() expenses: Expense[] = [];
  chart: any = [];

  categories: any = {};
  categoriesCount: any = {};

  chartLabels:string[] = [];

  constructor(private categoryService: CategoryService) { 
    this.categoryService.getCategories().subscribe(response => {
      for (let cat of response){
        this.categories[cat.c_id + ""] = cat.c_name;
        this.chartLabels.push(cat.c_name);
      }
      this.drawChart();
    });
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

    const chartData = [];

    for (const categoryName in this.categoriesCount) {
      chartData.push(this.categoriesCount[categoryName]);
    }

    if (Object.keys(this.chart).length !== 0)
      this.chart.destroy();

    this.chart = new Chart('pie_chart', {
      type: 'pie',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Expense Category',
          data: chartData 
        }],
      }
    });
  }

}
