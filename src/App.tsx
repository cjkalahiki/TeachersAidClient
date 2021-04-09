import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';

interface IProps {

}

interface IState {
  sessionToken: string;
  role: string;
}

export default class App extends React.Component<IProps,IState> {
  
  constructor(props: IProps){
    super(props);
    this.state = {
      sessionToken: '',
      role: ''
    }
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }
  
  //sessionToken logic here; need to pass down to Navbar and then Auth

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== undefined){
      let storedToken : string | null = localStorage.getItem('token');
      if (storedToken !== null && this.state.sessionToken !== storedToken){
        this.setState({
          sessionToken: storedToken
        })
      }
    } 
  };

  
  updateToken = (newToken : string): string => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken
    })
    return(
      newToken
    )
  }

  updateRole = (newRole : string): string => {
    this.setState({
      role: newRole
    })
    return (newRole);
  }

  clearToken = () => {
    localStorage.clear();
    console.log('local storage', localStorage.getItem('token'));
    this.setState({
      sessionToken: '',
      role: ''
    })
    console.log('after clear token:', this.state.sessionToken);
  }

  render() {
    return (
      <div className="App">
        <Navbar sessionToken={this.state.sessionToken} updateToken={this.updateToken} clearToken={this.clearToken} updateRole={this.updateRole} role={this.state.role}/>
        {/* <Footer /> */}
      </div>
    );
  }
}