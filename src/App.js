import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
      <div className="App">
        <main>
          {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : <canvas></canvas>}
          <div className="controls">
            <button className="button" onClick={this.toggleMicrophone}>
              {this.state.audio ? 'Stop microphone' : 'Get Input'}
            </button>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
