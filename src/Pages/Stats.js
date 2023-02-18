import React, { Component } from "react";
import { Icon, Item } from "semantic-ui-react";

export default class Stats extends Component {
  redirect(e){
    window.location='/settings'
  }
  render() {
    return (
      <div className="stats-page" style={{marginTop:"60%"}}>
        <Item>
          <Item.Image size="large" src="https://media.tenor.com/ghXXXGwYkkEAAAAC/yeah-budy-ronnie-coleman.gif" />

          <Item.Content verticalAlign="middle">
            <Item.Header>
              <Icon name="like" />
              Feature under development (coming soon)
            </Item.Header>
            <Icon name="like" />
              This page will contain more detailed info about your workout analytics.
              <span onClick={(e)=>this.redirect(e)}
                  style={{color:"blue"}}
                >Click here to give suggestions</span>
          </Item.Content>
        </Item>
      </div>
    );
  }
}
