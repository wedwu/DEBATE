import _ from 'lodash'
import { Component, OnInit } from '@angular/core'
import { CommonModule, NgFor, NgIf } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { inject } from '@vercel/analytics'
import { regex1, regex2, regex3, regex4, regex5, regex6, regex7, regex8, regex9, regex10, regex11, regex12 } from './regex'
import cardDefaults from './data.json'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title: string = 'bingo-app';
  public cardDefault: any[any] = cardDefaults
  public cardRandom: any[any] = []
  public selected: any
  public selectedIndexNumber: number = 12
  public selectedIndex: [any] = [12]
  public FREESQUARE: string = 'FREE SQUARE'
  public BINGO: string = ''

  constructor() {}

  ngOnInit() {
    inject()
    console.log('cardDefault ==> ', this.cardDefault)
    this.cardRandom = this.getRandomUniqueItems(this.cardDefault, 25)
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

  popIfExists = (arr: any, number: string | number) => {
    let newNumber: string | number = number
    newNumber = _.padStart(newNumber.toString(), 2, '0')
    const index = arr.indexOf(newNumber)
    index !== -1 ? arr.splice(index, 1) : arr.push(newNumber)
    const sortedValues = arr.toSorted((a: number, b: number) => a - b)
    localStorage.setItem('selectedIndex', JSON.stringify(sortedValues))
    this.BINGO = this.containsBingo(sortedValues) ? 'BINGO' : '' //.. remove 'BINGO' since it is buggy
  }

  containsBingo = (arr: any) => {
    const arrString = arr.join(' ')
    if (regex1.test(arrString) ||
        regex2.test(arrString) ||
        regex3.test(arrString) ||
        regex4.test(arrString) ||
        regex5.test(arrString) ||
        regex6.test(arrString) ||
        regex7.test(arrString) ||
        regex8.test(arrString) ||
        regex9.test(arrString) ||
        regex10.test(arrString) ||
        regex11.test(arrString) ||
        regex12.test(arrString)) {
      return true
    }
    return false
  }

  onClick = () => {
    localStorage.removeItem('selected')
    localStorage.removeItem('selectedIndex')
    location.reload()
  }

}










