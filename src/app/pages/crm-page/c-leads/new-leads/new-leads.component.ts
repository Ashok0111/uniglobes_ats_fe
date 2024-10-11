import { Component, ViewChild } from '@angular/core';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexYAxis,
    ApexLegend,
    NgApexchartsModule,
    ApexGrid
} from "ng-apexcharts";

import { series } from "./data";
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { shareService } from '../../../../services/share.service';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    yaxis: ApexYAxis;
    labels: string[];
    colors: string[];
    legend: ApexLegend;
};

@Component({
    selector: 'app-new-leads',
    standalone: true,
    imports: [NgApexchartsModule, RouterLink,CommonModule],
    templateUrl: './new-leads.component.html',
    styleUrl: './new-leads.component.scss'
})
export class NewLeadsComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    series:any;
    leadsCount:any=0;
    leadsTrends:any=0;

    constructor(
        public themeService: CustomizerSettingsService,
        public dataService:shareService,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });


    }
     sumArray(arr:any) {
        return arr.reduce((accumulator:any, currentValue:any) => accumulator + currentValue, 0);
    }
     calculateTrendingPercentage(data:any) {
        const leads = data;
        // Get the most recent week leads and the previous week leads
        const currentWeekLeads = leads[0]; // Most recent week's leads
        const previousWeekLeads = leads[1]; // Previous week's leads

        // Calculate the trending percentage
        let trendingPercentage = 0;

        if (previousWeekLeads !== 0) {
            trendingPercentage = ((currentWeekLeads - previousWeekLeads) / previousWeekLeads) * 100;
        } else if (currentWeekLeads !== 0) {
            trendingPercentage = 100; // If previous week had 0 leads and current week has leads, it's a 100% increase
        }
        if(isNaN(trendingPercentage))
            return "0 %"
        return trendingPercentage.toFixed(2) + "%";
    }
    ngOnInit(): void {
        this.series={}
        this.dataService.currentQuote.subscribe(
                res => {
                    this.leadsCount=this.sumArray(res.leads);
                   this.leadsTrends=this.calculateTrendingPercentage(res.leads)

                    this.series = res;
                    this.chartOptions = {
                        series: [
                            {
                                name: "New Leads",
                                data: this.series.leads
                            }
                        ],
                        chart: {
                            type: "area",
                            height: 100,
                            zoom: {
                                enabled: false
                            },
                            toolbar: {
                                show: false
                            }
                        },
                        colors: [
                            "#ffb264"
                        ],
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: "smooth",
                            width: 2
                        },
                        labels: this.series.dates,
                        xaxis: {
                            type: "datetime",
                            axisBorder: {
                                show: false,
                                color: '#e0e0e0'
                            },
                            axisTicks: {
                                show: false,
                                color: '#e0e0e0'
                            },
                            labels: {
                                show: false,
                                style: {
                                    colors: "#919aa3",
                                    fontSize: "14px"
                                }
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        yaxis: {
                            labels: {
                                show: false,
                                style: {
                                    colors: "#919aa3",
                                    fontSize: "14px"
                                }
                            }
                        },
                        legend: {
                            show: false
                        },
                        grid: {
                            show: false,
                            strokeDashArray: 5,
                            borderColor: "#e0e0e0"
                        }
                    };
                    this.themeService.isToggled$.subscribe(isToggled => {
                        this.isToggled = isToggled;
                    });

                }
                );
      }

    // isToggled
    isToggled = false;

}
