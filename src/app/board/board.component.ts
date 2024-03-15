import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  currentPlayer: 'X' | 'O' = 'X';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  winner: string | null = null;
  moveCount: number = 0;

  constructor() {}

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.moveCount++;
      if (this.moveCount >= 5) {
        this.checkWinner(row, col);
      }
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner(row: number, col: number) {
    const player = this.currentPlayer;

    // Check row
    if (this.board[row].every(cell => cell === player)) {
      this.winner = player;
      return;
    }

    // Check column
    if (this.board.every(r => r[col] === player)) {
      this.winner = player;
      return;
    }

    // Check diagonals
    if ((row === col || row + col === 2) &&
      ((this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) ||
      (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player))) {
      this.winner = player;
      return;
    }
  }

  resetGame() {
    this.currentPlayer = 'X';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.winner = null;
    this.moveCount = 0;
  }
}