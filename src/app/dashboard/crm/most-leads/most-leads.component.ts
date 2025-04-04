import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexChart,
    NgApexchartsModule,
    ApexLegend,
    ApexDataLabels,
    ApexTooltip,
    ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
    series: { name: string; data: number[] }[];  // <-- Update this
    chart: ApexChart;
    labels?: any;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    colors: string[];
    tooltip: ApexTooltip;
    legend: ApexLegend;
    yaxis:any;
    xaxis?:any
    plotOptions?: any;  // <-- Add plotOptions for bar chart settings
};

@Component({
    selector: 'app-most-leads',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NgApexchartsModule],
    templateUrl: './most-leads.component.html',
    styleUrl: './most-leads.component.scss'
})
export class MostLeadsComponent implements OnChanges {

    @ViewChild("chart") chart: ChartComponent;
    @Input() leads_by_agent: any = [];

    public chartOptions: Partial<ChartOptions>;

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.chartOptions = {
            series: [
                {
                  name: "",
                  data: [1] // Ensure this is not undefined
                }
              ],
              chart: {
                type: "bar", // Ensure this is defined
                height: 350
              },
              xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr"]
              }
        };
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['leads_by_agent'] && this.leads_by_agent?.length > 0) {
            this.updateChart();
        }
    }

    private updateChart() {
        const chartData = this.leads_by_agent.map((agent: any) => ({
            x: agent.agent_name,  // Assigning agent names to x
            y: agent.lead_count   // Assigning lead counts to y
        }));


        this.chartOptions = {
            ...this.chartOptions,
            series: [{
                name: "Leads",
                data: chartData  // 🔥 Assign data as an array of {x, y} objects
            }],
            chart: {
                type: "bar",
                height: 250
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "45%",
                    distributed: true // Ensures correct category mapping
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: "category",
                labels: {
                    rotate: -45,
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: "Lead Count"
                }
            },
            colors: ["#00cae3", "#0e7aee", "#796df6", "#ffb264", "#f44336"],
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " Leads";
                    }
                }
            }
        };

        // 🔄 Ensure the chart updates dynamically
        setTimeout(() => {
            this.chart?.updateOptions(this.chartOptions, true, true);
        }, 0);
    }



}
