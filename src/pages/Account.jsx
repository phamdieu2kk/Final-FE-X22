
import UpdateAccountForm from "./UpdateAccountForm";
import { Typography} from "antd";
const Account = () => {
  return (
    <div className="auth-page">
       <div  className="container mt-5">
    <div className="row">
      <div className="col-md-6 offset-md-3" style={{ width:"100%"}}>
        
      <Typography.Title 
        style={{ textAlign: "center", fontFamily: "Playball" }}>
          Cập nhật thông tin cá nhân{" "}
        </Typography.Title>
            <UpdateAccountForm/>
             </div>
             </div>
             </div>
             </div>
              

  )
}

export default Account