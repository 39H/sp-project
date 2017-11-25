import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    
  marginLeft: 20,
};

const SignUp = () => {
    return (
        <div>
        
           <Paper zDepth={2}>
          <TextField hintText="Emain address" style={style} underlineShow={false} />
          <Divider />
         <TextField hintText="Pass word" style={style} underlineShow={false} />
          <Divider />
          <TextField hintText="Emain address" style={style} underlineShow={false} />
          <Divider />
         <TextField hintText="Pass word" style={style} underlineShow={false} />
          <Divider />
          
         
         </Paper>
  
          <div>
             <RaisedButton label="Submit" style={style} />
           </div>
        </div>
        
       
    );
};

export default SignUp;