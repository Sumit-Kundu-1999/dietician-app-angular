import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-home',
  imports: [NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  instructorName = 'Dr. First Name';
  instructorTitle = 'Certified Nutritionist & Wellness Coach';
  instructorBio = `Dr. Sharma brings over 10 years of experience in clinical nutrition and personalized wellness planning. 
                           Her approach focuses on sustainable lifestyle changes, integrating diet, fitness, and mental well-being 
                           to achieve optimal health outcomes.`;
  
  // Dynamic Image Array for Carousel (using placeholder links)
  // NOTE: Replace these placeholder links with actual image URLs from the internet.
  carouselImages: { url: string, alt: string, caption: string }[] = [
    { 
      url: 'https://media.istockphoto.com/id/459984405/vector/man-meditates-on-beautiful-mountain-dusk.jpg?s=612x612&w=0&k=20&c=2O7zDCJkZAyd_K3Qkpo17sGKEJGim3rT6gSEgAH-HmI=', 
      alt: 'Yoga session during sunrise', 
      caption: 'Find Your Balance: Yoga and Meditation' 
    },
    { 
      url: 'https://png.pngtree.com/thumb_back/fh260/background/20230611/pngtree-salad-with-vegetables-in-a-black-bowl-image_2962609.jpg', 
      alt: 'Healthy bowl of salad', 
      caption: 'Nourish Your Body: Clean Eating Guides' 
    },
    { 
      url: 'https://images.squarespace-cdn.com/content/v1/5e70c080d6753b7daf442f68/a9cb71bf-e137-47aa-bff4-4f69b3605682/Adaptable+female+personal+trainer+adjusting+workout+for+client', 
      alt: 'Personal training session', 
      caption: 'Achieve Your Goals: Personalized Training Plans' 
    }
  ];
  isOpenModel = false;

  openModel() {
    this.isOpenModel = true
  }

  closeModal() {
    this.isOpenModel = false;
  }
}
