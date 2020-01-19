import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { setNumberOfParts, setStep1ButtonStatus, setStep2ButtonStatus, setActiveStep, resetState } from '../store/actions'
import { connect }  from 'react-redux';
import { bindActionCreators } from 'redux';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DebugLog  from '../log/DebugLog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    inputData: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    }
  }),
);

const getSteps = () => {
    return ['Step 1', 'Step 2', 'Step 3'];
};



const NewRequest: React.FC = (props: any) => {
    const classes = useStyles();  
    const steps = getSteps();  
    let textInputs: any[] = [];

    // TODO: use debounce for input

    // TODO: reset state before component is rendered
    // reset state after component rendered    
    useEffect(() => {
        DebugLog.info("useEffect()");
        DebugLog.info(props);        
        props.resetState();
       
        
        // reset state on unmounting component
        return () => {          
            DebugLog.info("useEffect() - cleanup");
            props.resetState();
        };
      },[]);

      const handleNext = () => {
        props.setActiveStep(props.activestep+1)
      };
    
      const handleBack = () => {
        // navigate back to home page if back is clicked on initial stepper step
        if (props.activestep === 0 ) {
          console.log(props.history); 
          props.history.goBack();     
        }
        else {
          props.setActiveStep(props.activestep-1)
        }
      };

      const handleHome = () => {
        props.history.push("/");
      }
    
      const handleNumPartsUpdate = (event: any) => {
        DebugLog.info("handleNumPartsUpdate()");          
        DebugLog.info(props);          

        // TODO: check if we need to move this logic out of this component?        
        // limit number of steps to a maximum of 10
        if(event.target.value>0 && event.target.value<11) {
          props.setNumberOfParts(event.target.value) ;
        }
        else {      
          props.setStep1ButtonStatus(true);
        }
      }

      const validateInputs = (event: any) => {        
        let sum = 0;
        let valid = true;
        
        // get ref to input elements        
        for(let i=0; i<textInputs.length;i++) {      
          console.log(textInputs[i].value.length);      
          valid = (textInputs[i].value.length === 0 ? false : true);
          sum += parseInt(textInputs[i].value.length === 0 ? 0 : textInputs[i].value);
        }

        DebugLog.info("sum:"+sum)
    
        if(valid && sum === 100) {          
          DebugLog.info("sum adds to 100, good to go");
          props.setStep2ButtonStatus(false);
        }
        else {
          props.setStep2ButtonStatus(true);
        }
      }
    
      const setTextInputRef = (element: any) => {
        // get ref to all input elements in step 2
        textInputs.push(element);
      }
    
      // TODO: steps can be broken down to smaller components
      function getStepContent(stepIndex: number) {
        switch (stepIndex) {
            case 0:
                return(
                    <>
                        <Typography className={classes.instructions}>
                        <TextField id="num_parts" label="Number of Parts" onChange={handleNumPartsUpdate} defaultValue={props.nparts === 0 ? '' : props.nparts}/>
                        </Typography>
                        <div>
                        <Button                 
                            variant="contained"
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={props.step1nextbuttondisabled}>                
                            Next
                        </Button>
                        </div>
                    </>
                );
    
    
            case 1:
                let rows = [];
                for(let i=0;i<props.nparts;i++) {
                rows.push(<li className="list-group-item"><TextField id={"num_part_" + (i+1)} label={"Part " + (i+1) + " %"} inputRef={setTextInputRef} onChange={validateInputs}/></li>)
                }
    
                return (
                    <>
                        <Typography className={classes.instructions}>
                        <ul className="list-group">
                            { rows }
                        </ul>
                        </Typography>
                        <div>
                        <Button
                            // disabled="true"                
                            onClick={handleBack}
                            variant="contained"
                            className={classes.backButton}
                        >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={props.step2nextbuttondisabled}>                
                            Next
                        </Button>
                        </div>
                    </>
                );
            
    
    
    
            case 2:
                return (
                    <>
                        <Typography className={classes.instructions}>Success</Typography>
                            <div>
                                <Button variant="contained" onClick={handleHome} >                
                                Home
                                </Button>
                        </div>
                    </>
    
                );
    
          default:
            return 'Unknown stepIndex:' + stepIndex;
        }
      }
            
    

      return (
        <div className={classes.root}>
          <Stepper activeStep={props.activestep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
              <div>{getStepContent(props.activestep)}</div>
           </div> 
        </div>
      );
}

// map redux store state to component props
const mapStateToProps = (state: any) => ({  
    nparts: state.nparts,
    activestep: state.activestep,
    step1nextbuttondisabled: state.step1nextbuttondisabled,
    step2nextbuttondisabled: state.step2nextbuttondisabled,
});


const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({     
     setNumberOfParts, 
     setStep1ButtonStatus,
     setStep2ButtonStatus,
     setActiveStep,
     resetState            
  }, dispatch)
 );
 
 export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);  

