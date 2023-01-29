import React from "react";
import { Header, Image ,Icon} from "semantic-ui-react";
import "../Styles/Navigator.css";

export default function Navigator({ props }) {
  return (
    <div>
      <div className="navigator-container">
        <div className="user-profile">
          <Header as="h2">
            <Image
              circular
              src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
            />{" "}
            Rohit
            <Header.Subheader>Saturday 21st january</Header.Subheader>
          </Header>
        </div>
        <Icon disabled name='setting' size='large' />
      </div>
    </div>
  );
}
