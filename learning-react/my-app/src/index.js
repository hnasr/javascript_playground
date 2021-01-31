import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
    render() {
      return ( 
        <button className="squarecss" 
        onClick = {this.props.clickFun}>
        {this.props.bruh}
        </button>
      );
    }
  }
  
  class Board extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.isXNext === true ? 'X' : 'O';
        this.setState({
            squares: squares,
            isXNext: !this.state.isXNext
        });
    }

    renderSquare(i) {
      return <Square bruh = {this.state.squares[i]}
      clickFun = {() => this.handleClick(i)}
      
       />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
         
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  