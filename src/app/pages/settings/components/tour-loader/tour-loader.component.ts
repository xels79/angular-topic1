import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventType } from '@angular/router';
import { IBTour } from 'src/app/models/ITour';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl<string>( '', {validators: Validators.required} ),
      description: new FormControl<string>( '', {validators: [Validators.required, Validators.minLength(20)]} ),
      tourOperator: new FormControl<string>( '' ),
      price: new FormControl<string>( '' ),
      img: new FormControl()
    });
  }

  get name():FormControl{
    return this.tourForm.get('name') as FormControl;
  }

  get description():FormControl{
    return this.tourForm.get('description') as FormControl;
  }

  selectFile(event: Event): void {
    const el = event.currentTarget as HTMLInputElement;
    const fileList: FileList = el.files;
    console.log(fileList);
    if (fileList.length){
      this.tourForm.patchValue({
        img: fileList[0]
      });
    }
  }

  submit(){
    const rawData = this.tourForm.getRawValue();
    const formData = new FormData();
    if (typeof(rawData) === 'object'){
      for (let key in rawData){
        formData.append( key, rawData[key] );
        console.log( key, rawData[key] );
      }
    }
  }
}
