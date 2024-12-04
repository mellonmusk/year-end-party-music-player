import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      roomCode:"",
      error: ""
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.roomButtonPressed = this.roomButtonPressed.bind(this)
  }

  render() {
    return (
      <Grid container spacing={1} align="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            error={ this.state.error }
            label="Code"
            placeholder="Room Code를 입력하세요"
            value={ this.state.roomCode }
            helperText={ this.state.error }
            variant="outlined"
            onChange = { this.handleTextFieldChange }
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={this.roomButtonPressed} >방에 들어가기</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" to="/" component={Link}>뒤로가기</Button>
        </Grid>
      </Grid>
    );
  }

  handleTextFieldChange(e){
    this.setState({
      roomCode: e.target.value,
    });
  }
  roomButtonPressed(e){
    //console.log(this.state.roomCode);
    const requestOptions ={
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        code: this.state.roomCode
      })
    };

    fetch('/api/join-room', requestOptions)
    .then((response) => {
      if (response.ok){ //successfully joined the room
        this.props.history.push(`/room/${this.state.roomCode}`)
      } else{
        this.setState({error: "방을 찾을 수 없습니다."})
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}