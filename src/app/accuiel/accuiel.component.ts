import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accuiel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accuiel.component.html',
  styleUrl: './accuiel.component.css'
})
export class AccuielComponent {
  cars: any[] = [

    { name: 'Car 1', description: 'Description 1', image: 'path/to/image1.jpg' },

    { name: 'Car 2', description: 'Description 2', image: 'path/to/image2.jpg' },

    { name: 'Car 3', description: 'Description 3', image: 'path/to/image3.jpg' }

  ];

}
