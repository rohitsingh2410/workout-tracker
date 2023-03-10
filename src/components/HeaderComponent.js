import React from "react";
import { Header, Icon } from "semantic-ui-react";

/**
 props={
    size:"", //h1,h2,h3
    iconName:"",
    headerMainContent:"",
    subheader:""

 }
 * */
 
export default function HeaderComponent(props) {
  const redirect= ()=>{
    window.location="/feed";
   }
  return (
    <Header as={props.size ? props.size : "h2"}  textAlign='center'>
      <Icon name={props.iconName ? props.iconName : ""} onClick={redirect} size='tiny'/>
      <Header.Content>
        {props.headerMainContent ? props.headerMainContent : ""}
        <Header.Subheader>
          {props.subheader ? props.subheader : ""}
        </Header.Subheader>
      </Header.Content>
    </Header>
  );
}
