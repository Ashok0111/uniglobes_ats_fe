import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

import {
    ApexChart,
    ApexAxisChartSeries,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexTooltip,
    ApexLegend,
    ApexGrid,
    ApexXAxis,
    NgApexchartsModule
} from "ng-apexcharts";
import { shareService } from '../../../../services/share.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
    colors: string[];
    tooltip: ApexTooltip;
    legend: ApexLegend;
};

@Component({
    selector: 'app-revenue-growth:not(p)',
    standalone: true,
    imports: [NgApexchartsModule, RouterLink],
    templateUrl: './revenue-growth.component.html',
    styleUrl: './revenue-growth.component.scss'
})
export class RevenueGrowthComponent {

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    TotalLeads:number=0;
    leadsCount: any;
    constructor(
        public themeService: CustomizerSettingsService,
        public dataService:shareService,
    ) {

    }
    ngOnInit(): void {
        this.dataService.newLeadsAllOB.subscribe(
                (res:any) => {
                    this.TotalLeads=res
                });
            }
    // isToggled
    isToggled = false;

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
