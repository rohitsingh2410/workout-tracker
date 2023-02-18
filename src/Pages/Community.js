import React, { Component } from 'react'
import { Icon, Item } from "semantic-ui-react";
import communityPlaceHolder from "../assets/communityPlaceholder.gif"
export default class Community extends Component {
  redirect(e){
    window.location='/settings'
  }
  render() {
    return (
        <div className="community-page" style={{marginTop:"60%"}}>
          <Item>
            <Item.Image size="large" src={communityPlaceHolder} />
  
            <Item.Content verticalAlign="middle">
              <Item.Header>
                <Icon name="like" />
                Feature under development (coming soon)
              </Item.Header>
              <Icon name="like" />
                This page will contain gym bros like you, with whom you can connect and learn together.
                <span onClick={(e)=>this.redirect(e)}
                  style={{color:"blue"}}
                >Click here to give suggestions</span>
            </Item.Content>
          </Item>
        </div>
      );
  }
}
