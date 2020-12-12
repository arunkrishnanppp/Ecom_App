import React from 'react'

import {Helmet} from "react-helmet";
const Meta = ({title,description}) => {
    return (
        <Helmet>
        <title>{title}</title>

<meta
name='description'
content={description}
></meta>
</Helmet>
    )
}

Meta.defaultProps={
    title:'Welcome TO Ecom',
    description:'We will sell the best products'
}
export default Meta
