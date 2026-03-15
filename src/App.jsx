import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState({})
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState(''); 
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (password.length < 6) newErrors.password = 'Password is required';
    if (!age || isNaN(age) || age < 18) newErrors.age = 'You must be at least 18 years old';
    if (!gender) newErrors.gender = 'Please select gender';
    if (!country) newErrors.country = 'Please select country';
    if(!agree) newErrors.agree = 'You must agree to the terms';
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    console.log('Form data is valid. Proceeding with submission...');
    try {
      console.log('Submitting form data:', { name, email, password, age, gender, country, agree });
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted successfully!');
      // alert('Form submitted successfully!');
      setSubmittedData({ name, email, password, age, gender, country, agree });

      setName('');
      setEmail('');
      setPassword('');
      setAge('');
      setGender('');
      setCountry('');
      setAgree(false);
      setErrors({});
      
    } catch (error) {
      console.error('Fake API error:', error);
      alert('Something went wrond. Try again')

    } finally {
      setIsLoading(false);
    }
    setSuccessMessage('Form submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 5000);
  }
  const isFormValid = name.trim() !== '' && email.includes('@') && password.length >= 6 && !isNaN(age) && Number(age) >= 18 && gender !== '' && country !== '' && agree;

  return (
    <div style={{ maxWidth: '400', margin: '50px auto', padding: '30px', background: '#161b22', borderRadius: '12px' }}>

      <h1>React Form</h1>

      <form onSubmit={handleSubmit} >

        <div style={{ marginBottom: '20px' }}>
          <label style={{display:'block', marginBottom:'8px'}}>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </label>
            {errors.name && <p style={{ color: 'red', fontSize: '14px' }}>{ errors.name}</p>}
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px'}}>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
          </label>
          {errors.email && <p style={{color:'red', fontSize:'14px'}}>{errors.email}</p>}
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px'}}>
            Password:

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
            
          </label>
          {password.length > 0 && password.length < 6 && (<p style={{ color: 'orange', fontSize: '14px', marginTop: '5px' }}>Password must be at least 6 characters</p>)}
          
          {errors.password && <p style={{color:'red', fontSize:'14px'}}>{errors.password}</p>}              
        </div>

        <div style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px'}}>
            Age:

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
            
          </label>
          {errors.age && <p style={{color:'red', fontSize:'14px'}}>{errors.age}</p>}              
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{display:'block', marginBottom:'8px', color:'#c9d1d9'}}>
            Gender: 
          </label>
          <label style={{marginRight:'20px'}}>
            <input
              type="radio"
              value='male'
              checked={gender === 'male'}
              onChange={(e)=>setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value='female'
              checked={gender === 'female'}
              onChange={(e)=>setGender(e.target.value)}
            />
            Female
          </label>
          {errors.gender && <p style={{ color: 'red', fontSize: '14px' }}>{errors.gender}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{display:'block', marginBottom:'8px', color:'#c9d1d9'}}>
            Country:
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px', color:'#c9d1d9', background:'#0d1117', borderRadius:'6px' }}
            >
              <option value="">Select Country</option>
              <option value="Thailand">Thailand</option>
              <option value="Myanmar">Myanmar</option>
              <option value="USA">USA</option>
              <option value="Other">Other</option>
            </select>
          </label>

          {errors.country && <p style={{ color: 'red', fontSize: '14px' }}>{errors.country}</p>}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', color: '#c9d1d9' }}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{marginRight:'10px'}}
            />
            I agree to the terms and conditions
          </label>
          {errors.agree && <p style={{color:'red', fontSize:'14px', marginTop:'5px'}}>{errors.agree}</p>
          }
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          style={{
            padding: '12px 24px',
            background: isFormValid && !isLoading ? '#238636' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
            opacity: isFormValid && !isLoading ? 1 : 0.6,
            width: '100%',
            marginTop: '20px',
            fontSize:'16px'

          }}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={() => {
            setName('');
            setEmail('');
            setPassword('');
            setAge('');
            setGender('');
            setCountry('');
            setAgree(false);
            setErrors({});
            setSubmittedData(null);
          }}
          style={{
            padding: '12px 24px',
            background: '#4a5568',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '10px',
            width:'100%'
            
          }}
        >
          Reset
        </button>  
        
      </form>
      {submittedData && (
        <div style={{ marginTop: '40px', padding: '20px', background: '#0d1117', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{margin:'0'}}>Submitted Data</h3>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(submittedData,null,2))
                alert('Data copied to clipboard!');
              }}
              style={{padding:'6px 12px', background:'#238636', color:'white', border:'none', borderRadius:'6px', cursor:'pointer'}}
            >
              Copy JSON
            </button>

          </div>
          <pre style={{whiteSpace:'pre-wrap',color:'#c9d1d9', background:'#000', padding:'15px', borderRadius:'6px'}}>
            {JSON.stringify(submittedData,null,2)}
          </pre>

        </div>
      )}
      {successMessage && <p style={{ color: 'green', fontSize: '16px', marginTop: '20px' }}>{successMessage}</p>}
    </div>
  );
}
export default App;