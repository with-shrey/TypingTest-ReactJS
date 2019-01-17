import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import textString from './text'

class App extends Component {
  constructor( props ) {
    super( props )
    this.startQuiz = this.startQuiz.bind( this )
    this.handleTextArea = this.handleTextArea.bind( this )
    this.renderDisplayText = this.renderDisplayText.bind( this )
    this.endQuiz = this.endQuiz.bind( this )
    this.state = {
      seconds: 60,
      count: 0,
      text: textString.trim().split( ' ' ),
      textArea: '',
      started:false,
      score:null,
    }
  }
  
  startQuiz() {
    this.setState({started:true})
    this.interval = setInterval( () => {
      if ( this.state.seconds - 1 === 0 ){
        this.endQuiz()
        clearInterval(this.interval)
      } 
      this.setState( { seconds: this.state.seconds - 1 } )
    }, 1000 )
  }
  
  handleTextArea( event ) {
    const count = event.target.value.replace(/\s+/g,' ').split( ' ' ).length -1
    this.setState( { textArea: event.target.value, count } )
  }
  
  renderDisplayText(){
    return this.state.text.map( ( word, index ) => {
      return ( <span className={index === this.state.count ? `highlight` : ''}>{`${word} `}</span> )
    } )
  }
  
  endQuiz(){
    let score = 0
    const inputText = this.state.text
    const writtenText=this.state.textArea.trim().split(' ')
    const noOfWrittenWords = writtenText.length
    for ( let i=0;i< noOfWrittenWords;i++ ){
      if ( writtenText[i] == inputText[i] ){
        score+=10
      } else{
        score-=5
      }
    }
    this.setState({score,count:noOfWrittenWords,noOfWrittenWords,writtenText:'',inputText:[]})
  }
  
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <a className="navbar-brand white-text" href="/">Typing Test</a>
          <div className="form-inline">
            <h6 className="btn btn-danger">{`Time Left: ${this.state.seconds} Secs`}</h6>
          </div>
        </nav>
        <div className="container">
          {
            this.state.score != null&&
            <div className="alert alert-info" role="alert">
              {`Your Score Is ${this.state.score}\nWords Written ${this.state.count}\nWords Per Seconds ${((this.state.count)/60).toFixed(2)}`}
            </div>
          }
         
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Type this text :</h5>
                  <p className="card-text" className="text-box">
                    {
                    this.renderDisplayText()
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          
            {
              this.state.started ?
                <React.Fragment>
                  <div className="row">
              <div className="col-md-6 offset-md-3">
              <textarea rows="6" className='input-box' onChange={this.handleTextArea}
                        value={this.state.textArea}></textarea>
              </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 offset-md-3">
                      <a href="#" className="input-box btn btn-primary">End Test</a>
                    </div>
                  </div>
                </React.Fragment>
                  :
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <a href="#" onClick={() => {this.startQuiz()}} className="input-box btn btn-primary">Start Test</a>
                  </div>
                </div>
            }
            
         
        </div>
      </React.Fragment>
    );
  }
}
  

export default App;
