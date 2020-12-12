import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
    return (
<>
       


 <Spinner animation="border" size="sm" style={{margin:'auto',display:'block'}}>
 <span className="sr-only">Loading...</span>
 </Spinner>
  <Spinner animation="border" style={{margin:'auto',display:'block'}}/>
  <Spinner animation="grow" size="sm" style={{margin:'auto',display:'block'}}/>
  <Spinner animation="grow" style={{margin:'auto',display:'block'}}/>
  </>
    )
}

export default Loader
