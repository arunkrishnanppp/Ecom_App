import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
const SearchBoxComponent = ({history}) => {

    const [keyword,setKeyword]=useState("")

    const submithandler=(e)=>{
        console.log(keyword)
        e.preventDefault()


        if(keyword.trim()){
            setKeyword('')
history.push(`/search/${keyword}`)

     
        }else{
            history.push('/')
        }
    }

  const   useEffect=(() => {
        setKeyword('')
     
    }, [])

    return (
        <Form onSubmit={submithandler} inline>
            <Form.Control
            type='text'
            name='q'
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            placeholder='search Product'
            className='mr-sm-2 ml-sm-5'
            >

            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}

export default SearchBoxComponent
