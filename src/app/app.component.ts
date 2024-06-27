import _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title: string = 'bingo-app';

  public cardDefaults: any[any] = [
    {word: 'Ukraine', selected: false},
    {word: 'Israel', selected: false},
    {word: 'Taiwan', selected: false},
    {word: 'Nuclear war', selected: false},
    {word: 'Russia', selected: false},
    {word: 'China', selected: false},
    {word: 'Iran', selected: false},
    {word: 'Border', selected: false},
    {word: 'JFK', selected: false},
    {word: 'Aliens', selected: false},
    {word: 'Poop pants', selected: false},
    {word: 'Fall down', selected: false},
    {word: 'Gibberish', selected: false},
    {word: 'Where am I?', selected: false},
    {word: 'Who am I?', selected: false},
    {word: 'Who are you?', selected: false},
    {word: 'Bidenomics', selected: false},
    {word: 'Covid', selected: false},
    {word: 'Pandemic', selected: false},
    {word: 'Federal reserve', selected: false},
    {word: 'Julian Assange', selected: false},
    {word: 'NATO', selected: false},
    {word: 'Putin', selected: false},
    {word: 'Xi Ring Ping', selected: false},
    {word: 'Kim Jon un', selected: false},
    {word: 'Netanyahu', selected: false},
    {word: 'Lebanon', selected: false},
    {word: 'Syria', selected: false},
    {word: 'Walk out', selected: false},
    {word: 'Climate change', selected: false},
    {word: 'Texts', selected: false},
    {word: 'Immigration', selected: false},
    {word: 'Border control', selected: false},
    {word: 'Voting', selected: false},
    {word: 'ISIS', selected: false},
    {word: 'Impeachment', selected: false},
    {word: 'Come On, Man!', selected: false},
    {word: 'Criminal', selected: false},
    {word: 'Inflation', selected: false},
    {word: 'CornPop', selected: false},
    {word: 'Trial', selected: false}
  ]

  public cardRandom: any[any] = []
  public selected: any

  constructor() {}

  ngOnInit() {
    this.cardRandom = this.getRandomUniqueItems(this.cardDefaults, 25)
    localStorage.setItem('selected', JSON.stringify(this.cardRandom))
  }

  getRandomUniqueItems = (arr: any[], count: any = 25) => {
    let result = []
    let used: any = {}
    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      const item = arr[randomIndex]
      const use = item.word
      if (!used[use]) {
        if (result.length === 12) {
          result.push({word: 'FREE SQUARE', selected: true})
          used['FREE SQUARE'] = true
        } else {
          result.push(item)
          used[use] = true
        }
        arr.splice(randomIndex, 1)
      }
    }
    return result;
  }

  onSelect = (n: any) => {
    this.cardRandom = this.cardRandom.map((word: any) => {
      if (word.word === n.word) {
       word.selected = !!!word.selected       
     }
      word.word = word.word
      return word
    })
    localStorage.setItem('selected', JSON.stringify(this.cardRandom))
    console.log(this.cardRandom)
  }

  onClick = () => {
    localStorage.removeItem('selected')
    location.reload()
  }

}










