import './App.css';
import {useEffect, useState} from "react";

function App() {

    const[name,setName]=useState('');
    const[dateTime, setDateTime] = useState('');
    const[description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(()=> {
        getTransactions().then(setTransactions);
    }, []);

    async function getTransactions() {
        const url = process.env.REACT_APP_APU_URL +'/transactions';
        const response = await fetch(url);
        return await response.json();
    }
    function addNewTransaction(e) {
        e.preventDefault();
        const url = process.env.REACT_APP_APU_URL + '/transaction';
        // console.log(url);
        const price = name.split(' ')[0];
        fetch(url, {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                price,name: name.substring(price.length+1),
                dateTime,description
            })
        }).then(response=>{
            response.json().then(json => {
                setName('');
                setDescription('');
                setDateTime('');
                console.log('result',json);
            })
        });
    }

    let balance = 0;
    for ( const transaction of transactions) {
        balance = balance + transaction.price;
    }

  return (
    <main>
      <h1>${balance}<span>.000</span></h1>
      <form onSubmit={addNewTransaction}>
          <div className='basic'>
              <input type='text'
                     value={name}
                     onChange={(e)=>setName(e.target.value)}
                     placeholder={'+200 for new Phone'}/>
              <input value={dateTime}
                     onChange={(e) => setDateTime(e.target.value)}
                     type='datetime-local'/>
          </div>
          <div className='description'>
              <input value={description}
                     onChange={(e)=>setDescription(e.target.value)}
                     type='text' placeholder={'description'}/>
          </div>
          <button type='submit'>Add New Transaction</button>
      </form>
        <div className='transactions'>
            {transactions.length > 0 && transactions.map(transaction => (
                <div>
                    <div className='transaction'>
                        <div className='left'>
                            <div className='name'>{transaction.name}</div>
                            <div className='description'>{transaction.description}</div>
                        </div>
                        <div className='right'>
                            <div className={'price ' + (transaction.price<0 ? 'red' : 'green')}>{transaction.price}</div>
                            <div className='datetime'>2023-05-04 15:45</div>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    </main>
  );
}

export default App;
