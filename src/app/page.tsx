'use client'

import React, {useState} from 'react'
import { Box, Typography, Button, Stepper, Step, StepButton, InputBase, Avatar, Switch, Checkbox, Divider, FormHelperText} from '@mui/material'
import { Grid, Stack } from '@mui/system'
import {useMediaQuery, useTheme} from '@mui/material'
import { FaGamepad } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5"
import { GiGameConsole } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";
const Home = () => {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); 

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState({
    name: '',
    email: '',
    number: '', 
  });
  const [selectedAddOn, setSelectedAddOn] = useState({
    name: '',
    price: '',
  });
  const [check, setCheck] = useState({
    monthly: true,
    yearly: false,
  })
  const [addOn, setAddOn] = useState<{ title: string; content: string, price: string }[]>([])

  const handleAddOn = (title: string, content: string, price: string) => {
    setAddOn((prev) => {
      const isAddOnExist = prev.find((addOn) => addOn.title === title);
      if (isAddOnExist) {
        return prev.filter((addOn) => addOn.title !== title);
      }
      return [...prev, { title, content, price }];
    })
  }

  const handleAddOnSelect = (name: string, price: string) => {
    setSelectedAddOn({ name, price });
  };
  
  const handleStepChange = (step?: number) => {
    if (step !== undefined) {
      setActiveStep(step); 
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1); 
    }
  };
  const handleSwitchToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isYearly = event.target.checked;
    setCheck({
      monthly: !isYearly,
      yearly: isYearly,
    });
  };

const validate = () => {
  let isValid = true;
  const newError = {
    name: '',
    email: '',
    number: '', 
  };

  if (name === '') {
    newError.name = 'Name is required';
    isValid = false;
  }

  if (name.length < 3) {
    newError.name = 'Name is short';
    isValid = false;
  }

  if (email === '') {
    newError.email = 'Email is required';
    isValid = false;
  }
  if (!email.includes('@') || !email.includes('.')) {
    newError.email = 'invalid Email';
    isValid = false;
  }

  if (number === '') {
    newError.number = 'Number is required';
    isValid = false;
  }
  if (!number.startsWith('0') || number.length !== 10) {
    newError.number = 'Not a valid number';
    isValid = false;
  }
  setError(newError);
  return isValid;
}

const handleChange = (field: any, value: any) => {
  if(field === 'name') {
    setName(value);
  }
  if(field === 'email') {
    setEmail(value);
  }
  if(field === 'number') {
    setNumber(value);
  }
  validate()
}

