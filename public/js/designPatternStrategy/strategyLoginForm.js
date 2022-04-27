class LoginForm {
    doAction() {
        const datos = new FormData(form)
        let username = datos.get('username')
        let password = datos.get('password')
        console.log(username,password)
        fetch('http://localhost:3000/user',{
            method:"POST",
            body:JSON.stringify({data:{username:username,password:password}}),
            headers:{'content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data =>{
            if(data){
                console.log(data)
                window.location = data
            }
            else{
                console.log('no existe')
            }
        })
    }
}
export default LoginForm