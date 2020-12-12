import bcryptjs from'bcryptjs'
const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcryptjs.hashSync('123456',10),
        isAdmin:true,
        
    },
    {
        name:'Arun',
        email:'arun@example.com',
        password:bcryptjs.hashSync('123456',10),
        
       
        
    },
    {
        name:'Arun Krishnan',
        email:'arunk@example.com',
        password:bcryptjs.hashSync('123456',10)
        
        
    }
]


export default users