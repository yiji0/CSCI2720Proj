import {All} from "/All";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {login: false};
  }
  
check()
{
  if(this.state.login == false)
  {
    return (
      <div>
        <h1>Login</h1>
        <form action= "http://localhost:3000/login"  method="post">
      <label for="uid">Account ID</label>
      <input type="text" id="uid" name="uid"/>
      <br></br>
      <br></br>
      <label for="pwd">Password</label>
      <input type="password" id="pwd" name="pwd"/>
      <br></br>
      <input type="submit">Submit</input>
      </form>
      
      </div>
    );
  }
  else
  {
    return <All/>;
  }
}
  
    render() {
      return (
        //<div>
        //  <h1>Login</h1>
        //  <form action= "http://localhost:3000/login"  method="post">
        //<label for="uid">Account ID</label>
        //<input type="text" id="uid" name="uid"/>
        //<br></br>
        //<br></br>
        //<label for="pwd">Password</label>
        //<input type="password" id="pwd" name="pwd"/>
        //<br></br>
        //<input type="submit">Submit</input>
        //</form>
        
        //</div>
        check()
      );
    }
  }
export default Login;
//  ReactDOM.render(
//    <Login/>,
//    document.getElementById('app')
 // );