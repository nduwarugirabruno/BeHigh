import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule],
})
export class AppComponent implements OnInit {

	public environmentInjector = inject(EnvironmentInjector);
	
	constructor() {}

	ngOnInit(): void {
	}

}
