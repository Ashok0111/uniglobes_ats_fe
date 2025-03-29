import { Component, Input, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { RouterLink } from "@angular/router";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexYAxis,
    ApexTooltip,
    ApexTitleSubtitle,
    ApexXAxis,
    NgApexchartsModule,
    ApexLegend,
    ApexGrid,
    ApexPlotOptions,
    ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    title: ApexTitleSubtitle;
    labels: string[];
    stroke: ApexStroke;
    fill: ApexFill;
    plotOptions: ApexPlotOptions;
    grid: ApexGrid;
    tooltip: ApexTooltip;
    colors: string[];
    legend: ApexLegend;
};

@Component({
    selector: 'app-earning-reports',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NgApexchartsModule],
    templateUrl: './earning-reports.component.html',
    styleUrl: './earning-reports.component.scss'
})
export class EarningReportsComponent implements OnChanges {

    @ViewChild("chart") chart: ChartComponent;
    @Input() leads_by_yearwise: any;
    public chartOptions: Partial<ChartOptions>;
    months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    constructor() {
        this.chartOptions = this.getChartOptions([]);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['leads_by_yearwise'] && this.leads_by_yearwise) {
            this.updateChart();
        }
    }

    updateChart() {
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        
        const leadCounts = months.map(month => this.leads_by_yearwise[month] || 0);

        this.chartOptions = this.getChartOptions(leadCounts);
    }

    getChartOptions(data: number[]): Partial<ChartOptions> {
        return {
            series: [
                {
                    name: "Leads",
                    type: "column",
                    data: data
                }
            ],
            chart: {
                height: 224,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            colors: ["#5271f2"],
            stroke: {
                width: [2],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: "45%"
                }
            },
            legend: {
                show: false,
                fontSize: '14px',
                labels: {
                    colors: "#919aa3"
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                }
            },
            xaxis: {
                categories: this.months.map(m => m.slice(0, 3)), // "Jan", "Feb", etc.
                axisBorder: {
                    show: false,
                    color: '#e0e0e0'
                },
                axisTicks: {
                    show: false,
                    color: '#e0e0e0'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                labels: {
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                }
            },
            grid: {
                strokeDashArray: 5,
                borderColor: "#e0e0e0"
            }
        };
    }
}
