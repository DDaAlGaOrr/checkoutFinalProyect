class LoginForm {
    doAction() {
        const datos = new FormData(form)
        let username = datos.get('username')
        let password = datos.get('password')
        console.log(username,password)
        fetch('http://localhost:3000/user',{
            method:"POST",
            body:datos
        })
        .then(res => res.json())
        .then(data =>{
            if(data){
                console.log(data)
            }
            else{
                console.log('no existe')
            }
        })
    }
}
export default LoginForm