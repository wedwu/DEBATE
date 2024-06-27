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
  public selectedIndexNumber: number = 12
  public selectedIndex: [any] = [12]
  public FREESQUARE: string = 'FREE SQUARE'
  public BINGO: string = ''

  constructor() {}

  ngOnInit() {
    this.cardRandom = this.getRandomUniqueItems(this.cardDefaults, 25)
    localStorage.setItem('selected', JSON.stringify(this.cardRandom))
    localStorage.setItem('selectedIndex', JSON.stringify(this.selectedIndex))
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
          result.push({word: this.FREESQUARE, selected: true})
          used[this.FREESQUARE] = true
        } else {
          result.push(item)
          used[use] = true
        }
        arr.splice(randomIndex, 1)
      }
    }
    return result;
  }

  onSelect = (n: any, i: number) => {
    if (n.word === this.FREESQUARE) return
    this.cardRandom = this.cardRandom.map((word: any) => {
      if (word.word === n.word) {
       word.selected = !!!word.selected       
     }
      word.word = word.word
      return word
    })
    localStorage.setItem('selected', JSON.stringify(this.cardRandom))
    this.showBingo(i)
  }

  showBingo = (i: number) => {
    // ... make sure array doesn't have the index already and needs to be sorted
    let res: any = localStorage.getItem('selectedIndex')
    res = JSON.parse(res)
    this.popIfExists(res, i)
  }

  popIfExists = (arr: any, number: number) => {
    const index = arr.indexOf(number)
    if (index !== -1) {
      arr.splice(index, 1)
    } else {
      arr.push(number)   
    }
    const sortedValues = arr.toSorted((a: number, b: number) => a - b)
    localStorage.setItem('selectedIndex', JSON.stringify(sortedValues))
    this.BINGO = this.containsBingo(sortedValues) ? 'BINGO' : ''
  }

  containsBingo = (arr: any) => {
    const arrString = arr.join('')
    const regex1: any = /(?=.*0)(?=.*1)(?=.*2)(?=.*3)(?=.*4)/
    const regex2: any = /(?=.*5)(?=.*6)(?=.*7)(?=.*8)(?=.*9)/
    const regex3: any = /(?=.*10)(?=.*11)(?=.*12)(?=.*13)(?=.*14)/
    const regex4: any = /(?=.*15)(?=.*16)(?=.*17)(?=.*18)(?=.*19)/
    const regex5: any = /(?=.*20)(?=.*21)(?=.*22)(?=.*23)(?=.*24)/
    const regex6: any = /(?=.*0)(?=.*5)(?=.*10)(?=.*15)(?=.*20)/
    const regex7: any = /(?=.*1)(?=.*6)(?=.*11)(?=.*16)(?=.*21)/
    const regex8: any = /(?=.*2)(?=.*7)(?=.*12)(?=.*17)(?=.*22)/
    const regex9: any = /(?=.*3)(?=.*8)(?=.*13)(?=.*18)(?=.*23)/
    const regex10: any = /(?=.*4)(?=.*9)(?=.*14)(?=.*19)(?=.*24)/ 
    const regex11: any = /(?=.*0)(?=.*6)(?=.*12)(?=.*18)(?=.*24)/ 
    const regex12: any = /(?=.*4)(?=.*8)(?=.*12)(?=.*16)(?=.*20)/ 

    if (regex1.test(arrString)) {
      return true
    } else if (regex2.test(arrString)) {
      return true
    } else if (regex3.test(arrString)) {
      return true
    } else if (regex4.test(arrString)) {
      return true
    } else if (regex5.test(arrString)) {
      return true
    } else if (regex6.test(arrString)) {
      if (arrString === '10121520' || arrString === '510121520')return false
      return true
    } else if (regex7.test(arrString)) {
      if (arrString === '11121621' || arrString === '611121621')return false
      return true
    } else if (regex8.test(arrString)) {
      if (arrString === '121722' || arrString === '7121722')return false
      return true
    } else if (regex9.test(arrString)) {
      if (arrString === '12131823' || arrString === '812131823')return false
      return true
    } else if (regex10.test(arrString)) {
      if (arrString === '12141924' || arrString === '912141924')return false
      return true
    } else if (regex11.test(arrString)) {
      return true
    } else if (regex12.test(arrString)) {
      return true
    }
    return false
  }

  onClick = () => {
    localStorage.removeItem('selected')
    location.reload()
  }

}










