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
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: any;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    colors: string[];
    tooltip: ApexTooltip;
    legend: ApexLegend;
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
            series: [],
            chart: {
                width: 430,
                type: "pie"
            },
            stroke: {
                width: 2,
                show: true
            },
            labels: [],
            legend: {
                show: true,  // Enable legend
                position: "right",  // Move it to the right
                horizontalAlign: "center", // Align center
                fontSize: '14px',
                markers: {
                    width: 12,
                    height: 12,
                    radius: 4
                },
                itemMargin: {
                    vertical: 5
                }
            },
            dataLabels: {
                enabled: false,
                style: {
                    fontSize: '14px'
                },
                dropShadow: {
                    enabled: false
                }
            },
            colors: [
                "#00cae3", "#0e7aee", "#796df6", "#ffb264", "#f44336"
            ],
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + " Leads";
                    }
                }
            }
        };
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['leads_by_agent'] && this.leads_by_agent.length > 0) {
            this.updateChart();
        }
    }

    private updateChart() {
        const agentNames = this.leads_by_agent.map((agent: any) => agent.agent_name);
        const leadCounts = this.leads_by_agent.map((agent: any) => agent.lead_count);

        this.chartOptions = {
            ...this.chartOptions,
            labels: agentNames,
            series: leadCounts
        };
    }

}
