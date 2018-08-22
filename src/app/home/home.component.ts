import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// tslint:disable-next-line:import-blacklist
import { map } from 'rxjs/operators' ;
import { Observer } from 'rxjs';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = interval(1000).pipe(map(
      (data: number) => {
        return data * 2;
      })
    );
    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
       // observer.error('DOESNT WORK BITCH');
       observer.complete();
      }, 5000);
    });
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data); },
        (error: string) => {
          console.log(error); },
          () => { console.log('completed'); }
        );
        }
        // tslint:disable-next-line:use-life-cycle-interface
        ngOnDestroy() {
          this.numbersObsSubscription.unsubscribe();
          this.customObsSubscription.unsubscribe();
        }
      }

