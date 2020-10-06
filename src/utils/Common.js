export const isLogin = () =>{
  const user = sessionStorage.getItem('BettingUser');
  return (user != null) ? true : false;
}

