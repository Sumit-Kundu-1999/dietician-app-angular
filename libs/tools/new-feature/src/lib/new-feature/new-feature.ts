import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'lib-new-feature',
  imports: [],
  templateUrl: './new-feature.html',
  styleUrl: './new-feature.css',
})
export class NewFeature implements OnDestroy, OnInit{
  featureTitle = signal("It's related to your Health");
  featureDescription = signal(
    "Soon, you'll gain the power to reverse daily habits and unlock your full potential. Your journey to self-improvement starts here. Stay tuned"
  );

  private targetDate: Date;
  private intervalId: any;

  countdown = signal({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  constructor() {
    this.targetDate = new Date();
    this.targetDate.setDate(this.targetDate.getDate() + 30);
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.updateCountDown();
    }, 1000);
    this.updateCountDown();
  }

  ngOnDestroy(): void {
      if(this.intervalId)  {
        clearInterval(this.intervalId);
      }
  }

  updateCountDown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(distance > 0) {
      this.countdown.set({
        days,
        hours,
        minutes,
        seconds
      })
    }
    else {
      clearInterval(this.intervalId);
      this.countdown.set({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      })
    }
  }


}
