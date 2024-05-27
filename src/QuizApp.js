import React, { Component } from 'react'
import Question from './components/Question'
import Result from './components/Result'

import './Quiz.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [
        {
          id: 1,
          question: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Madrid'],
          answer: 'Paris',
        },
        {
          id: 2,
          question: 'What is the largerst planet in our solar system?',
          options: ['Jupiter', 'Saturn', 'Mars', 'Earth'],
          answer: 'Jupiter',
        },
      ],
      currentQ: 0,
      score: 0,
      quizEnd: false,
      selected: null,
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
  }

  handleSelect(answer) {
    this.setState({ selected: answer })
  }

  handleSubmit() {
    const { currentQ, selected, score, questions } = this.state

    if (selected === questions[currentQ].answer) {
      this.setState({ score: score + 1 })
    }

    if (currentQ < questions.length - 1) {
      this.setState((prevState) => ({
        currentQ: prevState.currentQ + 1,
        selected: null,
      }))
    } else {
      this.setState({ quizEnd: true })
    }
  }

  handleRestart() {
    this.setState({
      currentQ: 0,
      score: 0,
      quizEnd: false,
      selected: null,
    })
  }

  render() {
    const { currentQ, score, quizEnd, selected, questions } = this.state
    const current = questions[currentQ]

    return (
      <div className="quiz-app">
        {quizEnd ? (
          <Result score={score} onRestart={this.handleRestart} />
        ) : (
          <Question
            question={`Question ${currentQ + 1}: ${current.question}`}
            options={current.options}
            selected={selected}
            setAnswer={this.handleSelect}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    )
  }
}

export default App
