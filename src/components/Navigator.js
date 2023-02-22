import React from "react";
import { Header, Image ,Icon} from "semantic-ui-react";
import "../Styles/Navigator.css";
import FemaleAvtar from "../assets/femaleAvtar.jpg";
const male="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
export default function Navigator({ user }) {

  const redirect = (e)=>{
    window.location=e;
  }

  return (
      <div className="navigator-container">
        <div className="user-profile">
          <Header as="h2">
            {user?<Image
              circular
              src={user.gender==="male"?male:FemaleAvtar}
            />:<Image
            circular
            src={male}
          />}
            {" "}
            {user?user.name:"user"}
            <Header.Subheader>{user?user.dateStr:""}</Header.Subheader>
          </Header>
        </div>
        <Icon  name='setting' size='large' onClick={(e)=>redirect("/settings")} />
      </div>
  );
}
