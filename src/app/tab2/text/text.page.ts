import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IAnim } from 'src/app/model/amin';
import { IFont } from 'src/app/model/font';
import { IScenario } from 'src/app/model/scenario';
import { ScenarioService } from 'src/app/services/scenario/scenario.service';

@Component({
    selector: 'app-text',
    templateUrl: './text.page.html',
    styleUrls: ['./text.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TextPage implements OnInit, OnChanges {

    @Input() nScript!: number;
    @Input() scenario!: IScenario;

    @Output() newScenarioEvent = new EventEmitter<IScenario>();

    fonts: IFont[] = []; anims: IAnim[] = []; 
    rowPositions: {type: string}[] = [{ type: 'top' }, { type: 'center' }, { type: 'bottom' }]
    colPositions: {type: string}[] = [{ type: 'start' }, { type: 'center' }, { type: 'end' }]
    form! : FormGroup;

    ngOnInit(): void {
        this.read();
        this.load();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes) this.load();
    }

    //On verifie que chaque champ soit remplir
    constructor(private fb : FormBuilder, private scenarioService: ScenarioService){
        this.form= this.fb.group({
            text:['', Validators.required],
            ffamily:['', Validators.required],
            size:['12', Validators.required],
            fcolor:['#ff0000', Validators.required],
            bcolor:['#0000ff', Validators.required],
            row:['center', Validators.required],
            col:['center', Validators.required],
            animation:['', Validators.required],
            timing:['30', Validators.required],
            speed:['01', Validators.required]
        });
    }

    submit() {

        if (this.form.valid) {

            let scenario: IScenario = {
                type: 'Texte',
                timing: Number(this.form.value.timing),
                text: this.form.value.text,
                ffamily: this.form.value.ffamily,
                size: Number(this.form.value.size),
                fcolor: this.form.value.fcolor.replace('#', ''),
                bcolor: this.form.value.bcolor.replace('#', ''),
                row: this.form.value.row,
                col: this.form.value.col,
                animation: this.form.value.animation,
                link: '',
                speed: Number(this.form.value.speed)
            };
            setTimeout(() => {
                this.addScenario(scenario);
            }, 1000);
        }

    }

    addScenario(scenario: IScenario) {
        this.newScenarioEvent.emit(scenario);
    }

    load() {

        if (this.scenario != undefined) {
            if ( this.scenario.type == 'Texte') {
                this.form.patchValue({
                    text: this.scenario.text,
                    ffamily: this.scenario.ffamily,
                    size: this.scenario.size,
                    fcolor: '#'+this.scenario.fcolor,
                    bcolor: '#'+this.scenario.bcolor,
                    row: this.scenario.row,
                    col: this.scenario.col,
                    animation: this.scenario.animation,
                    timing: this.scenario.timing.toString().padStart(2, '0')
                });
            }
        }
    }

    read(): void {

        this.scenarioService.readFont().subscribe({
			next: data => {
                this.fonts = data;
            },
			error: err => console.log("Error: ", err.error)
		});

        this.scenarioService.readAnim().subscribe({
			next: data => {
                this.anims = data;
            },
			error: err => console.log("Error: ", err.error)
		});

    }

    range(f: number, l: number): string[] {
        const array: string[] = [];

        for (let i = f; i <= l; i++) {
            array.push(i.toString().padStart(2, '0'))
        }
        return array;
    }

}
