import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Component} from 'react';
import beepSound from './beepSound.wav'
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      break: 5,
      session: 25,
      paused: true,
      breaktime: new Date(0,0,0,0,5),
      countDownTime: new Date(0,0,0,0,25),
      sessionHeading:true  
    };
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
  }
  increaseBreak(){
    if(this.state.paused){
      let prevBreak = this.state.break;
      if(prevBreak===60) return; 
      this.setState({break:prevBreak+1,session:this.state.session,paused:this.state.paused,
        breaktime:this.state.breaktime,countDownTime:this.state.countDownTime,
      sessionHeading:this.state.sessionHeading});
    }
  }
  decreaseBreak(){
    if(this.state.paused){
    let prevBreak = this.state.break;
    if(prevBreak===1) return;  
    this.setState({break:prevBreak-1,session:this.state.session,paused:this.state.paused,
      breaktime:this.state.breaktime,countDownTime:this.state.countDownTime,
      sessionHeading:this.state.sessionHeading});
    }
  }
  increaseSession(){
    if(this.state.paused){
    let prevSession = this.state.session; 
    if(prevSession===60) return
    this.setState({break:this.state.break,session:prevSession+1,paused:this.state.paused,
      breaktime:this.state.breaktime,countDownTime:this.state.countDownTime,
      sessionHeading:this.state.sessionHeading});
    }
  }
  decreaseSession(){
    if(this.state.paused){
    let prevSession = this.state.session;
    if(prevSession===1) return 
    this.setState({break:this.state.break,session:prevSession-1,paused:this.state.paused,
      breaktime:this.state.breaktime,countDownTime:this.state.countDownTime,
      sessionHeading:this.state.sessionHeading});
    }
  }
  start(){
    var countDown = new Date(0,0,0,0,this.state.session,0);
    var breaktime = new Date(0,0,0,0,this.state.break,0);
    this.setState({break:this.state.break,session:this.state.session,paused:false,
      breaktime:breaktime,countDownTime:countDown,
      sessionHeading:true});

  }
  componentDidMount() {
    this.interval = setInterval(() => {
      if(this.state.paused===false){
      this.setState({break:this.state.break,session:this.state.session,paused:this.state.paused,
      breaktime:this.state.breaktime,countDownTime:new Date (0,0,0,0,this.state.countDownTime.getMinutes(),this.state.countDownTime.getSeconds()-1),
      sessionHeading:this.state.sessionHeading});
      if(this.state.countDownTime.getMinutes() === 0 && this.state.countDownTime.getSeconds() === 0){
        this.setState({break:this.state.break,session:this.state.session,paused:this.state.paused,
          breaktime:new Date(0,0,0,0,this.state.break,0),countDownTime:new Date (0,0,0,0,this.state.breaktime.getMinutes(),this.state.breaktime.getSeconds()),
          sessionHeading:!this.state.sessionHeading });
        let audio = new Audio(beepSound);
        audio.play();  
      }
    }}
      , 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  pause(){
    let boolean = !this.state.paused
    this.setState({break:this.state.break,session:this.state.session,paused:boolean,
      time:this.state.time,countDownTime:this.state.countDownTime});
  }
  render(){
    return (
      <div className="App">
        <div className='container d-flex flex-column' id='container'>
          <h2 className='text-center'>25 + 5 Clock</h2>
          <div className='row justify-content-center text-center'>
            <div className="col-3">
              <h5>Break Length</h5>
              <div className='d-flex flex-row justify-content-center'>
                  <a href="#" onClick={this.increaseBreak}>
                    <i className='bi bi-arrow-up'></i>
                  </a>
                  <p style={{paddingLeft:5, paddingRight:5}}>{this.state.break}</p>
                  <a href="#" onClick={this.decreaseBreak}>
                    <i className="bi bi-arrow-down"></i>
                  </a>
              </div>
            </div>
            <div className="col-3">
              <h5>Session Length</h5>
              <div className='d-flex flex-row justify-content-center'>
                  <a href="#" onClick={this.increaseSession}>
                    <i className='bi bi-arrow-up'></i>
                  </a>
                  <p style={{paddingLeft:5, paddingRight:5}}>{this.state.session}</p>
                  <a href="#" onClick={this.decreaseSession}>
                    <i className="bi bi-arrow-down"></i>
                  </a>
              </div>
            </div>
          </div>
          <div className='row justify-content-center text-center'id="sessionDiv">
            <div className="col-4" id="time">
            <h5>{this.state.sessionHeading ? "Session" : "Break" }</h5>
            <h1>{this.state.countDownTime.getMinutes()+":"+String(this.state.countDownTime.getSeconds()).padStart(2,"0")}</h1>
            </div>
          </div>
          <div className='justify-content-center text-center'>
            <a href="#" onClick={this.start}>
              <i className="bi bi-play"></i>
            </a>
            <a href="#" onClick={this.pause}>
              <i className="bi bi-pause"></i>
            </a>
          </div>
        </div> 
      </div>
    );
  }
}

export default App;
