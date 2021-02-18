import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { combineLatest, concat, Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  constructor() { }

  Dimension = 3;
  LeaderBoard: { Dimension: number, Level: number };  
  XY = 300;
  checkRecord = false;
  source;
  counter: number = 0;
  process: number = 0;
  errorCount: number = 0;

  XYbutton = this.XY / this.Dimension;
  array2: number[] = [];
  ngOnInit(): void {
    this.array2 = Array.from({ length: this.Dimension * this.Dimension }, (_, i) => i + 1);
    
    
  }
  play() {
    this.process = 0;
    this.array2 = [];
    let i = 1;
    if (this.counter != 0) {
      this.source.unsubscribe()
    }
    this.source = timer(1000, 10).pipe().subscribe(x => {
      this.counter = x / 100;
    });
    this.RandomArray();


  }
  check(ar) {
    if (this.counter != 0) {
      if (ar != this.process + 1) {
        this.errorCount = this.errorCount + 1;
      }
      if (ar == this.process + 1) {
        this.process += 1;
      }
      if (this.process == this.Dimension * this.Dimension) {
        this.Win();
      }
    }
  }
  RandomArray(): number[] {
    let i: number;
    for (i = 1; i < this.Dimension * this.Dimension + 1; i++) {
      let number = Math.floor(Math.random() * (this.Dimension * this.Dimension)) + 1;
      while (this.array2.includes(number)) {
        number = Math.floor(Math.random() * (this.Dimension * this.Dimension)) + 1;
      }
      this.array2.push(number);
    }
    return this.array2;
  }
  Change(event: any) {
    if (this.counter != 0) {
      this.source.unsubscribe();
      this.counter = 0;
    }
    this.Dimension = event.target.value;
    this.array2 = Array.from({ length: this.Dimension * this.Dimension }, (_, i) => i + 1);
    this.XYbutton = this.XY / this.Dimension;
  }
  Win()
  {
    
    this.source.unsubscribe();
    let a;
    this.LeaderBoard = {Dimension:this.Dimension,Level:this.counter};
    let LocalItemTag : string= 'Leadership-'+ this.Dimension 
    console.log(this.LeaderBoard)
    if(localStorage.getItem(LocalItemTag) == null)
    {
      localStorage.setItem(LocalItemTag,JSON.stringify(this.LeaderBoard));
    }
    else{
      a= JSON.parse(localStorage.getItem(LocalItemTag))
      if(a.Dimension == this.Dimension && a.Level > this.counter)
      {
        localStorage.setItem(LocalItemTag,JSON.stringify(this.LeaderBoard));
        this.checkRecord=true;
      }
    }
  }


}
