import { Component, OnInit } from '@angular/core';
import {Goal} from '../goal';
import { from } from 'rxjs';
import {Goals} from '../goals'
import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';
import {HttpClient} from '@angular/common/http';
import {QuoteRequestService} from '../quote-http/quote-request.service'


import {Quote} from '../quote-class/quote';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  providers:[GoalService,QuoteRequestService], //add the providers to the component
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  quote:Quote;
    goals:Goal[];
    alertService:AlertsService;


  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  deleteGoal(isComplete, index) {
    if (isComplete) {
      const toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`);

      if(toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("Goal has been deleted")
      }
    }
  }

  addNewGoal(goal) {
    const goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate);
    this.goals.push(goal);
  }
  constructor(goalService:GoalService,alertService:AlertsService,private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals();
    this.alertService = alertService;
     }
  
  
    ngOnInit() {
      this.quoteService.quoteRequest()
      this.quote=this.quoteService.quote
    }
  
  }