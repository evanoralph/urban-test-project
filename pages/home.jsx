import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slick from "react-native-slick";
import axios from "axios";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const axiosInstance = axios.create({
// .. where we make our configurations
  baseURL: "https://random-data-api.com/",
});
import { SharedElement } from "react-navigation-shared-element";
import FastImage from "react-native-fast-image";

const UserList = (props) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);


  const getRandomUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/api/users/random_user?size=10");
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  useEffect(() => {
    getRandomUsers();
  }, []);

  const handleUserPress = (user, index) => {
    navigation.navigate("profile-page", {
      user,
      index,
    });
  };

  const renderUser = (user, index) => {
    return (
      <UserContainer>
        <UserName>{user.first_name}</UserName>
        <TouchableOpacity onPress={() => handleUserPress(user, index)}>
          <SharedElement id={user.id}>
            <FastImage
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              source={{
                uri: user.avatar,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </SharedElement>
        </TouchableOpacity>
      </UserContainer>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading === false && <Slick  autoplay={false}>
        {users.map((user, index) => (
          <UserItemContainer key={index}>{renderUser(user, index)}</UserItemContainer>
        ))}
      </Slick>}
    </View>
  );
};

export default UserList;

const UserItemContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.View`
  padding: 10px;
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const UserEmail = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const UserPhone = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 1px;
  resize-mode: cover;
`;
