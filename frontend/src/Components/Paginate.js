import React from 'react'
import {Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
 const Paginate = ({pages,page,isAdmin=false,keyword=''}) => {

console.log('Pages are',pages,"page is",page)

    return pages>1 &&(
        <Pagination
        style={{
    
   
            position: 'absolute', left: '50%',
        transform: 'translate(-50%, -50%)',
        padding_top:'10px'
}}
        >

        {console.log([...Array(pages).keys()])}

            {[...Array(pages).keys()].map(x=>
            
         
            (

                
                
                <LinkContainer key={x+1} to={
                    
                    !isAdmin?
                    (keyword?`/search/${keyword}/page/${x+1}`:`/page/${x+1}`):
                    
                    `/admin/productlist/${x+1}`
                    }>

                    <Pagination.Item
                    active={x+1===page}
                    >
                    {x+1}


                    </Pagination.Item>
            </LinkContainer>)
            )}
        </Pagination>

    )
    
}


 export default Paginate