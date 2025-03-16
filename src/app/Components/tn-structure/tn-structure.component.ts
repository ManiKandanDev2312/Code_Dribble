import { Component } from '@angular/core';

@Component({
  selector: 'app-tn-structure',
  templateUrl: './tn-structure.component.html',
  styleUrls: ['./tn-structure.component.css']
})
export class TNStructureComponent {

  slideImages = [
    "./assets/sliderImage/image1.jpg",
    "./assets/sliderImage/image2.jpg"
  ]

  slideImage = "./assets/sliderImage/image1.jpg";

  constructor(){
    var index = 0;
    setInterval(()=>{
      if(index ==this.slideImages.length)
        index = 0;
      this.imageChange(index++);
    },3000);
  }

  // this method is used to change the image in the slider
  imageChange(index:any) {
    const imgElement = document.getElementById('slideImages') as HTMLImageElement;
    if (imgElement) {
      imgElement.src = this.slideImages[index];
    }
  }
}
