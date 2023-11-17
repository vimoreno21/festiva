import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import Dropdown from "react-bootstrap/Dropdown";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, User} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon.jsx";
import { logout , getUserInfo} from "../actions/currentUser.js"
import profilePic from '../images/profile.png';


const ProfileDropdown = () => {

  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleLogoutClick = () => {
    logout()
    navigate('/');
  }
  console.log(userInfo);
  return (
    <Dropdown
    showArrow
    radius="sm"
    classNames={{
      base: "before:bg-default-200", // change arrow background
      content: "p-0 border-small border-divider bg-background",
    }}
  >
    <DropdownTrigger>
      {/* <Button variant="bordered" color="danger" disableRipple>Open Menu</Button> */}
      <img src={profilePic} alt='profile' className="user-icon justify-content-start" textvalue="profile"/>
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Custom item styles"
      disabledKeys={["profile"]}
      className="p-3"
      itemClasses={{
        base: [
          "rounded-md",
          "text-default-500",
          "transition-opacity",
          "data-[hover=true]:text-foreground",
          "data-[hover=true]:bg-default-100",
          "dark:data-[hover=true]:bg-default-50",
          "data-[selectable=true]:focus:bg-default-50",
          "data-[pressed=true]:opacity-70",
          "data-[focus-visible=true]:ring-default-500",
        ],
      }}
    >
      <DropdownSection aria-label="Profile & Actions" showDivider>
        <DropdownItem
          isReadOnly
          key="profile"
          // className="h-14 gap-2"
          className="opacity-100 h-14 gap-2"
          textValue="User Profile"
        >
          <User
            name={userInfo.name}
            description=""
            classNames={{
              name: "text-default-600",
              description: "text-default-500",
            }}
            avatarProps={{
              size: "sm",
              color: "danger"
            }}
          />
        </DropdownItem>
      </DropdownSection>
      <DropdownSection aria-label="Help & Feedback">
        <DropdownItem key="logout" onClick={handleLogoutClick} color="danger" variant="light">Log Out</DropdownItem>
      </DropdownSection> 
    </DropdownMenu>
  </Dropdown>
  );
};

export default ProfileDropdown;