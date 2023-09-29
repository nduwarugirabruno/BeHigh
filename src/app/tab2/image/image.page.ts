import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IFile } from 'src/app/model/file';
import { IScenario } from 'src/app/model/scenario';

@Component({
    selector: 'app-image',
    templateUrl: './image.page.html',
    styleUrls: ['./image.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ImagePage implements OnInit {

    @Input() nScript!: number;
    @Input() scenario!: IScenario;

    @Output() newScenarioEvent = new EventEmitter<IScenario>();

    form! : FormGroup;

    imgFiles!: IFile[];

    ngOnInit(): void {
        this.load();
        this.read();

    }

    //On verifie que chaque champ soit remplir
    constructor(private fb : FormBuilder){
        this.form= this.fb.group({
            link:['', Validators.required],
            timing:['00', Validators.required],
            type:['Image', Validators.nullValidator],
        });
    }

    submit() {

        if (this.form.valid) {

            let scenario: IScenario = {
                type: 'Effet',
                timing: Number(this.form.value.timing),
                text: '',
                ffamily: '',
                size: 0,
                fcolor: 'p3',
                bcolor: 'p3',
                animation: '',
                link: this.form.value.link
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
            if ( this.scenario.type == 'Image') {
                this.form.patchValue({
                    link: this.scenario.link,
                    timing: this.scenario.timing.toString().padStart(2, '0')
                })
            }
        }

    }

    range(f: number, l: number): string[] {
        const array: string[] = [];

        for (let i = f; i <= l; i++) {
            array.push(i.toString().padStart(2, '0'))
        }
        return array;
    }

    setFileContent() {
        console.log('video');
        //innerHTML = '<video src="/Videos/'+ document.getElementById('link').value +'" width="100%" height="480" title="'+ document.getElementById('link').value +'" controls autoplay></video>';
    }

    read(): void {

        // fetch('assets/json/images.json')
        fetch('http://192.168.1.117/jsonFiles/images.json')
        // fetch('http://10.1.1.1/jsonFiles/images.json')
            .then(response => response.json())
            .then(data => {
                // use the 'data' variable which contains the parsed JSON data
                this.imgFiles = data;
                console.log("Images: ", this.imgFiles);
            })
            .catch(error => {
                // handle any errors that occur during the fetch request
                console.error(error);
        });

    }

}