const isFormValid = !error.name && !error.email && !error.number && name && email && number;

  const steps = [
    {
      label: 'STEP 1',
      description: `YOUR INFO`,
    },
    {
      label: 'STEP 2',
      description:
        'SELECT PLAN',
    },
    {
      label: 'STEP 3',
      description: `ADD-ONS`,
    },
    {
      label: 'STEP 4',
      description: `SUMMARY`,
    },
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
;

const Total = () => {
  const calculate = parseFloat(selectedAddOn.price.replace(/[^0-9.]/g, '')) + addOn.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^0-9.]/g, '')), 0);
  return calculate
}
    console.log(selectedAddOn)
    console.log(addOn)

  return (
    <Box sx={{backgroundColor: 'hsl(217, 100%, 97%)', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Grid container sx={{
      backgroundColor: 'hsl(231, 100%, 99%)', 
      padding: {md: '20px', xs: '0'}, 
      height: {xs: '100vh', md: '90vh' },
      minWidth: {xs: '100%', md: '70%'},
      display: 'flex',
      justifyContent: 'space-between',
      }}>
        <Grid size = {{xs: 12, md: 4}} sx = {{background: 'linear-gradient(to bottom, hsl(216, 91.00%, 34.90%), hsl(197, 93.60%, 57.30%), hsl(298, 93.60%, 57.30%), hsl(0, 93.60%, 57.30%))', borderRadius: '10px', padding: '20px', color:  'white'}}>
        <Box sx={{ maxWidth: 400 }}>
        <Stepper 
        nonLinear 
        activeStep={activeStep} 
        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        >
        {steps.map((step, index) => (
          <Step sx={{display: 'flex', flexDirection: {xs: 'row', md: 'column'}}} key={index} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>
            <Typography sx={{
              fontSize: {xs: '10px', md: '14px'}, color: 'rgba(109, 92, 92, 0.81)', display: {xs: 'none', md: 'block'}
            }}>{step.label}</Typography>
            <Typography sx={{
              fontSize: {xs: '10px', md: '16px'},
              fontWeight: 'bold',
              color: 'white',
              display: {xs: 'none', md: 'block'}
            }}>{step.description}</Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
        </Grid>
        <Grid size = {{xs: 12, md: 6.5}} sx={{height: '100%'}}>
        {allStepsCompleted() ? (
          <Box sx={{display: 'flex', width: '100%', gap: '20px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Avatar sx={{width: {md:'50px', xs: '30px'}, height:  {md:'50px', xs: '30px'}, backgroundColor: 'red'}}>
               <IoIosCheckmarkCircle style={{color: 'white'}} />
            </Avatar>
            <Typography sx={{fontSize: {xs: '20px', md: '28px'}, fontWeight: 'bold', color: 'hsl(213, 96%, 18%)' }}>
            Thank you!
            </Typography>
            <Typography flexWrap={'wrap'} sx={{fontSize: {xs: '13px', md: '16px'}, color: 'hsl(231, 11%, 63%)' }}>
            Thanks for confirming your subscription! We hope you have fun 
            using our platform. If you ever need support, please feel free 
            to email us at support@loremgaming.com.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{height: {md: '100%', xs: '100vh'}, display: 'flex', flexDirection: 'column', justifyContent: {md: 'space-between', xs: 'normal'},}}>
            <Box sx={{py: 1, px: {xs: '15px', md: '0'}, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {activeStep === 0 ?
             <Box>
              <Typography gutterBottom sx={{fontSize: {xs: '20px', md: '28px'}, fontWeight: 'bold', color: 'hsl(213, 96%, 18%)' }}>Personal info</Typography>
              <Typography sx={{fontSize: {xs: '13px', md: '16px'}, color: 'hsl(231, 11%, 63%)' }}>Please provide your name, email address, and phone number.</Typography>
              <Box sx={{marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '15px'}}> 
                <form >
                <Stack sx={{}}>
                  <Typography color='hsl(213, 96%, 18%)' gutterBottom>Name</Typography>
                  <InputBase 
                    value={name} 
                    onChange={(e) => handleChange('name', e.target.value)} 
                    placeholder='e.g. Stephen King'
                    type='text' 
                    sx={{
                      width: '85%', 
                      border: '1px solid hsl(231, 11%, 63%)', 
                      borderRadius: '10px', 
                      fontSize: {xs: '11px', md: '14px'}, 
                      color: 'hsl(231, 11%, 63%)', 
                      padding: '10px'
                    }} 
                  />
                  {error.name && <FormHelperText error>{error.name}</FormHelperText>}
                </Stack>
                <Stack sx={{mt: '20px'}}>
                  <Typography color='hsl(213, 96%, 18%)' gutterBottom>Email Address</Typography>
                  <InputBase value={email} onChange={(e) => handleChange('email', e.target.value)} type='email' error={!!error.email} placeholder='e.g. stephenking@lorem.com' sx={{width: '85%', border: '1px solid hsl(231, 11%, 63%)', borderRadius: '10px', fontSize: {xs: '11px', md: '14px'}, color: 'hsl(231, 11%, 63%)', padding: '10px'}} />
                </Stack>
                {error.email && <FormHelperText error>{error.email}</FormHelperText>}
                <Stack sx={{mt: '20px'}}>
                  <Typography color='hsl(213, 96%, 18%)' gutterBottom>Phone Number</Typography>
                  <InputBase  value={number} onChange={(e) => handleChange('number', e.target.value)} error={!!error.number} placeholder='e.g. 07076435690' sx={{width: '85%', border: '1px solid hsl(231, 11%, 63%)', borderRadius: '10px', fontSize: {xs: '11px', md: '14px'}, color: 'hsl(231, 11%, 63%)', padding: '10px'}} />
                </Stack>
                {error.number && <FormHelperText error>{error.number}</FormHelperText>}
                </form>
              </Box>
            </Box> : null}

            {activeStep === 1 ? <Box>
              <Typography gutterBottom sx={{fontSize: {xs: '20px', md: '28px'}, fontWeight: 'bold', color: 'hsl(213, 96%, 18%)' }}>Select your plan</Typography>
              <Typography sx={{fontSize: {xs: '13px', md: '16px'}, color: 'hsl(231, 11%, 63%)' }}>You have the option of monthly or yearly billing.</Typography>
              <Box sx={{marginTop: '2.5rem', marginBottom: '1rem', display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: '10px', justifyContent: 'space-around',
              }}> 
                <Box 
                onClick={() => handleAddOnSelect('Arcade', check.monthly ? '$9/mo' : '$90/yr')}
                sx={{
                  cursor: 'pointer',
                  border: '1px solid hsl(231, 11%, 63%)',
                  height: {md: '150px', xs: '70px'}, width: {md: '150px', xs: '90%'}, borderRadius: '10px',
                  backgroundColor: selectedAddOn.name === 'Arcade' ? 'hsl(217, 100%, 97%)' : 'white',
                  ': hover': {backgroundColor: 'hsl(217, 100%, 97%)'}, padding: '10px', alignItems: 'center', display: 'flex', flexDirection: {md: 'column', xs: 'row' }, justifyContent: {md: 'space-between', xs: 'normal'}, gap: {xs: '20px', md: '0'}
                }}>
                  <Avatar sx={{width: {md: '50px', xs: '30px'}, height: {md: '50px', xs: '30px'},backgroundColor: 'rgb(235, 160, 98)'}}>
                    <GiGameConsole  style={{color: 'white'}}/>
                    </Avatar>
                  <Stack>
                  <Typography color='hsl(213, 96%, 18%)' sx={{fontSize: {xs: '12px', md: '15px'}, fontWeight: 'bold'}}>
                    {selectedAddOn.name === 'Arcade'? 'Arcade' : 'Arcade'}
                    </Typography>
                  <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}}>
                    {check.monthly ?  selectedAddOn.price === '$9/mo'? '$9/mo': '$9/mo' : selectedAddOn.price === '$90/yr' ?'$90/yr': '$90/yr'}
                    </Typography>
                    {check.yearly ? <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}} >2 months free</Typography> : null}
                  </Stack>
                </Box>
                <Box
                onClick={() => handleAddOnSelect('Advanced', check.monthly ? '$12/mo' : '$120/yr')}
                sx={{
                  cusrsor: 'pointer',
                  border: '1px solid hsl(231, 11%, 63%)',
                  height: {md: '150px', xs: '70px'}, width: {md: '150px', xs: '90%'}, borderRadius: '10px',
                  backgroundColor: selectedAddOn.name === 'Advanced' ? 'hsl(217, 100%, 97%)' : 'white',
                  ': hover': {backgroundColor: 'hsl(217, 100%, 97%)'}, padding: '10px', alignItems: 'center', display: 'flex', flexDirection: {md: 'column', xs: 'row' }, justifyContent: {md: 'space-between', xs: 'normal'}, gap: {xs: '20px', md: '0'}
                }}>
                  <Avatar sx={{width:  {md:'50px', xs: '30px'}, height:  {md:'50px', xs: '30px'}, backgroundColor: 'rgb(236, 128, 128)'}}> 
                    <FaGamepad  style={{color: 'white'}}/> 
                    </Avatar>
                  <Stack>
                  <Typography color='hsl(213, 96%, 18%)' sx={{fontSize: {xs: '12px', md: '15px'}, fontWeight: 'bold'}}>
                  {selectedAddOn.name === 'Advanced'? 'Advanced': 'Advanced'}
                    </Typography>
                  <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}}>
                  {check.monthly ?  selectedAddOn.price === '$9/mo'?'$9/mo': '$9/mo' : selectedAddOn.price === '$120/yr'? '$120/yr': '$120/yr'}
                  </Typography>
                  {check.yearly ? <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}} >2 months free</Typography> : null}
                  </Stack>
                </Box>
                <Box 
                onClick={() => handleAddOnSelect('Pro', check.monthly ? '$15/mo' : '$150/yr')}
                sx={{
                  cursor: 'pointer',
                  border: '1px solid hsl(231, 11%, 63%)',
                  height: {md: '150px', xs: '70px'}, width: {md: '150px', xs: '90%'}, borderRadius: '10px',                  
                  backgroundColor: selectedAddOn.name === 'Pro' ? 'hsl(217, 100%, 97%)' : 'white',
                  ': hover': {backgroundColor: 'hsl(217, 100%, 97%)'}, padding: '10px', alignItems: 'center', display: 'flex', flexDirection: {md: 'column', xs: 'row' }, justifyContent: {md: 'space-between', xs: 'normal'}, gap: {xs: '20px', md: '0'}
                }}>
                  <Avatar sx={{width: {md:'50px', xs: '30px'}, height:  {md:'50px', xs: '30px'}, backgroundColor: 'blue'}}>
                  <IoGameController style={{color: 'white'}}/>
                  </Avatar>
                  <Stack>
                  <Typography color='hsl(213, 96%, 18%)' sx={{fontSize: {xs: '12px', md: '15px'}, fontWeight: 'bold'}}>
                  {selectedAddOn.name === 'Pro' ? 'Pro': 'Pro'}
                    </Typography>
                  <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}}>
                    {check.monthly ?  selectedAddOn.price === '$9/mo'?'$9/mo': '$9/mo' : selectedAddOn.price === '$150/yr'? '$150/yr': '$150/yr'}
                </Typography>
                {check.yearly ? <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}} >2 months free</Typography> : null}
                  </Stack>
                </Box>
              </Box>
              <Stack direction={'row'} sx={{display: 'flex', gap: '10px',
                  backgroundColor: 'hsl(217, 100%, 97%)', padding: '5px',
                  alignItems: 'center', justifyContent: 'center', 
                  width: '90%', marginTop: '2rem'
                }}>
                  <Typography>Monthly</Typography>
                  <Switch checked = {check.yearly} onChange={handleSwitchToggle} />
                  <Typography>Yearly</Typography>
                </Stack>
            </Box> : null}
            
            {activeStep === 2 ? <Box>
              <Typography gutterBottom sx={{fontSize: {xs: '20px', md: '28px'}, fontWeight: 'bold', color: 'hsl(213, 96%, 18%)' }}>Pick add-ons</Typography>
              <Typography sx={{fontSize: {xs: '13px', md: '16px'}, color: 'hsl(231, 11%, 63%)' }}>Add-ons help enhance your gaming experience.</Typography>
              <Box sx={{marginTop: '2.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '15px'}}> 
                <Box sx={{
                  border: '1px solid hsl(231, 11%, 63%)',
                  minHeight: '90px', width: '90%', borderRadius: '7px',
                  ': hover': {backgroundColor: 'hsl(217, 100%, 97%)'}, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Checkbox checked = {addOn.some((item) => item.title === 'Online service')} onChange={() => {handleAddOn('Online service', 'Access to multiplayer games', check.monthly ? '$1/mo': '$10/yr') }} size='small' />
                  <Stack sx={{ml: {lg: '-4.8rem', xs: '0'}}}>
                  <Typography flexWrap={'wrap'} color='hsl(213, 96%, 18%)' sx={{fontSize: {xs: '12px', md: '15px'}, fontWeight: 'bold'}}> 
                  Online Service
                    </Typography>
                  <Typography color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}}>Access to multiplayer games</Typography>
                  </Stack>
                  <Typography flexWrap={'wrap'} sx={{display: 'flex', justifyContent: 'end', fontSize: {xs: '10px', md: '13px'}}}>
                    {check.monthly ? '+$1/mo' : '+$10/yr'}
                  </Typography>
                </Box>
                <Box sx={{
                  border: '1px solid hsl(231, 11%, 63%)',
                  minHeight: '90px', width: '90%', borderRadius: '7px',
                  ': hover': {backgroundColor: 'hsl(217, 100%, 97%)'},padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Checkbox checked = {addOn.some((item) => item.title === 'Larger storage')} onChange={() => handleAddOn('Larger storage', 'Extra 1TB of cloud save',check.monthly ? '$2/mo': '$20/yr')} size='small' />
                  <Stack sx={{ml: {lg: '-4.8rem', xs: '0'}}}>
                  <Typography flexWrap={'wrap'} color='hsl(213, 96%, 18%)' sx={{fontSize: {xs: '12px', md: '15px'}, fontWeight: 'bold'}}>
                  Larger Storage
                     </Typography>
                  <Typography flexWrap={'wrap'} color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}}>Extra 1TB of cloud save</Typography>
                  </Stack>
                  <Typography sx={{display: 'flex', justifyContent: 'end', fontSize: {xs: '10px', md: '13px'}}}> {check.monthly ? '+$1/mo' : '+$20/yr'}</Typography>
                </Box>
                <Box sx={{
                  border: '1px solid hsl(231, 11%, 63%)',
                  minHeight: '90px', width: '90%', borderRadius: '7px',
                  ': hover': {backgroundColor: 'hsl(217, 100%, 97%)'},padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Checkbox checked = {addOn.some((item) => item.title === 'Customizable profile')} onChange={() => handleAddOn('Customizable profile', 'Custom theme on your profile', check.monthly? '$2/mo' : '$20/yr')} size='small' />
                  <Stack sx={{ml: {lg: '-4.8rem', xs: '0'}}}>
                  <Typography flexWrap={'wrap'} color='hsl(213, 96%, 18%)' sx={{fontSize: {xs: '12px', md: '15px'}, fontWeight: 'bold'}}> Customizable Profile </Typography>
                  <Typography flexWrap={'wrap'} color='hsl(231, 11%, 63%)' sx={{fontSize: {xs: '10px', md: '13px'}}}>Custom theme on your profile</Typography>
                  </Stack>
                  <Typography sx={{display: 'flex', justifyContent: 'end', fontSize: {xs: '10px', md: '13px'}}}>{check.monthly ? '+$1/mo' : '+$20/yr'}</Typography>
                </Box>
              </Box>
            </Box> : null}

            {activeStep === 3 ? <Box>
              <Typography gutterBottom sx={{fontSize: {xs: '20px', md: '28px'}, fontWeight: 'bold', color: 'hsl(213, 96%, 18%)' }}>Finishing up</Typography>
              <Typography sx={{fontSize: {xs: '13px', md: '16px'}, color: 'hsl(231, 11%, 63%)' }}>Double-check everything looks OK before confirming.</Typography>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px',
                  backgroundColor: 'hsl(217, 100%, 97%)', padding: '10px', 
                  width: '90%', marginTop: '2.5rem'
                }}>
              <Stack direction={'row'} sx={{display: 'flex', gap: '10px', padding: '5px',
                  alignItems: 'center', justifyContent: 'space-between',}}>
                  <Box>
                  <Typography sx={{fontSize: {xs: '12px', md: '16px'},}}  color='hsl(213, 96%, 18%)'>{selectedAddOn.name}</Typography>
                  <Button  
                  onClick={() => handleStepChange(1)}
                  sx={{
                    fontSize: {xs: '10px', md: '14px'},  color: 'hsl(231, 11%, 63%)', textDecoration: 'underline', textTransform: 'none'
                  }} >Change</Button>
                </Box>
                <Typography sx={{fontSize: {xs: '12px', md: '16px'},  color: 'hsl(213, 96%, 18%', fontWeight: 'bold'}}> {selectedAddOn.price}</Typography>
                </Stack>
                <Divider sx={{height: '100%', width: '100%'}} />  
                {addOn.map((item, index) => (
                <Stack key={index} direction={'row'} sx={{display: 'flex', gap: '10px', padding: '5px',
                  alignItems: 'center', justifyContent: 'space-between',}}>                   
                  <Typography sx={{fontSize: {xs: '10px', md: '14px'},  color: 'hsl(231, 11%, 63%)',}}>{item.title}</Typography>
                <Typography sx={{fontSize: {xs: '10px', md: '14px'},  color: 'hsl(213, 96%, 18%',}}>{item.price}</Typography>
                </Stack>   
                ))}             
              </Box>

              <Stack direction={'row'} sx={{display: 'flex', gap: '10px', padding: '5px',
                  alignItems: 'center', justifyContent: 'space-between', mt: '1rem', width: '90%'}}>
                  <Typography sx={{fontSize: {xs: '12px', md: '16px'},  color: 'hsl(231, 11%, 63%)',}}>Total (per month/year)</Typography>
                <Typography sx={{fontSize: {xs: '12px', md: '16px'},  color: 'hsl(213, 96%, 18%', fontWeight: 'bold'}}>
                  ${Total()} {check.monthly? '/mo' : '/yr'}
                </Typography>
                </Stack>   
            </Box>: null}
            </Box>

            <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end', width :'90%', padding: '20px', justifyContent: 'space-between', }}>
              <Button
                color="inherit"
                disabled={activeStep === 0 || !isFormValid}
                onClick={handleBack}
                >
                Back
              </Button>
              <Button
              onClick={handleNext}
              disabled= {!isFormValid}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button 
                  onClick={handleComplete}
                  disabled={!isFormValid}
                  >
                    {completedSteps() === totalSteps() - 1
                    ? 'Finish'
                    : 'In Progress'}
                    </Button>
                    ))} 
            </Box>
          </Box>
        )}
        </Grid>
      </Grid>  
      </Box>
  )
}

export default Home