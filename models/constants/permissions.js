var permissions = {
    publicType : {
        Public : {
            allowed :true,
            alias : 'Public',
            code : 100,
            description : 'all public access allowed'
        }
    },
    
    userType : {
        User   : {
            allowed :true,
            alias: 'User',
            code : 200,
            description: 'only user for own logic business application'
        },
    },
    
    administratorType : {
        Administrator : {
            allowed :true,
            alias : 'Administrator',
            code : 300,
            description : 'all privileges for setup and other jobs'
        } 
    },
    AbogadoType : {
        Abogado : {
            allowed :true,
            alias : 'abogados',
            code : 400,
            description : 'tipo de usuario abogado'
        } 
    }
}

module.exports = permissions;