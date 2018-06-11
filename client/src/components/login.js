import React from 'react';


const Login = props => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">LindenBot</h1>
    </header>
    {/* <button onClick={() => props.test()}>TEST</button> */}
    {/* <button onClick={props.logIn}>Debug Log In</button> */}
    <div>
      <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=371272898032.373869995077&redirect_uri=http://159.65.110.176/slack/auth">
        <img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
      </a>
    </div>
  </div>
);

export default Login;
