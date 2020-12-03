import React from 'react';
import './Metronome.scss';
import click1 from '../click1.wav';
import click2 from '../click2.wav';

class Metronome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = (e) => {
    const bpm = e.target.value;
    // if the state of playing is true, then clear the timer and set a new one
    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
      // sets the new BPM in state and resets the beat counter
      this.setState({
        count: 0,
        bpm,
      });
    } else {
      // this only updates the BPM if the state of playing is false
      this.setState({ bpm });
    }
  };

  startStop = () => {
    // if the state of playing is true, then the timer will clear and the state of playing sets to false
    // which changes the button text from start to stop
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    // if the state of playing is false, the the timer will run at number set divided by 60 and multiplied by 1000 milliseconds
    // it also sets the state of count to zero, the state of playing to true and plays
    } else {
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000,
      );
      this.setState({
        count: 0,
        playing: true,
      }, this.playClick);
    }
  }

  playClick = () => {
    // deconstructing state
    const { count, beatsPerMeasure } = this.state;

    // this gives the first beat a different sound from the following beats
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    // this keeps track of the beat, adding 1 to the count and then dividing the count by the bpm
    this.setState((state) => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  }

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className='metronome'>
        <div className='bpm-slider'>
          <div>{bpm} BPM</div>
          <input
            type='range'
            min='60'
            max='240'
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;
